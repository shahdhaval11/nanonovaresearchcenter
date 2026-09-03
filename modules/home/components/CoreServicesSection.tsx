import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  GraduationCap,
  Dna,
  Users,
  Target,
  type LucideIcon,
} from "lucide-react";
import { CORE_SERVICES } from "../constData/const";
import Reveal from "@/components/ui/Reveal";
import DnaMotif from "@/components/ui/DnaMotif";

const CARD_GRADIENTS = [
  "from-primary-500 to-primary-700",
  "from-violet-500 to-purple-600",
  "from-amber-500 to-orange-600",
  "from-sky-500 to-blue-600",
  "from-rose-500 to-pink-600",
  "from-teal-500 to-emerald-600",
];

const ACCENT_ICONS: LucideIcon[] = [BookOpen, FlaskConical, GraduationCap, Dna, Users, Target];

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
      <DnaMotif
        segments={7}
        className="pointer-events-none absolute top-0 -right-8 h-full w-32 text-primary-600 opacity-[0.05] sm:w-40"
      />

      <div className="container-app relative">
        <div className="mb-9 text-center">
          <span className="eyebrow justify-center">Our Core Services</span>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-secondary-800 sm:text-3xl">
            Everything You Need to Succeed in Research
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CORE_SERVICES.map((service, index) => {
            const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            const AccentIcon = ACCENT_ICONS[index % ACCENT_ICONS.length];
            return (
              <Reveal key={service.title} delay={(index % 3) * 100}>
                <div className="group h-full overflow-hidden rounded-2xl border border-secondary-100 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl">
                  <div
                    className={`relative flex h-28 items-center justify-center overflow-hidden bg-linear-to-br ${gradient}`}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #ffffff 1px, transparent 1px)",
                        backgroundSize: "16px 16px",
                      }}
                    />
                    <AccentIcon
                      aria-hidden
                      className="absolute -top-3 -right-3 h-16 w-16 text-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
                      strokeWidth={1.5}
                    />
                    <service.icon
                      className="relative h-11 w-11 text-white drop-shadow-sm transition-transform duration-300 group-hover:scale-110"
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading text-lg font-bold text-secondary-800">
                      {service.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-secondary-500">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:text-primary-800"
                    >
                      Learn More
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
