'use client'

import { BackButtonProps } from "@/types";
import { ArrowLeft } from "lucide-react";
import {useRouter} from "next/navigation"


export default function BackButton(
    {
        label= 'بازگشت',
        fallbackHref= '/',
        className,
    }: BackButtonProps
) {

    const router = useRouter();

    const handleClick = () => {
        if(window.history.length > 1) {
            router.back();
        } else {
            router.push(fallbackHref)
        }
    }
    
    return (
        <button
            onClick={handleClick} className={className ?? "group flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors"}
        >
             {label}
            <ArrowLeft className="w-4 h-4 transition-transform group-hover: translate-x-1" />
        </button>
    )

}