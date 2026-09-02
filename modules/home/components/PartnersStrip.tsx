import { PARTNERS } from "../constData/const";

export default function PartnersStrip() {
  return (
    <section className="border-y border-secondary-100 bg-secondary-50/40 py-10">
      <div className="container-app">
        <p className="mb-6 text-center text-xs font-bold tracking-wide text-secondary-400 uppercase">
          Our Academic & Industry Partners
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {PARTNERS.map((partner) => (
            <span
              key={partner.name}
              className="text-sm font-semibold text-secondary-400 grayscale transition-colors hover:text-secondary-600"
            >
              {partner.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
