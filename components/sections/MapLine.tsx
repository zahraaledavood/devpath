"use client"

export function MapLine({lineH} : {lineH : number}) {
    return (
        <>
            <style>{`
            @keyframes flow {
            0%   { background-position: 0 0 }
            100% { background-position: 0 200px }
            }
            `}</style>
            
            <div className="absolute left-1/2 top-0 -translate-x-1/2 w-0.5 z-0 h-full rounded-sm opacity-60 
            transition-[height] duration-2000 ease-in-out bg-size-[2px_200px]"
                style={{
                    height:"100%",
                    animation: lineH === 100 ? "flow 4s linear infinite" :  undefined,
                    background:  "linear-gradient(to bottom, #3B82F6, #8B5CF6, #06B6D4, #10B981, #F59E0B)"
                }}
            >
            </div>
        </>
    )
}