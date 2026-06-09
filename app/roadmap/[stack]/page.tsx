import { getRoadmap } from "@/lib/roadmap";
import { notFound } from "next/navigation";
import { Stack } from "@/types";
import RoadmapDetail from "@/components/roadmap/RoadmapDetail";

export default async function Page({ params }: { params: Promise<{ stack: string }> }) {
  const { stack } = await params;
  const roadmap = getRoadmap(stack as Stack);

  if (!roadmap) notFound();

  return <RoadmapDetail roadmap={roadmap} />;
}