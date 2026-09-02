import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CORE_SERVICES } from "../constData/const";

const CARD_GRADIENTS = [
  "from-primary-500 to-primary-700",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-teal-500 to-emerald-600",
];

export default function CoreServicesSection() {
  return (
    <section className="section-py relative overflow-hidden bg-secondary-50/50">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--color-secondary-100) 1px, transparent 1px), linear-gradient(to bottom, var(--color-secondary-100) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)",
        }}
      />

      <div className="container-app relative">
        <div className="mb-12 text-center">
          <span className="eyebrow justify-center">Our Core Services</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            Everything You Need to Succeed in Research
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="group relative overflow-hidden rounded-2xl border border-secondary-100 bg-white p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl"
            >
              <div
                aria-hidden
                className={`absolute -top-12 -right-12 h-32 w-32 rounded-full bg-linear-to-br opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-15 ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]}`}
              />

              <span
                className={`relative flex h-13 w-13 items-center justify-center rounded-2xl bg-linear-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110 ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]}`}
              >
                <service.icon className="h-6 w-6" />
              </span>
              <h3 className="relative mt-5 font-heading text-lg font-bold text-secondary-800">
                {service.title}
              </h3>
              <p className="relative mt-2 text-sm leading-relaxed text-secondary-500">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="relative mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
              >
                Learn More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
