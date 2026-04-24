'use client'

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-0 shrink-0"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="w-[220px] bg-white/5 border border-white/15 text-white placeholder:text-white/30
                   font-sans font-light text-[13px] px-4 py-3 outline-none
                   focus:border-white/40 transition-colors"
      />
      <button
        type="submit"
        className="bg-white text-gallery-black font-sans font-light text-[11px]
                   tracking-widest uppercase px-5 py-3 whitespace-nowrap
                   hover:bg-gallery-offwhite transition-colors"
      >
        Subscribe
      </button>
    </form>
  )
}
