/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

export function MapCard({item, active}: any) {
    return(
        <div
        className={`w-70 rounded-2xl px-6 py-5 backdrop-blur-xl transition-all duration-300 relative overflow-hidden z-0 ${
            active ? "bg-white/10" : "bg-white/5"
          }`}
          style={{
            border: `1px solid ${active ? item.color : "rgba(255,255,255,0.08)"}`,
            boxShadow: active
              ? `0 0 40px ${item.glow}, 0 8px 32px rgba(0,0,0,0.3)`
              : "0 4px 20px rgba(0,0,0,0.2)",
          }}    
        >
            {active && (
                <div className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                    background: `linear-gradient(135deg, transparent 30%, ${item.glow} 50%, transparent 70%)`,
                    animation: "shimmer 2.5s infinite",
                  }}        
                />
            )}

            <div className="flex items-center gap-3 mb-10 relative z-10">
                <span className="text-3xl">{item.icon}</span>
                <div>
                    <div className="text-xs font-bold tracking-0.5 mb-0.5">
                        مرحله {item.level}
                    </div>
                    <div className="text-base font-bolf text-white leading-tight rtl">
                        {item.title}
                    </div>
                </div>
            </div>

            <p className="flex gap-1.5 flex-wrap relative z-10">
                {item.tags.map((tag:string)=> (
                    <span
                        key={tag}
                        style={{
                        background: `${item.color}18`,
                        color: item.color,
                        border: `1px solid ${item.color}40`,
                        }}
                        className="text-xs px-2.5 py-0.5 rounded-full font-semibold tracking-[0.5px] mx-0.5"
                    >
                        {tag}
                    </span>
                ))}
            </p>
        </div>
    )
}