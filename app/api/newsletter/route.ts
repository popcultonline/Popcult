import { createHash } from "node:crypto";

export const runtime = "nodejs";

const allowedStates = new Set(["FL", "GA", "SC", "TN"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const successMessage = "Thanks — check your inbox to confirm your signup.";

type NewsletterRequest = {
  email?: unknown;
  firstName?: unknown;
  preferredState?: unknown;
  consent?: unknown;
  website?: unknown;
};

function jsonResponse(
  body: { ok: boolean; message: string },
  init?: ResponseInit
) {
  return Response.json(body, init);
}

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getMailchimpConfig() {
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const serverPrefix = process.env.MAILCHIMP_SERVER_PREFIX;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!apiKey || !serverPrefix || !audienceId) {
    return null;
  }

  if (!/^[a-z0-9-]+$/i.test(serverPrefix) || !/^[a-z0-9]+$/i.test(audienceId)) {
    return null;
  }

  return { apiKey, serverPrefix, audienceId };
}

function getSubscriberHash(email: string) {
  return createHash("md5").update(email.toLowerCase()).digest("hex");
}

function getAuthHeader(apiKey: string) {
  return `Basic ${Buffer.from(`popcult:${apiKey}`).toString("base64")}`;
}

export async function POST(request: Request) {
  let payload: NewsletterRequest;

  try {
    payload = (await request.json()) as NewsletterRequest;
  } catch {
    return jsonResponse(
      { ok: false, message: "Please submit the form again." },
      { status: 400 }
    );
  }

  if (getString(payload.website)) {
    return jsonResponse({ ok: true, message: successMessage });
  }

  if (payload.consent !== true) {
    return jsonResponse(
      {
        ok: false,
        message: "Please confirm you want to join the email list.",
      },
      { status: 400 }
    );
  }

  const email = getString(payload.email).toLowerCase();
  const firstName = getString(payload.firstName).slice(0, 80);
  const preferredState = getString(payload.preferredState).toUpperCase();

  if (!emailPattern.test(email)) {
    return jsonResponse(
      { ok: false, message: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  if (preferredState && !allowedStates.has(preferredState)) {
    return jsonResponse(
      { ok: false, message: "Please choose a valid preferred state." },
      { status: 400 }
    );
  }

  const config = getMailchimpConfig();

  if (!config) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Newsletter signup is not configured yet. Please add the Mailchimp environment variables in Vercel.",
      },
      { status: 503 }
    );
  }

  const memberUrl = `https://${config.serverPrefix}.api.mailchimp.com/3.0/lists/${config.audienceId}/members/${getSubscriberHash(
    email
  )}`;
  const headers = {
    Authorization: getAuthHeader(config.apiKey),
    "Content-Type": "application/json",
  };

  let memberResponse: Response;

  try {
    memberResponse = await fetch(memberUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        email_address: email,
        status_if_new: "pending",
        merge_fields: firstName ? { FNAME: firstName } : {},
      }),
    });
  } catch {
    return jsonResponse(
      {
        ok: false,
        message:
          "We could not reach the newsletter service right now. Please try again soon.",
      },
      { status: 502 }
    );
  }

  if (!memberResponse.ok) {
    return jsonResponse(
      {
        ok: false,
        message:
          "We could not complete the signup right now. Please try again soon.",
      },
      { status: 502 }
    );
  }

  const tags = [
    "Website Signup",
    preferredState ? `Preferred State: ${preferredState}` : "",
  ].filter(Boolean);

  if (tags.length > 0) {
    try {
      await fetch(`${memberUrl}/tags`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          tags: tags.map((name) => ({ name, status: "active" })),
        }),
      });
    } catch {
      // Signup succeeded. Tags are useful metadata, but should not block consented signup.
    }
  }

  return jsonResponse({ ok: true, message: successMessage });
}
