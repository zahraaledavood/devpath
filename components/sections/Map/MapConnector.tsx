/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"


export function MapConnector({item, isLeft, visible, index}: any){
    return(
        <div
        style={{
          background: `linear-gradient(${
            isLeft ? "to left" : "to right"
          }, transparent, ${item.color})`,
          opacity: visible ? 1 : 0,
          transition: `opacity 0.5s ease ${index * 0.15 + 0.4}s`,
        }}
        className="w-15 h-0.5 shrink-0"
      />
    )
}