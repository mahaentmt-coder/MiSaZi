// sanity/schemas/artist.ts
export const artist = {
  name: 'artist',
  title: 'Artist',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (R: any) => R.required(),
    },
    {
      name: 'photo',
      title: 'Portrait Photo',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'medium',
      title: 'Primary Medium',
      type: 'string',
      description: 'e.g. "Painting · Mixed Media"',
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 6,
    },
    {
      name: 'featured',
      title: 'Featured Artist',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'emerging',
      title: 'Emerging Artist',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'artworks',
      title: 'Artworks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artwork' }] }],
    },
    {
      name: 'website',
      title: 'Personal Website',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram Handle',
      type: 'string',
      description: 'Without the @ symbol',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'medium', media: 'photo' },
  },
}
