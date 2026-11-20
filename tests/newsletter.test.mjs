import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import ts from 'typescript';
const { outputText } = ts.transpileModule(readFileSync(new URL('../app/api/newsletter/route.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } });
const { POST } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const request = value => new Request('http://localhost/api/newsletter', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(value)});
const valid = {email:'audit@example.com',consent:true};
test('invalid payloads, consent, email and state never contact newsletter provider', async () => {
 const original=globalThis.fetch; globalThis.fetch=()=>{throw new Error('Unexpected network request');};
 try {
  for(const value of [null, [], 'text', {}, {...valid,consent:false}, {...valid,email:'bad'}, {...valid,preferredState:'XX'}]) assert.equal((await POST(request(value))).status,400);
  assert.equal((await POST(new Request('http://localhost/api/newsletter',{method:'POST',body:'{'}))).status,400);
 } finally {globalThis.fetch=original;}
});
test('missing configuration gives a customer-friendly error; mocked signup succeeds and provider failures recover', async () => {
 const keys=['MAILCHIMP_API_KEY','MAILCHIMP_SERVER_PREFIX','MAILCHIMP_AUDIENCE_ID'];
 const previous=keys.map(k=>process.env[k]); const original=globalThis.fetch;
 try {
  keys.forEach(k=>delete process.env[k]);
  const unavailable=await POST(request(valid)); assert.equal(unavailable.status,503);
  assert.doesNotMatch((await unavailable.json()).message,/Vercel|environment|API/);
  keys.forEach((k,i)=>process.env[k]=['fake','us1','testaudience'][i]);
  const calls=[]; globalThis.fetch=async (url, options)=>{calls.push({url,options}); return Response.json({status:'subscribed'});};
  assert.equal((await POST(request({...valid,preferredState:'GA'}))).status,200);
  assert.equal(calls.length,2); assert.equal(calls[0].options.method,'PUT'); assert.match(calls[1].options.body,/Preferred State: GA/);
  globalThis.fetch=async()=>new Response('',{status:500}); assert.equal((await POST(request(valid))).status,502);
  globalThis.fetch=async()=>{throw new Error('offline');}; assert.equal((await POST(request(valid))).status,502);
 } finally {globalThis.fetch=original; keys.forEach((k,i)=>{if(previous[i]===undefined)delete process.env[k];else process.env[k]=previous[i];});}
});
