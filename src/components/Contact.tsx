import React, { useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { sendContactMessage } from "../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await sendContactMessage({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Falha ao enviar mensagem:", err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact" 
      className="py-24 px-6 md:py-32 bg-[#0d0e11] relative overflow-hidden"
    >
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-gray-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" /> REACH OUT
            </span>
            <h2 className="text-4xl sm:text-5xl font-georama font-bold mt-2 text-white italic">
              Let's Connect
            </h2>
          </div>
          <p className="text-xs font-mono text-gray-600 self-start md:self-end">
            /04 COLLABORATION & INQUIRIES
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12">
          {/* Quick Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-xl font-georama font-semibold text-white">
              Have an idea? Let's make it real.
            </h3>
            <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed">
              I am always looking forward to discussing interactive front-end challenges, design projects, or interesting layout mechanics. Feel free to shoot a message here or connect via direct mail.
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-900">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500 font-mono">Email:</span>
                <a 
                  href="mailto:marcelomotoslive@gmail.com" 
                  className="text-white hover:underline hover:text-gray-300 transition-colors font-mono"
                >
                  marcelomotoslive@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-gray-500 font-mono">Location:</span>
                <span className="text-gray-300 font-light">Worldwide / Remote</span>
              </div>
            </div>
          </div>

          {/* Contact Form Element (3 Columns) */}
          <div className="md:col-span-3">
            <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-900 bg-gray-950/60 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gray-700 focus:bg-gray-950 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 rounded-xl border border-gray-900 bg-gray-950/60 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gray-700 focus:bg-gray-950 transition-all"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hey Marcelo, I'm interest in..."
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 rounded-xl border border-gray-900 bg-gray-950/60 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gray-700 focus:bg-gray-950 transition-all resize-none"
                />
              </div>

              {/* Status Feedbacks */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl border border-emerald-950 bg-emerald-950/20 text-emerald-300 flex items-start gap-2.5 text-sm"
                  >
                    <Check className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Thank you!</p>
                      <p className="text-xs text-emerald-400/90 font-light mt-0.5">Your inquiry was compiled successfully. I will get back to you shortly.</p>
                    </div>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl border border-red-950 bg-red-950/20 text-red-300 flex items-start gap-2.5 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400 mt-0.5" />
                    <div>
                      <p className="font-semibold">Validation Error</p>
                      <p className="text-xs text-red-400/90 font-light mt-0.5">Please ensure all form inputs have been populated correctly before invoking send.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white text-black font-medium text-sm transition-all hover:bg-gray-200 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-white/5"
                id="submit-contact-btn"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
