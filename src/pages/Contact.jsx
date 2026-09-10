import { useState } from "react";
import { useLocation } from "react-router-dom";
import PageHero from "../components/PageHero";
import Reveal from "../components/Reveal";
import {
  IconArrowRight,
  IconMail,
  IconPhone,
  IconPin,
} from "../components/icons";

// Create a free form at https://formspree.io (takes ~2 minutes), then swap
// this for your own form ID from the dashboard (looks like "xyzabcde").
// Until then, submissions will fail gracefully with the error state below
// rather than falsely claiming to have sent.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

export default function Contact() {
  const location = useLocation();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: location.state?.email || "",
    message: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.target),
      });
      if (!res.ok) throw new Error("Form submission failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Let's talk about your process"
        subtitle="Share what you're working on and where colour, consistency or finish is falling short — our team will follow up with a real answer, not a form letter."
      />

      <section className="py-8 pb-28 bg-cream">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_1.1fr] gap-14">
          <Reveal>
            <div className="rounded-[2rem] bg-indigo text-cream p-9 sm:p-10">
              <h2 className="font-display font-semibold text-2xl mb-8">
                Reach us directly
              </h2>

              <ul className="space-y-6 mb-10">
                <li className="flex items-start gap-4">
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-cream/10 flex items-center justify-center">
                    <IconPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold mb-0.5">Address</p>
                    <p className="text-cream/65 text-sm">
                      Nadir Chowk, Ruhi Nala Road, Gajjumatta, Lahore, Pakistan
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-cream/10 flex items-center justify-center">
                    <IconPhone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold mb-0.5">Phone</p>
                    <p className="text-cream/65 text-sm">+92 323 5292333</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="h-11 w-11 shrink-0 rounded-xl bg-cream/10 flex items-center justify-center">
                    <IconMail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold mb-0.5">Email</p>
                    <p className="text-cream/65 text-sm">
                      info@legacy-textiles.com
                    </p>
                  </div>
                </li>
              </ul>

              <div className="rounded-2xl overflow-hidden aspect-[4/3] relative ring-1 ring-cream/10">
                <iframe
                  title="Legacy Textile Solutions location"
                  src="https://maps.google.com/maps?q=Nadir+Chowk%2C+Ruhi+Nala+Road%2C+Gajjumatta%2C+Lahore%2C+Pakistan&output=embed"
                  className="absolute inset-0 h-full w-full grayscale-[30%] contrast-[1.05]"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[2rem] bg-white ring-1 ring-ink/5 p-9 sm:p-10 shadow-sm">
              {status === "sent" ? (
                <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center py-10">
                  <div className="h-16 w-16 rounded-full bg-teal/15 text-teal flex items-center justify-center mb-6">
                    <IconMail className="h-8 w-8" />
                  </div>
                  <h3 className="font-display font-semibold text-2xl text-ink mb-3">
                    Message received
                  </h3>
                  <p className="text-ink/60 max-w-sm">
                    Thanks, {form.name.split(" ")[0] || "there"} — our team will
                    get back to you shortly about{" "}
                    {form.company ? form.company : "your enquiry"}.
                  </p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Full name" required>
                      <input
                        required
                        name="name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        className="input"
                        placeholder="Name"
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        name="company"
                        value={form.company}
                        onChange={(e) =>
                          setForm({ ...form, company: e.target.value })
                        }
                        className="input"
                        placeholder="Your mill / brand"
                      />
                    </Field>
                  </div>
                  <Field label="Email" required>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="input"
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field label="How can we help?" required>
                    <textarea
                      required
                      rows={5}
                      name="message"
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      className="input resize-none"
                      placeholder="Tell us about your fabric, process and what you need..."
                    />
                  </Field>

                  {status === "error" && (
                    <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                      Couldn't send that — the form isn't connected to an inbox yet.
                      Please reach us directly at{" "}
                      <a href="mailto:info@legacy-textiles.com" className="underline">
                        info@legacy-textiles.com
                      </a>{" "}
                      or +92 323 5292333 in the meantime.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-terracotta text-cream font-semibold px-8 py-3.5 hover:bg-terracotta-light transition-all hover:gap-3 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:gap-2"
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                    <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .input {
          width: 100%;
          border: 1.5px solid rgba(23,21,31,0.1);
          border-radius: 0.9rem;
          padding: 0.75rem 1rem;
          font-size: 0.925rem;
          background: var(--color-cream);
          transition: border-color .2s;
        }
        .input:focus-visible {
          outline: none;
          border-color: var(--color-indigo);
          box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-indigo) 35%, transparent);
        }
      `}</style>
    </>
  );
}

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wide text-ink/50 mb-2">
        {label} {required && <span className="text-terracotta">*</span>}
      </span>
      {children}
    </label>
  );
}
