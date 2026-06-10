import { getAllRoadmaps } from "@/lib/roadmap";
import RoadmapCard from "./RoadmapCard";

export default async function RoadmapList() {
    
    await new Promise(r => setTimeout(r, 2000))
    const roadmaps = await getAllRoadmaps();
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {roadmaps.map((roadmap) => (
                <RoadmapCard key={roadmap.stack} roadmap={roadmap} />
            ))}
        </div>
    )
}