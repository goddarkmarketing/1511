import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center bg-[var(--ivory)] px-5 py-32">
      <div className="mx-auto max-w-xl text-center">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--mocha)]">
          404
        </p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl">
          This page has drifted off course
        </h1>
        <p className="mt-4 text-sm text-[var(--charcoal-soft)]">
          The page you are looking for is not here. Let us take you back to the
          sea.
        </p>
        <Link
          href="/en"
          className="mt-8 inline-block border border-[var(--mocha)] px-6 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-[var(--mocha)]"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
