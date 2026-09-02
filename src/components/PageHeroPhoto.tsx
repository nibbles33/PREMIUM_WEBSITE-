import Image from "next/image";
import type { PhotographyPlacement } from "@/data/photography";

type PageHeroPhotoProps = {
  placement: PhotographyPlacement;
  priority?: boolean;
};

export default function PageHeroPhoto({
  placement,
  priority = false,
}: PageHeroPhotoProps) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border border-border bg-white shadow-[0_16px_40px_rgba(32,39,40,0.08)] sm:aspect-[16/11] lg:aspect-[5/4]">
      <Image
        src={placement.src}
        alt={placement.alt}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 100vw, 540px"
        className="object-cover"
      />
    </div>
  );
}
