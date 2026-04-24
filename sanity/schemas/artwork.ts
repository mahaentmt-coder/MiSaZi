// sanity/schemas/artwork.ts
export const artwork = {
  name: 'artwork',
  title: 'Artwork',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (R: any) => R.required(),
    },
    {
      name: 'artist',
      title: 'Artist',
      type: 'reference',
      to: [{ type: 'artist' }],
      validation: (R: any) => R.required(),
    },
    {
      name: 'image',
      title: 'Artwork Image',
      type: 'image',
      options: { hotspot: true },
      validation: (R: any) => R.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'number',
    },
    {
      name: 'medium',
      title: 'Medium',
      type: 'string',
      description: 'e.g. "Oil on canvas"',
    },
    {
      name: 'dimensions',
      title: 'Dimensions',
      type: 'string',
      description: 'e.g. "80 × 100 cm"',
    },
    {
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      description: 'Leave blank if price on request',
    },
    {
      name: 'sold',
      title: 'Sold',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'exhibition',
      title: 'Shown in Exhibition',
      type: 'reference',
      to: [{ type: 'exhibition' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'artist.name',
      media: 'image',
    },
  },
}
