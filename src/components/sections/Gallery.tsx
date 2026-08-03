import { useCallback, useEffect, useRef, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const images = [
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg",
  "https://imagedelivery.net/UpBbDZmjrt-WGPYbM3yOCA/10916-saint-tropez-villa-reve-dazur-view-of-the-house-143132082469a62f1d8b37f8.60269118-39065005469a62f1d8b3b16.66372936/1",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-128780682069a58338a3aee0.32460866.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-185480223869a583335db439.37579063.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-136355251669a583345a8909.07370031.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-93106307469a583360799a5.46548590.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-170579129269a583392db3c5.08915544.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-40337827869a5833124d845.13146413.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-64007441469a58342bf3319.02616563.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-117797491269a5832e1884c7.89305074.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-28891630769a5832f8c9b65.36278620.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-89575872269a5833a43da87.97167594.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-190089435869a5833d687503.75039197.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-147696116669a5833bcb1cf2.42245264.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-140126029169a5833b53d820.66942913.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-176214908969a5833e5a83a5.27325156.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-138299491769a5833f60bdc1.57999432.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-73106774169a5833ecd7fe8.47285973.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-76010654569a583405c7e32.59038992.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-12340250669a5833fdd3434.44016846.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-13568545169a5832c9042a4.18225418.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-148056102269a5833dd9c6d8.68589377.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-178954105369a583367ef6b6.64711366.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-70836622869a58337103b01.20011469.1920.jpg",
  "https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-93172661369a5833798cf40.00252746.1920.jpg",
];

export function Gallery() {
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length)),
    [],
  );
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % images.length)),
    [],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, prev, next]);

  return (
    <section id="galerie" className="bg-background px-6 py-16 md:px-12 md:py-[120px]">
      <div className="mx-auto max-w-[1280px]">
        <Reveal className="text-center">
          <h2 className="font-display text-[32px] leading-[1.15] text-foreground md:text-[56px]">
            Galerie
          </h2>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>button]:mb-4">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Agrandir la photo ${i + 1} de la Villa Rêve d'Azur`}
                className="block w-full overflow-hidden rounded-[2px]"
              >
                <img
                  src={src}
                  alt={`Villa Rêve d'Azur à Saint-Tropez — photo ${i + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-300 hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse photo"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.94)" }}
          onTouchStart={(e) => {
            touchX.current = e.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(e) => {
            const start = touchX.current;
            const end = e.changedTouches[0]?.clientX ?? null;
            if (start !== null && end !== null && Math.abs(end - start) > 50) {
              if (end < start) next();
              else prev();
            }
            touchX.current = null;
          }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fermer"
            className="absolute right-5 top-5 text-background/80 transition-colors hover:text-background"
          >
            <X className="h-7 w-7" />
          </button>
          <button
            type="button"
            onClick={prev}
            aria-label="Photo précédente"
            className="absolute left-3 text-background/80 transition-colors hover:text-background md:left-8"
          >
            <ChevronLeft className="h-9 w-9" />
          </button>
          <img
            src={images[index]}
            alt={`Villa Rêve d'Azur — photo ${index + 1} en plein écran`}
            className="max-h-[88vh] max-w-[92vw] object-contain"
          />
          <button
            type="button"
            onClick={next}
            aria-label="Photo suivante"
            className="absolute right-3 text-background/80 transition-colors hover:text-background md:right-8"
          >
            <ChevronRight className="h-9 w-9" />
          </button>
        </div>
      )}
    </section>
  );
}
