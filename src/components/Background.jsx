function Background({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute left-1/3 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-[26rem] w-[26rem] rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute bottom-[-7rem] left-24 h-80 w-80 rounded-full bg-indigo-500/20 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27160%27 height=%27160%27 viewBox=%270 0 160 160%27%3E%3Cg fill=%27white%27 fill-opacity=%270.9%27%3E%3Ccircle cx=%2712%27 cy=%2714%27 r=%270.8%27/%3E%3Ccircle cx=%2760%27 cy=%2732%27 r=%270.8%27/%3E%3Ccircle cx=%27126%27 cy=%2720%27 r=%270.8%27/%3E%3Ccircle cx=%2735%27 cy=%2792%27 r=%270.8%27/%3E%3Ccircle cx=%2798%27 cy=%2780%27 r=%270.8%27/%3E%3Ccircle cx=%27142%27 cy=%27118%27 r=%270.8%27/%3E%3Ccircle cx=%2724%27 cy=%27142%27 r=%270.8%27/%3E%3Ccircle cx=%2784%27 cy=%27140%27 r=%270.8%27/%3E%3Ccircle cx=%27132%27 cy=%2768%27 r=%270.8%27/%3E%3C/g%3E%3C/svg%3E")',
            backgroundSize: '180px 180px',
          }}
        />
      </div>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default Background
