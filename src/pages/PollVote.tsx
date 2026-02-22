import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPollById, castVote } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle2, Vote, AlertTriangle } from "lucide-react";

export default function PollVotePage() {
  const { id } = useParams<{ id: string }>();
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [voted, setVoted] = useState(false);
  const poll = getPollById(id || "");

  if (!poll) {
    return <div className="container py-20 text-center text-muted-foreground">Poll not found.</div>;
  }

  const alreadyVoted = user?.votedPolls.includes(poll.id);

  const handleVote = () => {
    if (!user) {
      toast.error("Please log in to vote.");
      navigate("/login");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select an option.");
      return;
    }
    const result = castVote(poll.id, selectedOption);
    if (result.success) {
      setVoted(true);
      refresh();
      toast.success("Thank you for voting! 🎉");
    } else {
      toast.error(result.error);
    }
  };

  if (voted || alreadyVoted) {
    return (
      <div className="container flex min-h-[60vh] items-center justify-center py-10">
        <Card className="w-full max-w-lg animate-scale-in text-center">
          <CardHeader>
            <CheckCircle2 className="mx-auto h-16 w-16 text-success" />
            <CardTitle className="font-display text-2xl">Thank You for Voting!</CardTitle>
            <CardDescription>Your vote on "{poll.title}" has been recorded.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => navigate(`/results/${poll.id}`)}>View Results</Button>
            <Button variant="outline" onClick={() => navigate("/polls")}>Back to Polls</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card className="animate-fade-in">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Badge>{poll.category}</Badge>
            <Badge variant="outline">Active</Badge>
          </div>
          <CardTitle className="mt-2 font-display text-2xl">{poll.title}</CardTitle>
          <CardDescription>{poll.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!user && (
            <div className="flex items-center gap-2 rounded-lg bg-warning/10 p-3 text-sm text-warning-foreground">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>You need to <a href="/login" className="underline font-medium">log in</a> to vote.</span>
            </div>
          )}

          {poll.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                selectedOption === option.id
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  selectedOption === option.id ? "border-primary bg-primary" : "border-muted-foreground/30"
                }`}>
                  {selectedOption === option.id && <CheckCircle2 className="h-4 w-4 text-primary-foreground" />}
                </div>
                <span className="font-medium">{option.text}</span>
              </div>
            </button>
          ))}

          <Button onClick={handleVote} size="lg" className="mt-4 w-full gap-2" disabled={!user}>
            <Vote className="h-5 w-5" /> Cast Vote
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
