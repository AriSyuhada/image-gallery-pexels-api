import { getPlaiceholder } from "plaiceholder";
import type { Image as ImageModel, ImagesResponse } from "@/models/Images";

async function getBase64(imageUrl: string) {
  try {
    const res = await fetch(imageUrl);

    if (!res.ok) {
      throw new Error(`Something wrong while fetching image: ${res.status} - ${res.statusText}`)
    }

    const buffer = await res.arrayBuffer();
    const { base64 } = await getPlaiceholder(Buffer.from(buffer))

    // console.log(base64);

    return base64;
  } catch (error) {
    if (error instanceof Error) console.log(error.stack);
  }
}

export default async function addBlurredDataUrls(images: ImagesResponse): Promise<ImageModel[]> {
  const base64Promises = images.photos.map(photo => getBase64(photo.src.large));

  const base64Results = await Promise.all(base64Promises);

  const imagesWithBlur: ImageModel[] = images.photos.map((photo, i) => {
    photo.blurredDataUrl = base64Results[i];
    return photo;
  });

  return imagesWithBlur;
}