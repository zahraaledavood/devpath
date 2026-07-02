"use client"

import { CATEGORY_LABELS, Resume, ResumeCategory } from "@/types"
import { Search } from "lucide-react"
import { useMemo, useState } from "react";
import ResumeRow from "./ResumeRow";

const CATEGORIES: (ResumeCategory | 'all')[] = ['all', 'frontend', 'backend', 'fullstack', 'devops'];

export default function ResumeClient({resumes} : {resumes: Resume[]}) {

    const [query, setQuery] = useState('');
    const [category, setCategory] = useState<ResumeCategory | 'all'>('all');

    const filtered = useMemo(() => {
        return resumes.filter((r) => {
            const matchCategory = category === 'all' || r.category === category;
            const matchQuery = 
            query.trim() === '' ||
            r.full_name.includes(query) ||
            r.role_title.includes(query) ||
            r.stack.some((s) => s.toLowerCase().includes(query.toLowerCase()));
            
            return matchCategory && matchQuery
        });
    }, [resumes, query, category] )

    return(
       <div>
            <div className="mb-5 flex items-center gap-2 border border-white/10 bg-white/[0.03] py-2 px-2.5 rounded-lg">
                <Search size={16} className="text-slate-500" />
                <input value={query} placeholder="جستجو بر اساس نام یا تخصص" 
                    className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
            
            <div className="gap-2 flex flex-wrap mb-5">
                {CATEGORIES.map((cat) => (
                    <button key={cat}
                        onClick={() => setCategory(cat)}
                        className={`rounded-full  px-3.5 py-1.5 text-xs transition-colors 
                            ${category === cat ? 'bg-blue-500 font-medium text-white text-xs' 
                                : 'border border-white/10 bg-white/[0.0.5] text-slate-300 hover:bg-white/[0.08]'
                             }`}
                    >
                        {cat === 'all'? 'همه' : CATEGORY_LABELS[cat]}
                    </button>
                ))}
            </div>

            <div className="flex flex-col gap-3">
                {filtered.map((resume)=> (
                    <ResumeRow key={resume.id} resume={resume} />
                ))}

                {filtered.length === 0 && (
                    <p className="py-10 text-center text-sm text-slate-500">
                        رزومه ای با این مشخصات یافت نشد.
                    </p>
                )}
            </div>
       </div>
    )
}