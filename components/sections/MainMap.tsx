"use client"

import { useEffect, useRef, useState } from "react";
import {MapNode} from "./MapNode";
import {MapLine} from "./MapLine"
import mapItems from "@/content/roadmaps/mapItems.json"

export default function MainMap(){
  const [active, setActive] = useState<number | null>(null);
  const [lineH, setLineH] = useState<number>(0);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(()=> {
    const timer = setTimeout(() => setLineH(100), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggle = (id:number) => setActive((prev) => (prev === id ? null : id))

  return (
    <section className="relative w-full px-5 py-20 overflow-hidden" ref={containerRef}>
      <div className="relative max-w-2xl mx-auto flex flex-col">
        <MapLine lineH={lineH} />
        <div className="flex flex-col gap-10">
          {mapItems.map((item, i) => (
              <MapNode
                key={item.id}
                item={item}
                index={i}
                isLeft={i%2 === 0}
                active={active === item.id}
                onClick = {toggle}
              />
          ))}
        </div>
      </div>
    </section>
  )
}