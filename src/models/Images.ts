import { z } from "zod";

const ImageResponseSchema = z.object({
  total_results: z.number(),
  page: z.number(),
  per_page: z.number(),
  prev_page: z.string().optional(),
  next_page: z.string().optional(),
});

const ImageSchema = z.object({
  id: z.number(),
  width: z.number(),
  height: z.number(),
  url: z.string(),
  photographer: z.string(),
  photographer_url: z.string(),
  photographer_id: z.number(),
  avg_color: z.string(),
  src: z.object({
    original: z.string(),
    large2x: z.string(),
    large: z.string(),
    medium: z.string(),
    small: z.string(),
    portrait: z.string(),
    landscape: z.string(),
    tiny: z.string(),
  }),
  alt: z.string(),
  blurredDataUrl: z.string().optional(),
});

export const ImagesWithResponseSchema = ImageResponseSchema.extend({
  photos: z.array(ImageSchema),
});

export type Image = z.infer<typeof ImageSchema>
export type ImagesResponse = z.infer<typeof ImagesWithResponseSchema>