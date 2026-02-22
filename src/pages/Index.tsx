import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PollCard } from "@/components/PollCard";
import { getPolls, getUserImpact } from "@/lib/store";
import { useAuth } from "@/lib/auth-context";
import { Vote, TrendingUp, Shield, Users, Award } from "lucide-react";

const Index = () => {
  const { user } = useAuth();
  const polls = getPolls();
  const activePolls = polls.filter((p) => p.status === "active");
  const impact = getUserImpact();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-lavender/40 to-mint/40 py-20 md:py-32">
        <div className="container relative z-10">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
              🗳️ Secure • Transparent • Fair
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
              Your Voice,{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Your Choice
              </span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              PulseVote makes it easy to participate in polls, share your opinion, and see real-time results.
              Every vote counts — make yours heard.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/polls">
                <Button size="lg" className="gap-2 text-base">
                  <Vote className="h-5 w-5" /> Start Voting
                </Button>
              </Link>
              {!user && (
                <Link to="/signup">
                  <Button size="lg" variant="outline" className="text-base">
                    Create Account
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl" />
      </section>

      {/* Stats */}
      <section className="border-b bg-card py-8">
        <div className="container grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: Vote, label: "Active Polls", value: activePolls.length },
            { icon: Users, label: "Total Votes", value: polls.reduce((s, p) => s + p.options.reduce((a, o) => a + o.votes, 0), 0) },
            { icon: Shield, label: "Secure Voting", value: "100%" },
            { icon: TrendingUp, label: "Polls Created", value: polls.length },
          ].map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 text-center">
              <s.icon className="h-6 w-6 text-primary" />
              <span className="font-display text-2xl font-bold">{s.value}</span>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Badge */}
      {user && impact > 0 && (
        <section className="container py-6">
          <div className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-lavender to-mint p-4">
            <Award className="h-8 w-8 text-primary" />
            <div>
              <p className="font-display font-semibold">Your Impact</p>
              <p className="text-sm text-muted-foreground">
                You've participated in <strong>{impact}</strong> poll{impact !== 1 ? "s" : ""}! Keep voting to make a difference.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Active Polls */}
      <section className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold md:text-3xl">Active Polls</h2>
            <p className="text-muted-foreground">Cast your vote on today's most important topics</p>
          </div>
          <Link to="/polls">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activePolls.slice(0, 3).map((poll, i) => (
            <PollCard key={poll.id} poll={poll} index={i} />
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="bg-gradient-to-r from-primary/5 to-accent/30 py-16">
          <div className="container text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">Ready to Make Your Voice Heard?</h2>
            <p className="mt-2 text-muted-foreground">Join thousands of voters on PulseVote today.</p>
            <Link to="/signup">
              <Button size="lg" className="mt-6">Get Started Free</Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
};

export default Index;
