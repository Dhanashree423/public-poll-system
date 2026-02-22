import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import type { Poll } from "@/lib/store";
import { Clock, Users, ArrowRight } from "lucide-react";

const bgColors = [
  "bg-lavender",
  "bg-mint",
  "bg-peach",
  "bg-accent",
];

export function PollCard({ poll, index = 0 }: { poll: Poll; index?: number }) {
  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
  const bgColor = bgColors[index % bgColors.length];

  return (
    <Card className={`overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 ${bgColor}/30`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <Badge variant={poll.status === "active" ? "default" : "secondary"}>
            {poll.status === "active" ? "Active" : "Closed"}
          </Badge>
          <Badge variant="outline">{poll.category}</Badge>
        </div>
        <CardTitle className="mt-2 font-display text-lg">{poll.title}</CardTitle>
        <CardDescription className="line-clamp-2">{poll.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {totalVotes} votes</span>
          <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Ends {new Date(poll.endsAt).toLocaleDateString()}</span>
        </div>
        <Link to={poll.status === "active" ? `/polls/${poll.id}` : `/results/${poll.id}`}>
          <Button variant="outline" className="w-full group">
            {poll.status === "active" ? "Vote Now" : "View Results"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
