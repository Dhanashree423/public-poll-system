import { useParams, Link } from "react-router-dom";
import { getPolls, getPollById } from "@/lib/store";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, Trophy, ArrowLeft } from "lucide-react";

function ResultBar({ label, votes, total, isWinner }: { label: string; votes: number; total: number; isWinner: boolean }) {
  const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span className="flex items-center gap-1.5 font-medium">
          {isWinner && <Trophy className="h-4 w-4 text-warning" />}
          {label}
        </span>
        <span className="text-muted-foreground">{votes} votes ({pct}%)</span>
      </div>
      <div className="h-4 w-full overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full transition-all duration-700 ${isWinner ? "bg-primary" : "bg-primary/40"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const { id } = useParams<{ id: string }>();

  // If specific poll
  if (id) {
    const poll = getPollById(id);
    if (!poll) return <div className="container py-20 text-center text-muted-foreground">Poll not found.</div>;

    const total = poll.options.reduce((s, o) => s + o.votes, 0);
    const maxVotes = Math.max(...poll.options.map((o) => o.votes));

    return (
      <div className="container max-w-2xl py-10">
        <Link to="/results">
          <Button variant="ghost" size="sm" className="mb-4 gap-1"><ArrowLeft className="h-4 w-4" /> All Results</Button>
        </Link>
        <Card className="animate-fade-in">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge>{poll.category}</Badge>
              <Badge variant={poll.status === "active" ? "default" : "secondary"}>{poll.status}</Badge>
            </div>
            <CardTitle className="mt-2 font-display text-2xl">{poll.title}</CardTitle>
            <CardDescription>{total} total votes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {poll.options.map((o) => (
              <ResultBar key={o.id} label={o.text} votes={o.votes} total={total} isWinner={o.votes === maxVotes && maxVotes > 0} />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  // All results
  const polls = getPolls();

  return (
    <div className="container py-10">
      <div className="mb-8 flex items-center gap-2">
        <BarChart3 className="h-7 w-7 text-primary" />
        <h1 className="font-display text-3xl font-bold">Poll Results</h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {polls.map((poll) => {
          const total = poll.options.reduce((s, o) => s + o.votes, 0);
          const maxVotes = Math.max(...poll.options.map((o) => o.votes));
          return (
            <Card key={poll.id} className="animate-fade-in">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{poll.category}</Badge>
                  <Badge variant={poll.status === "active" ? "default" : "secondary"}>{poll.status}</Badge>
                </div>
                <CardTitle className="mt-1 font-display text-lg">{poll.title}</CardTitle>
                <CardDescription>{total} votes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {poll.options.map((o) => (
                  <ResultBar key={o.id} label={o.text} votes={o.votes} total={total} isWinner={o.votes === maxVotes && maxVotes > 0} />
                ))}
                <Link to={`/results/${poll.id}`}>
                  <Button variant="ghost" size="sm" className="mt-2 w-full">View Details</Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
