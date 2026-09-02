import { STATS } from "../constData/const";

export default function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-linear-to-r from-primary-700 via-primary-600 to-accent-600">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
      <div className="container-app relative grid grid-cols-2 gap-4 py-12 sm:grid-cols-3 lg:grid-cols-6">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-2.5 rounded-2xl border border-white/10 bg-white/10 py-6 text-center text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <stat.icon className="h-5.5 w-5.5 text-white" />
            </span>
            <p className="font-heading text-2xl font-extrabold sm:text-3xl">{stat.value}</p>
            <p className="text-xs text-white/80 sm:text-sm">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
