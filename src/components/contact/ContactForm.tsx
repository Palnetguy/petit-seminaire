"use client";

import { useState, type FormEvent } from "react";
import { school } from "@/content/school";

const topics = ["Admissions", "Visit the seminary", "Alumni", "Vocations", "Other"];

/**
 * No backend yet: the form composes an email in the visitor's mail app.
 * TODO: connect to a form service or a Next.js server action when the school has an inbox.
 */
export function ContactForm() {
  const [topic, setTopic] = useState(topics[0]);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const body = `${f.get("message")}\n\n— ${f.get("name")}\n${f.get("phone") || ""}\n${f.get("email")}`;
    window.location.href = `mailto:${school.email}?subject=${encodeURIComponent(`[${topic}] ${f.get("name")}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field =
    "peer w-full border-0 border-b border-ink/20 bg-transparent pt-6 pb-2 text-lg text-ink outline-none transition-colors focus:border-brick placeholder-transparent";
  const label =
    "pointer-events-none absolute top-6 left-0 text-charcoal/50 transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-focus:text-brick peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {topics.map((t) => (
          <button
            type="button"
            key={t}
            onClick={() => setTopic(t)}
            className={`rounded-full border px-4 py-2 text-sm transition ${topic === t ? "border-ink bg-ink text-ivory" : "border-ink/15 text-ink hover:border-ink"}`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="relative">
          <input id="name" name="name" required placeholder="Name" className={field} />
          <label htmlFor="name" className={label}>Full name</label>
        </div>
        <div className="relative">
          <input id="phone" name="phone" placeholder="Phone" className={field} />
          <label htmlFor="phone" className={label}>Phone (optional)</label>
        </div>
      </div>
      <div className="relative">
        <input id="email" name="email" type="email" required placeholder="Email" className={field} />
        <label htmlFor="email" className={label}>Email</label>
      </div>
      <div className="relative">
        <textarea id="message" name="message" required rows={4} placeholder="Message" className={`${field} resize-none`} />
        <label htmlFor="message" className={label}>Your message</label>
      </div>
      <div className="flex flex-wrap items-center gap-6">
        <button type="submit" className="group inline-flex items-center gap-3 rounded-full bg-ink py-3.5 pr-3.5 pl-7 font-semibold text-ivory transition hover:bg-brick">
          Send message
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
        </button>
        {sent && <p className="text-sm text-green">Your mail app should open with the message ready. Murakoze!</p>}
      </div>
    </form>
  );
}
