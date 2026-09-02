"use client";

import { useState, type FormEvent } from "react";
import { toast } from "react-toastify";
import { User, Phone, Mail, ArrowRight } from "lucide-react";
import { INDUSTRY_INTERESTS } from "../constData/const";

export default function InquiryForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const [submitting, setSubmitting] = useState(false);
  const dark = variant === "dark";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      toast.success("Thanks! Our team will contact you shortly.");
      e.currentTarget.reset();
    }, 700);
  }

  const inputClass =
    "w-full rounded-md border border-secondary-200 bg-white py-3 pl-10 pr-3 text-sm text-secondary-800 placeholder:text-secondary-400 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none";

  return (
    <div
      className={`w-full rounded-2xl p-6 shadow-soft sm:p-7 ${
        dark ? "bg-secondary-800 text-white" : "border border-secondary-100 bg-white"
      }`}
    >
      <h3 className="font-heading text-xl font-bold">
        Get Free <span className="text-primary-500">Consultation</span>
      </h3>
      <p className={`mt-1.5 text-sm ${dark ? "text-secondary-300" : "text-secondary-500"}`}>
        Fill in the details and our expert will contact you shortly.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <div className="relative">
          <User className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <input required name="name" type="text" placeholder="Your Name" className={inputClass} />
        </div>
        <div className="relative">
          <Phone className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <input
            required
            name="phone"
            type="tel"
            placeholder="Mobile / WhatsApp"
            className={inputClass}
          />
        </div>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-secondary-400" />
          <input
            required
            name="email"
            type="email"
            placeholder="Email Address"
            className={inputClass}
          />
        </div>
        <select
          name="interest"
          defaultValue=""
          className="w-full rounded-md border border-secondary-200 bg-white px-3 py-3 text-sm text-secondary-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 focus:outline-none"
        >
          <option value="" disabled>
            I am interested in
          </option>
          {INDUSTRY_INTERESTS.map((interest) => (
            <option key={interest} value={interest}>
              {interest}
            </option>
          ))}
        </select>

        <button type="submit" disabled={submitting} className="btn-primary mt-1 w-full disabled:opacity-70">
          {submitting ? "Sending..." : "Get Free Consultation"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      <p className={`mt-3 text-center text-xs ${dark ? "text-secondary-400" : "text-secondary-400"}`}>
        🔒 We respect your privacy. Your details are safe with us.
      </p>
    </div>
  );
}
