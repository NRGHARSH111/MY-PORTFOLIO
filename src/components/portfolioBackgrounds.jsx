function Frame({ children, overlay }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-900 text-slate-100">
      <div className="pointer-events-none absolute inset-0">{overlay}</div>
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export function AnimatedGridBackground({ children, effect = 0 }) {
  const effects = [
    <>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#0b1224_0%,#1a2639_48%,#32445f_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_14%,rgba(56,189,248,0.28),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(167,139,250,0.24),transparent_32%)]" />
      <div className="absolute inset-0 opacity-34 [background-image:linear-gradient(rgba(186,230,253,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(186,230,253,0.3)_1px,transparent_1px)] [background-size:42px_42px]" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(8,15,30,0.62)_78%)]" />
      <div className="absolute -left-1/3 top-0 h-full w-[55%] rotate-12 bg-gradient-to-r from-transparent via-slate-950/60 to-transparent blur-xl motion-safe:animate-[sweep_7s_linear_infinite]" />
      <div className="absolute -right-1/3 top-0 h-full w-[55%] -rotate-12 bg-gradient-to-l from-transparent via-cyan-100/45 to-transparent blur-xl motion-safe:animate-[sweep_9s_linear_infinite_reverse]" />
    </>,
    <>
      <div className="absolute inset-0 bg-[linear-gradient(165deg,#111827_0%,#1f2937_46%,#3b2f76_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(59,130,246,0.32),transparent_35%),radial-gradient(circle_at_82%_6%,rgba(129,140,248,0.28),transparent_34%)]" />
      <div className="absolute inset-0 opacity-28 [background-image:linear-gradient(rgba(196,181,253,0.34)_1px,transparent_1px),linear-gradient(90deg,rgba(196,181,253,0.34)_1px,transparent_1px)] [background-size:38px_38px]" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_8%,rgba(10,15,30,0.55)_82%)]" />
      <div className="absolute -left-1/4 top-0 h-full w-[58%] rotate-12 bg-gradient-to-r from-transparent via-black/55 to-transparent blur-xl motion-safe:animate-[sweep_6.8s_linear_infinite]" />
      <div className="absolute -right-1/4 top-0 h-full w-[58%] -rotate-12 bg-gradient-to-l from-transparent via-violet-100/42 to-transparent blur-xl motion-safe:animate-[sweep_8.8s_linear_infinite_reverse]" />
    </>,
    <>
      <div className="absolute inset-0 bg-[linear-gradient(160deg,#0a1020_0%,#17325f_52%,#1e3a5f_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_16%,rgba(165,180,252,0.28),transparent_35%),radial-gradient(circle_at_78%_10%,rgba(45,212,191,0.24),transparent_33%)]" />
      <div className="absolute inset-0 opacity-26 [background-image:linear-gradient(rgba(167,243,208,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(167,243,208,0.28)_1px,transparent_1px)] [background-size:46px_46px]" />
      <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0%,rgba(3,10,24,0.62)_80%)]" />
      <div className="absolute -left-1/3 top-0 h-full w-[56%] rotate-12 bg-gradient-to-r from-transparent via-slate-950/58 to-transparent blur-xl motion-safe:animate-[sweep_7.5s_linear_infinite]" />
      <div className="absolute -right-1/3 top-0 h-full w-[56%] -rotate-12 bg-gradient-to-l from-transparent via-teal-100/45 to-transparent blur-xl motion-safe:animate-[sweep_10s_linear_infinite_reverse]" />
    </>,
  ]

  return (
    <Frame overlay={effects[effect % effects.length]}>
      {children}
    </Frame>
  )
}
