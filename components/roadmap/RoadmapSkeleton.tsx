"use client";

export default function RoadmapSkeleton() {
  return (
    <div className="relative h-full rounded-2xl border border-border bg-bg-card px-6 py-8  overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 25%, rgba(255,255,255,0.04) 50%, transparent 75%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s ease-in-out infinite",
        }}
      />

      <div className="flex justify-start">
        <div className="h-5 w-16 rounded-full bg-white/10"></div>
      </div>

      <div className="h-6 w-32 rounded-md mt-4 bg-white/10 ml-auto"></div>

      <div className="h-3.5 w-full rounded-md mt-4 bg-white/10"></div>
      <div className="h-3.5 w-3/4 rounded-md mt-2 bg-white/10"></div>

      <div className="flex gap-4 mt-5">
        <div className="h-3.5 w-10 rounded-md bg-white/10"></div>
        <div className="h-3.5 w-10 rounded-md bg-white/10"></div>
        <div className="h-3.5 w-10 rounded-md bg-white/10"></div>
      </div>

      <div className="flex gap-2 mt-4">
        <div className="h-5 w-14 rounded-full bg-white/10"></div>
        <div className="h-5 w-14 rounded-full bg-white/10"></div>
        <div className="h-5 w-14 rounded-full bg-white/10"></div>
      </div>
    </div>
  );
}
