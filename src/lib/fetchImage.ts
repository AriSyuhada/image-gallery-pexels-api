import type { ImagesResponse } from "@/models/Images";
import { ImagesWithResponseSchema } from "@/models/Images";
import env from "./env";

export default async function fetchImages(url: string): Promise<ImagesResponse | undefined> {
  try {
    const res = await fetch(url, {
      headers: {
        Authorization: env.PEXELS_API_KEY,
      }
    });

    if (!res.ok) throw new Error("Something wrong while fetching images\n");

    const imagesResponse: ImagesResponse = await res.json();

    // console.log(imagesResponse);

    const parsedImagesData = ImagesWithResponseSchema.parse(imagesResponse);

    if (parsedImagesData.total_results === 0) return undefined;

    return parsedImagesData;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
  }
}