"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Send,
  Shield,
  CheckCircle,
} from "lucide-react";

const ContactClient = () => {
  const easeOutExpo = [0.16, 1, 0.3, 1] as const;

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "general",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Typewriter animation for hero paragraph
  const typewriterText =
    "WHETHER YOU'RE SEEKING A RARE ALLOCATION, A BESPOKE CONFIGURATION, OR SIMPLY WISH TO DISCUSS YOUR COLLECTION \u2014 OUR CONCIERGE TEAM IS AT YOUR SERVICE.";
  const [displayedText, setDisplayedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    // Start typing after a short hero stagger delay
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
          if (prev.length >= typewriterText.length) {
            clearInterval(interval);
            return prev;
          }
          return typewriterText.slice(0, prev.length + 1);
        });
      }, 28);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(startDelay);
  }, [typewriterText]);

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(blink);
  }, []);

  const formRef = useRef<HTMLDivElement>(null);
  const formInView = useInView(formRef, { once: true, margin: "-80px" });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    // Simulate network delay for the premium feel
    await new Promise((r) => setTimeout(r, 1600));
    setIsSending(false);
    setIsSubmitted(true);
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOutExpo },
    },
  };

  const contactMethods = [
    {
      icon: MapPin,
      label: "Visit Our Showroom",
      value: "12 Avenue des Champs-Élysées, 75008 Paris, France",
      detail: "By appointment only",
    },
    {
      icon: Phone,
      label: "Concierge Line",
      value: "+33 1 42 68 53 00",
      detail: "Priority line for existing clients",
    },
    {
      icon: Mail,
      label: "Direct Correspondence",
      value: "concierge@autodeal.com",
      detail: "Response within 4 business hours",
    },
    {
      icon: Clock,
      label: "Availability",
      value: "Mon – Sat: 09:00 – 19:00 CET",
      detail: "Sunday by private appointment",
    },
  ];

  const subjectOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "acquisition", label: "Vehicle Acquisition" },
    { value: "bespoke", label: "Bespoke Configuration" },
    { value: "financing", label: "Financing & Leasing" },
    { value: "consignment", label: "Consignment Services" },
    { value: "press", label: "Press & Partnerships" },
  ];

  const inputBaseClass =
    "w-full bg-transparent border border-[rgba(218,230,216,0.08)] rounded-lg px-5 py-4 text-sm text-[#dae6d8] placeholder-[#dae6d8]/30 font-sans focus:outline-none focus:border-[#00ff87]/40 focus:shadow-[0_0_20px_rgba(0,255,135,0.06)] transition-all duration-250";

  return (
    <div className="w-full relative overflow-hidden bg-transparent">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] md:w-[900px] h-[400px] bg-[#00ff87]/4 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[50%] right-[-15%] w-[400px] h-[400px] bg-[#00ff87]/3 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[15%] left-[-10%] w-[500px] h-[500px] bg-[#00ff87]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* HERO */}
        <section className="py-24 md:py-36 text-center flex flex-col items-center justify-center min-h-[55vh]">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            <motion.span
              variants={heroItemVariants}
              className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.3em] mb-4 flex items-center gap-2 px-3 py-1 bg-[#00ff87]/10 rounded-full border border-[#00ff87]/20"
            >
              <Shield size={12} />
              Private & Confidential
            </motion.span>

            <motion.h1
              variants={heroItemVariants}
              className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight text-white leading-none uppercase mb-8"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              GET IN <br />
              <span className="text-[#00ff87]">TOUCH</span>
            </motion.h1>

            <motion.p
              variants={heroItemVariants}
              className="text-sm md:text-base text-[#dae6d8]/90 max-w-3xl leading-relaxed font-light mb-6 font-mono uppercase tracking-wider"
            >
              {displayedText}
              <span
                className="inline-block w-[2px] h-[1em] bg-[#00ff87] ml-[2px] align-middle"
                style={{ opacity: cursorVisible ? 1 : 0 }}
              />
            </motion.p>
          </motion.div>
        </section>

        {/* CONTACT METHODS GRID */}
        <section className="pb-20 border-t border-[rgba(218,230,216,0.06)]">
          <div className="pt-16 mb-12">
            <span className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.2em] block mb-2">
              Direct Channels
            </span>
            <h2
              className="text-3xl md:text-4xl font-bold uppercase text-white"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              REACH THE <span className="text-[#00ff87]">CONCIERGE</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, idx) => {
              const Icon = method.icon;
              return (
                <motion.div
                  key={idx}
                  className="group p-6 bg-[#050e0a]/50 backdrop-blur-md rounded-xl border border-[rgba(218,230,216,0.06)] flex flex-col gap-4 hover:border-[#00ff87]/25 transition-colors duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.1 + idx * 0.12 }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                >
                  <div className="w-11 h-11 rounded-lg bg-[#00ff87]/10 flex items-center justify-center text-[#00ff87] border border-[#00ff87]/25 group-hover:bg-[#00ff87]/15 transition-colors duration-300">
                    <Icon size={20} />
                  </div>
                  <div>
                    <span className="text-[#00ff87] text-[10px] font-mono uppercase tracking-widest block mb-1">
                      {method.label}
                    </span>
                    <p className="text-white text-sm font-medium leading-snug mb-1">
                      {method.value}
                    </p>
                    <p className="text-[#dae6d8]/40 text-xs">{method.detail}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* FORM + SIDEBAR SECTION */}
        <section className="py-20 border-t border-[rgba(218,230,216,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Form Column */}
            <div ref={formRef} className="lg:col-span-3">
              <div className="mb-10">
                <span className="text-[#00ff87] text-xs font-mono uppercase tracking-[0.2em] block mb-2">
                  Private Inquiry
                </span>
                <h2
                  className="text-3xl md:text-4xl font-bold uppercase text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  COMPOSE YOUR <span className="text-[#00ff87]">MESSAGE</span>
                </h2>
              </div>

              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center text-center p-16 bg-[#050e0a]/50 backdrop-blur-md rounded-2xl border border-[#00ff87]/20"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: easeOutExpo,
                  }}
                >
                  <div className="w-16 h-16 rounded-full bg-[#00ff87]/15 flex items-center justify-center text-[#00ff87] mb-6 border border-[#00ff87]/30">
                    <CheckCircle size={32} />
                  </div>
                  <h3
                    className="text-2xl font-bold text-white mb-3 uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Message Received
                  </h3>
                  <p className="text-[#dae6d8]/70 text-sm max-w-md mb-8 font-sans">
                    Thank you for reaching out. A member of our concierge team
                    will respond within 4 business hours. For urgent matters,
                    please use our priority phone line.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({
                        name: "",
                        email: "",
                        phone: "",
                        subject: "general",
                        message: "",
                      });
                    }}
                    className="text-[#00ff87] text-xs font-mono uppercase tracking-widest hover:underline underline-offset-4 transition-all"
                  >
                    Send Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    formInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.7, ease: easeOutExpo }}
                >
                  {/* Name + Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[#dae6d8]/50 text-[10px] font-mono uppercase tracking-widest block mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Viktor Vance"
                        className={inputBaseClass}
                      />
                    </div>
                    <div>
                      <label className="text-[#dae6d8]/50 text-[10px] font-mono uppercase tracking-widest block mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        placeholder="you@example.com"
                        className={inputBaseClass}
                      />
                    </div>
                  </div>

                  {/* Phone + Subject Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[#dae6d8]/50 text-[10px] font-mono uppercase tracking-widest block mb-2">
                        Phone
                        <span className="text-[#dae6d8]/25 ml-1">
                          (optional)
                        </span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="+33 1 42 68 53 00"
                        className={inputBaseClass}
                      />
                    </div>
                    <div>
                      <label className="text-[#dae6d8]/50 text-[10px] font-mono uppercase tracking-widest block mb-2">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        className={`${inputBaseClass} appearance-none cursor-pointer`}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2300ff87' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 16px center",
                        }}
                      >
                        {subjectOptions.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-[#050e0a] text-[#dae6d8]"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="text-[#dae6d8]/50 text-[10px] font-mono uppercase tracking-widest block mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      placeholder="Describe the vehicle you're looking for, your collection goals, or any specific requirements..."
                      className={`${inputBaseClass} resize-none`}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSending}
                    className="group relative flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 bg-[#00ff87] text-[#050e0a] font-mono text-sm uppercase font-bold tracking-widest rounded-lg overflow-hidden transition-all duration-150 active:scale-97 hover:shadow-[0_0_30px_rgba(0,255,135,0.4)] disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-[#050e0a]/30 border-t-[#050e0a] rounded-full animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>
                        Send Inquiry
                        <Send
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5"
                        />
                      </>
                    )}
                  </button>

                  <p className="text-[#dae6d8]/25 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1.5 pt-2">
                    <Shield size={10} />
                    All communications are encrypted and strictly confidential.
                  </p>
                </motion.form>
              )}
            </div>

            {/* Sidebar Column */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              {/* Showroom Location Card */}
              <motion.div
                className="p-8 bg-[#050e0a]/50 backdrop-blur-md rounded-2xl border border-[rgba(218,230,216,0.06)] flex flex-col gap-6"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
              >
                <div>
                  <span className="text-[#00ff87] text-[10px] font-mono uppercase tracking-widest block mb-2">
                    Flagship Showroom
                  </span>
                  <h3
                    className="text-xl font-bold text-white uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Paris, France
                  </h3>
                </div>

                {/* Stylized Map Container */}
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-[#00ff87]/10 bg-[#050e0a]">
                  <iframe
                    className="w-full h-full grayscale-[0.8] opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5248.796658770807!2d2.3096559000000005!3d48.8696826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fc501e717f1%3A0x9ef912b439932bd6!2s12%20Av.%20des%20Champs-%C3%89lys%C3%A9es%2C%2075008%20Paris%2C%20France!5e0!3m2!1sen!2sma!4v1782737664208!5m2!1sen!2sma"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  ></iframe>
                  
                  {/* Subtle Pattern Overlay */}
                  <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />

                  {/* Pin */}
                  <motion.div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring" }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#00ff87] shadow-[0_0_20px_rgba(0,255,135,0.6)] animate-pulse" />
                    <span className="text-[#00ff87] text-[9px] font-mono uppercase tracking-wider mt-2 bg-[#050e0a]/80 px-2 py-0.5 rounded backdrop-blur-sm whitespace-nowrap">
                      AutoDeal HQ
                    </span>
                  </motion.div>
                </div>

                <div className="flex flex-col gap-2 text-sm">
                  <p className="text-[#dae6d8]/80 flex items-start gap-2">
                    <MapPin
                      size={14}
                      className="text-[#00ff87]/60 mt-0.5 flex-shrink-0"
                    />
                    12 Avenue des Champs-Élysées, 75008 Paris
                  </p>
                  <p className="text-[#dae6d8]/50 flex items-start gap-2">
                    <Clock
                      size={14}
                      className="text-[#00ff87]/40 mt-0.5 flex-shrink-0"
                    />
                    Mon – Sat: 09:00 – 19:00 CET
                  </p>
                </div>
              </motion.div>

              {/* FAQ Teaser */}
              <motion.div
                className="p-8 bg-[#050e0a]/50 backdrop-blur-md rounded-2xl border border-[rgba(218,230,216,0.06)] flex flex-col gap-5"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.15, ease: easeOutExpo }}
              >
                <div>
                  <span className="text-[#00ff87] text-[10px] font-mono uppercase tracking-widest block mb-2">
                    Before You Write
                  </span>
                  <h3
                    className="text-xl font-bold text-white uppercase"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    Common Inquiries
                  </h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      q: "Do you ship internationally?",
                      a: "Yes. We offer enclosed, climate-controlled transport to over 40 countries with full customs clearance support.",
                    },
                    {
                      q: "Can I schedule a private viewing?",
                      a: "Absolutely. Contact our concierge to arrange a one-on-one session at our Paris showroom or a secure virtual walkthrough.",
                    },
                    {
                      q: "Do you offer financing?",
                      a: "We partner with elite financial institutions to offer bespoke leasing and financing structures tailored to collectors.",
                    },
                  ].map((faq, idx) => (
                    <div
                      key={idx}
                      className="pb-4 border-b border-[rgba(218,230,216,0.04)] last:border-0 last:pb-0"
                    >
                      <p className="text-white text-sm font-medium mb-1 flex items-start gap-2">
                        <ArrowRight
                          size={12}
                          className="text-[#00ff87] mt-1 flex-shrink-0"
                        />
                        {faq.q}
                      </p>
                      <p className="text-[#dae6d8]/50 text-xs leading-relaxed pl-5">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactClient;
