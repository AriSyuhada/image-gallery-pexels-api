'use server'

import fetchImages from "@/lib/fetchImage";
import addBlurredDataUrls from "@/lib/getBase64";
import { ImagesResponse } from "@/models/Images";

type loadImagesProps = {
  topic? : string | undefined
  nextPageUrl? : string | undefined
}

export async function loadImages({ topic, nextPageUrl } : loadImagesProps) {
  let url = '';
  if (nextPageUrl === '') {
    url = !topic 
      ? 'https://api.pexels.com/v1/curated'
      : `https://api.pexels.com/v1/search?query=${topic}`;
  } else if (nextPageUrl && nextPageUrl !== '') {
    url = nextPageUrl;
  } else {
    return [];
  }

  const images: ImagesResponse | undefined = await fetchImages(url);
  
  if (!images) return [];

  const imagesWithBlur = await addBlurredDataUrls(images);
  const nextPage = images.next_page;

  return [imagesWithBlur, nextPage] as const;
}