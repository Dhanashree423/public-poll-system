import { getPolls } from "@/lib/store";
import { PollCard } from "@/components/PollCard";
import { Vote } from "lucide-react";

export default function PollsPage() {
  const polls = getPolls().filter((p) => p.status === "active");

  return (
    <div className="container py-10">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <Vote className="h-7 w-7 text-primary" />
          <h1 className="font-display text-3xl font-bold">Active Polls</h1>
        </div>
        <p className="mt-1 text-muted-foreground">Browse and vote on current polls. One vote per poll — make it count!</p>
      </div>

      {polls.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No active polls at the moment. Check back soon!</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll, i) => (
            <PollCard key={poll.id} poll={poll} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
