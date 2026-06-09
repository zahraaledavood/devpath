import { getAllRoadmaps } from "@/lib/roadmap";
import { MapPlus } from "lucide-react";
import RoadmapCard from "@/components/roadmap/RoadmapCard";



export default function RoadmapPage() {

    const roadmaps = getAllRoadmaps();

    return(
        <div className="min-h-screen bg-bg-primary text-white">
            <div className="border-b border-border bg-bg-secondary">
                <div className="mx-auto ma-w-6xl px-6 py-12">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-blue/10">
                            <MapPlus size={20} className="text-accent-blue" />
                        </div>
                        <span className="text-sm text-accent-blue font-medium">
                            نقشه راه یادگیری
                        </span>
                    </div>
                    <h1 className="text-3xl font-extrabold mb-2">مسیرهای شغلی</h1>
                    <p className="text-gray-400 leading-7">
                         از صفر تا ارشد. هر مسیر شامل فازهای مشخص، منابع یادگیری و معیار آمادگی برای مصاحبه‌ست.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-6 py-12">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {roadmaps.map((roadmap) =>(
                        <RoadmapCard key={roadmap.stack} roadmap={roadmap} />
                    ))}
                </div>
            </div>
        </div>
    );
}