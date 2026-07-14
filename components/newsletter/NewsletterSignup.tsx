"use client";

import { useId, useState } from "react";
import { Mail, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";

type SignupStatus = "idle" | "loading" | "success" | "error";
type NewsletterSignupProps = {
  source?: "homepage" | "contact_page";
};

const preferredStates = [
  { label: "Florida", value: "FL" },
  { label: "Georgia", value: "GA" },
  { label: "South Carolina", value: "SC" },
  { label: "Tennessee", value: "TN" },
] as const;

export function NewsletterSignup({
  source = "homepage",
}: NewsletterSignupProps) {
  const formId = useId();
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [message, setMessage] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim().toLowerCase();

    if (status === "success" && email === submittedEmail) {
      setMessage("You’re already on the list with that email.");
      return;
    }

    if (!form.reportValidity()) return;

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          firstName: String(formData.get("firstName") ?? "").trim(),
          preferredState: String(formData.get("preferredState") ?? "").trim(),
          consent: formData.get("consent") === "on",
          website: String(formData.get("website") ?? "").trim(),
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
      };

      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      setStatus("success");
      setSubmittedEmail(email);
      setMessage(
        data.message || "Thanks — you’re on the list."
      );
      trackEvent(
        "newsletter_signup",
        {
          source,
          placement: source,
          preferred_state:
            String(formData.get("preferredState") ?? "").trim() || undefined,
        },
        { dedupeKey: email }
      );
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  const messageId = `${formId}-message`;

  return (
    <section
      id="newsletter"
      aria-labelledby={`${formId}-heading`}
      className="bg-[#171717] text-white"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-[#ffe200] px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-black">
            <Sparkles aria-hidden="true" className="size-4" />
            Pop Cult updates
          </p>
          <h2
            id={`${formId}-heading`}
            className="mt-5 text-4xl font-black leading-none tracking-[-0.055em] sm:text-5xl"
          >
            New finds, store updates, and events sent occasionally.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-6 text-white/65 sm:text-base">
            Join the Pop Cult email list for store news and occasional local
            updates. No account needed.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[2rem] bg-white p-5 text-black shadow-[7px_7px_0_#ffe200] sm:p-6"
          aria-describedby={message ? messageId : undefined}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label
                htmlFor={`${formId}-email`}
                className="text-sm font-black"
              >
                Email address <span aria-hidden="true">*</span>
              </label>
              <input
                id={`${formId}-email`}
                name="email"
                type="email"
                required
                autoComplete="email"
                disabled={status === "loading"}
                className="mt-2 h-12 w-full rounded-2xl border border-black/20 bg-white px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-firstName`}
                className="text-sm font-black"
              >
                First name <span className="font-bold text-black/55">(optional)</span>
              </label>
              <input
                id={`${formId}-firstName`}
                name="firstName"
                type="text"
                autoComplete="given-name"
                disabled={status === "loading"}
                className="mt-2 h-12 w-full rounded-2xl border border-black/20 bg-white px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:opacity-60"
              />
            </div>

            <div>
              <label
                htmlFor={`${formId}-preferredState`}
                className="text-sm font-black"
              >
                Preferred state{" "}
                <span className="font-bold text-black/55">(optional)</span>
              </label>
              <select
                id={`${formId}-preferredState`}
                name="preferredState"
                disabled={status === "loading"}
                className="mt-2 h-12 w-full rounded-2xl border border-black/20 bg-white px-4 text-base outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:opacity-60"
              >
                <option value="">No preference</option>
                {preferredStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="hidden" aria-hidden="true">
            <label htmlFor={`${formId}-website`}>Website</label>
            <input
              id={`${formId}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className="mt-5 flex gap-3 text-sm leading-6 text-black/70">
            <input
              name="consent"
              type="checkbox"
              required
              disabled={status === "loading"}
              className="mt-1 size-4 rounded border-black/30 text-primary focus:ring-primary"
            />
            <span>
              I agree to receive occasional Pop Cult email updates. You can
              unsubscribe at any time using the link in any email.
            </span>
          </label>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              disabled={status === "loading"}
              className="h-12 rounded-full bg-[#171717] px-6 font-black text-white hover:bg-primary"
            >
              <Mail aria-hidden="true" className="size-4" />
              {status === "loading" ? "Signing up…" : "Sign up"}
            </Button>
            {message ? (
              <p
                id={messageId}
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
                className="text-sm font-bold text-black/70"
              >
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
