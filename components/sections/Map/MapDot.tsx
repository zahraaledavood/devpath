/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

export function MapDot({item, active}: any) {
    return(
        <div
           style={{
            background: active ? item.color : "rgba(255,255,255,0.15)",
            border: `3px solid ${item.color}`,
            boxShadow: active ? `0 0 20px ${item.glow}` : "none",
            }}
            className="w-5 h-5 rounded-full shrink-0 transition-all duration-300 z-30 relative"
            >
            {active && (
               <div
               style={{
                 border: `2px solid ${item.color}60`,
                 animation: "pulse-ring 2s infinite",
               }}
               className="absolute -inset-2 rounded-full"
             />
            )}
        </div>
    )
}