"use client"

import { useIntersection } from "@/hooks/useIntersection";
import { MapNodeProps } from "@/types"
import { useRef } from "react";
import {MapCard} from "./MapCard";
import {MapConnector} from "./MapConnector";
import {MapDot} from "./MapDot"

export function MapNode({item, index, isLeft, active, onClick}: MapNodeProps) {
    const ref = useRef<HTMLDivElement>(null);
    const visible = useIntersection(ref);
    
    return (
        <div className="flex items-center w-full justify-center cursor-pointer relative z-20 transition-all duration-700 isolate"
            ref={ref}
            onClick={() => onClick(item.id)}
            style={{
            flexDirection: isLeft ? "row-reverse" : "row",
            opacity: visible ? 1 : 0,
            transform: visible
                ? "translateY(0)"
                : `translateY(${isLeft ? -30 : 30}px)`,
            transitionDelay: `${index * 0.15}s`,
            }}
        >
            <MapCard item={item} active={active} />
            <MapConnector item={item} isLeft={isLeft} visible={visible} index={index} />
            <MapDot item={item} active={active} />
        </div>
    )
}