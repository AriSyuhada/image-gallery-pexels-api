import type { Image as ImageModel } from "@/models/Images";
import Image from "next/image";
import Link from "next/link";

type Props = {
  imageData: ImageModel
}

export default function ImageContainer({ imageData }: Props) {
  const ratio = imageData.height / imageData.width;
  const galleryHeight = Math.ceil(250 * ratio);
  const imageSpans = Math.ceil(galleryHeight / 10) + 1;

  return (
    <div 
      className="w-[250px]"
      style={{ gridRow: `span ${imageSpans}` }}
    >
      <Link href={imageData.url} target="_blank" className="grid place-content-center">
        <div className="rounded-xl overflow-hidden group">
          <Image 
            src={imageData.src.large}
            alt={imageData.alt}
            width={250}
            height={galleryHeight}
            // sizes="(min-width: 1280px) 278px, (min-width: 1040px) calc(12.73vw + 118px), (min-width: 800px) 33.18vw, (min-width: 540px) 50vw, calc(100vw - 16px)"
            sizes="250px"
            placeholder="blur"
            blurDataURL={imageData.blurredDataUrl}
            className="group-hover:opacity-75"
          />
        </div>
      </Link>
    </div>
  );
}