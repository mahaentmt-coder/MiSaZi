import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Submit Your Work',
  description: 'Artists can submit their portfolio to MiSaZi Art Gallery.',
}

export default function SubmissionsPage() {
  return (
    <div className="mt-[60px]">
      <div className="px-8 md:px-10 pt-16 pb-12 border-b border-gallery-lightgray">
        <p className="label mb-3">For Artists</p>
        <h1 className="heading-lg">Submit Your <em>Work</em></h1>
      </div>
      <div className="px-8 md:px-10 py-20 grid md:grid-cols-2 gap-16 md:gap-24">
        <div>
          <p className="body-text mb-8 leading-loose">
            MiSaZi Art Gallery is always looking to discover new voices. We are particularly interested in artists from Central Asia, the Middle East, and underrepresented communities globally.
          </p>
          <div className="space-y-8 mb-10">
            {[
              { step: '01', title: 'Send Your Portfolio', desc: 'Email your portfolio link and artist statement to info@misaziart.com.' },
              { step: '02', title: 'Initial Review',      desc: 'Our curatorial team reviews all submissions within 4–6 weeks.' },
              { step: '03', title: 'Follow-up',           desc: 'If your work aligns with our program, we will reach out to discuss next steps.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6">
                <span className="font-serif font-light text-3xl text-gallery-lightgray leading-none shrink-0">{step}</span>
                <div>
                  <h3 className="font-serif font-light text-lg mb-1">{title}</h3>
                  <p className="text-sm text-gallery-gray font-light leading-loose">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gallery-offwhite p-10 flex flex-col justify-center">
          <p className="label mb-4">Ready to Apply?</p>
          <h2 className="heading-md mb-6">Send Us Your <em>Portfolio</em></h2>
          <p className="body-text mb-6">
            Email your portfolio, artist statement, and a short bio to our curatorial team. Please include links to your website or online portfolio.
          </p>
          <a href="mailto:info@misaziart.com?subject=Artist Submission" className="btn-primary inline-block text-center">
            Submit via Email
          </a>
        </div>
      </div>
    </div>
  )
}
