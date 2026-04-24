import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about MiSaZi Art Gallery — our mission, vision, and team.',
}

export default function AboutPage() {
  return (
    <div className="mt-[60px]">
      {/* Header */}
      <div className="grid md:grid-cols-2 min-h-[50vh]">
        <div className="bg-gallery-black flex flex-col justify-end px-10 md:px-16 py-16">
          <p className="label text-white/30 mb-6">Est. 2021 · New York</p>
          <h1 className="heading-lg text-white">
            A place to<br /><em>Rise, Grow,</em><br />{'&'} Empower
          </h1>
        </div>
        <div className="bg-gallery-offwhite px-10 md:px-16 py-16 flex items-end">
          <blockquote className="font-serif font-light italic text-2xl md:text-3xl text-gallery-darkgray leading-snug">
            "Art must be life — it must belong to everybody."
            <cite className="block not-italic text-2xs tracking-wider uppercase text-gallery-gray mt-4 font-sans">
              — Marina Abramović
            </cite>
          </blockquote>
        </div>
      </div>

      {/* Mission + Vision */}
      <section className="px-8 md:px-10 py-20 grid md:grid-cols-2 gap-16 border-b border-gallery-lightgray">
        <div>
          <p className="label mb-4">Our Mission</p>
          <h2 className="heading-md mb-6">Promoting <em>Rise, Growth</em> {'&'} Empowerment</h2>
          <p className="body-text leading-loose">
            Promoting the RISE, Growth and EMPOWERMENT of artists from various minority
            communities in Central Asia and around the globe. We believe every artist
            deserves a platform — regardless of background, geography, or circumstance.
          </p>
        </div>
        <div>
          <p className="label mb-4">Our Vision</p>
          <h2 className="heading-md mb-6">A <em>Significant</em> Resource for Art {'&'} Artists</h2>
          <p className="body-text leading-loose">
            To be recognized as a significant intellectual resource for artists and art
            lovers — maintaining artistic excellence through breadth of experience and
            depth of knowledge in the research and development of our collections.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="px-8 md:px-10 py-20 max-w-3xl">
        <p className="label mb-6">Our Story</p>
        <h2 className="heading-md mb-10">Founded on <em>Passion</em></h2>
        <div className="space-y-6 body-text leading-loose">
          <p>
            An art-loving couple, Hadi and Mahsa, started MiSaZi Art Gallery in 2021
            in New York. Despite their background in finance and computer science, they
            have long been advocates for underrepresented artists. Completing their PhDs
            in Artificial Intelligence and Human Interaction Design inspired them to
            appreciate artworks using mixed media and digital techniques.
          </p>
          <p>
            They are now working in New York City with an international team of art
            professionals to pursue their passion further — supporting contemporary
            artworks by emerging and mid-career artists from Central Asia and beyond.
          </p>
          <p>
            Joining MiSaZi as Artistic Director in 2022, Mozhgan Miri is an art
            curator, educator, researcher, and entrepreneur based in Toronto, Canada.
            As a researcher and strategist, she utilizes qualitative and quantitative
            data to identify trends and deliver compelling recommendations to artists
            and art educators.
          </p>
          <p>
            MiSaZi works with experienced artists and educators with diverse interests
            and cultural backgrounds — providing audiences with a unique experience in
            their artistic journey. Through multicultural art education, we offer
            individuals the opportunity to know their own culture better while creating
            an appreciation for diversity.
          </p>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gallery-offwhite px-8 md:px-10 py-20">
        <p className="label mb-3">The People</p>
        <h2 className="heading-md mb-12">Our <em>Team</em></h2>
        <div className="grid md:grid-cols-3 gap-px bg-gallery-lightgray">
          {[
            {
              name: 'Hadi',
              role: 'Co-Founder',
              description: 'Background in finance and AI. Advocates for underrepresented artists and oversees gallery operations and business development.',
            },
            {
              name: 'Mahsa',
              role: 'Co-Founder',
              description: 'Computer science and AI background. Leads curatorial vision and artist relations, with a passion for digital and mixed-media works.',
            },
            {
              name: 'Mozhgan Miri',
              role: 'Artistic Director',
              description: 'Art curator, educator, and researcher based in Toronto. Specializes in community engagement, brand visibility, and program development.',
            },
          ].map(({ name, role, description }) => (
            <div key={name} className="bg-white px-8 py-10">
              <div className="w-12 h-12 bg-gallery-offwhite flex items-center justify-center mb-6">
                <span className="font-serif text-xl font-light italic text-gallery-gray">
                  {name.split(' ').map((n) => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-serif font-light text-xl mb-1">{name}</h3>
              <p className="label mb-4">{role}</p>
              <p className="text-sm text-gallery-gray font-light leading-loose">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-8 md:px-10 py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-gallery-lightgray">
        <div>
          <h2 className="heading-md mb-3">Work with <em>MiSaZi</em></h2>
          <p className="body-text">Interested in exhibiting, collaborating, or submitting your work?</p>
        </div>
        <div className="flex gap-6 flex-wrap">
          <Link href="/contact" className="btn-primary">Get in Touch</Link>
          <Link href="/submissions" className="btn-ghost">Submit Your Work</Link>
        </div>
      </section>
    </div>
  )
}
