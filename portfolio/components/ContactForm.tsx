"use client";

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Wire up to API/email service
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-3 text-sm text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-3 text-sm text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
          required
        />
      </div>
      <textarea
        name="message"
        placeholder="Your message"
        rows={4}
        className="w-full rounded-xl border border-black/10 dark:border-white/15 bg-white/70 dark:bg-black/30 backdrop-blur px-4 py-3 text-sm text-black dark:text-white placeholder-black/50 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/20"
        required
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="relative inline-flex items-center gap-3 rounded-full bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 text-sm font-bold shadow hover:opacity-90 transition"
        >
          <span>Send</span>
          <span className="relative h-10 w-10 inline-flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-10 w-10 animate-spin [animation-duration:12s]">
              <defs>
                <path id="circlePathFooter" d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0" />
              </defs>
              <text textAnchor="middle" className="fill-current text-[8px] tracking-[2px]">
                <textPath href="#circlePathFooter" startOffset="50%">
                  SEND MESSAGE • LET&apos;S TALK • SEND MESSAGE • LET&apos;S TALK •
                </textPath>
              </text>
            </svg>
            <span className="relative z-10 grid h-6 w-6 place-items-center rounded-full bg-white text-black dark:bg-black dark:text-white text-xs font-bold">
              →
            </span>
          </span>
        </button>
      </div>
    </form>
  );
}


