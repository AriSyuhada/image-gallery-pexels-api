import fetchImages from "@/lib/fetchImage";
import type { ImagesResponse } from "@/models/Images";
import { ImageContainer } from "..";
import addBlurredDataUrls from "@/lib/getBase64";

export default async function Gallery() {
  const url = 'https://api.pexels.com/v1/curated';

  const images: ImagesResponse | undefined = await fetchImages(url);

  if (!images) return <h2>No Images Found</h2>;

  const imagesWithBlur = await addBlurredDataUrls(images);

  return (
    <section className="px-1 my-3 grid grid-cols-gallery auto-rows-[10px]">
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