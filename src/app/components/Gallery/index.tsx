import fetchImages from "@/lib/fetchImage";
import type { ImagesResponse } from "@/models/Images";
import { ImageContainer } from "..";
import addBlurredDataUrls from "@/lib/getBase64";

type Props = {
  topic? : string | undefined,
}

export default async function Gallery({ topic } : Props) {
  const url = !topic 
    ? 'https://api.pexels.com/v1/curated'
    : `https://api.pexels.com/v1/search?query=${topic}`;

  const images: ImagesResponse | undefined = await fetchImages(url);

  if (!images) return <h2>No Images Found</h2>;

  const imagesWithBlur = await addBlurredDataUrls(images);

  return (
    <section className="px-2 my-3 grid grid-cols-gallery auto-rows-[10px] place-items-center">
        {/* {
          images.photos.map(photo => (
            <ImageContainer ImageData={photo} />
          ))
        } */}
        {
          imagesWithBlur.map(photo => (
            <ImageContainer key={photo.id} imageData={photo} />
          ))
        }
    </section>
  );
}