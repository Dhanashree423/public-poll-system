import { getPolls } from "@/lib/store";
import { PollCard } from "@/components/PollCard";
import { History } from "lucide-react";

export default function PollHistoryPage() {
  const closedPolls = getPolls().filter((p) => p.status === "closed");

  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <History className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl font-bold">Poll History</h1>
        </div>
        <p className="mt-1 text-muted-foreground">Browse previously completed polls and their outcomes.</p>
      </div>
      {closedPolls.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No closed polls yet.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {closedPolls.map((poll, i) => (
            <PollCard key={poll.id} poll={poll} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
