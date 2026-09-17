import Image from "next/image";

type PageHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
};

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  return (
    <section className="relative min-h-[56vh] overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,18,14,0.55)_0%,rgba(22,18,14,0.35)_45%,rgba(22,18,14,0.72)_100%)]" />
      {/* Top padding also clears the fixed 4.5rem header so the gap above and below the text matches. */}
      <div className="relative z-10 mx-auto flex min-h-[inherit] max-w-[1400px] items-center px-5 pb-10 pt-[7rem] md:px-8">
        <div className="max-w-3xl text-[var(--ivory)]">
          {eyebrow ? (
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.28em] text-[var(--sand)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.02] tracking-[-0.02em]">
            {title}
          </h1>
          {description ? (
            <p className="mt-4 text-sm leading-relaxed text-[var(--ivory)]/85 md:text-base">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}