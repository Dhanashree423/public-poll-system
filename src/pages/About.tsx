import { Vote, Shield, Users, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold">About PulseVote</h1>
        <p className="mt-2 text-lg text-muted-foreground">Empowering communities through transparent, secure voting.</p>
      </div>

      <div className="prose prose-lg mx-auto mb-10 text-muted-foreground">
        <p>
          PulseVote was created with a simple mission: to give everyone a voice. We believe that every opinion matters,
          and our platform makes it easy to participate in polls, view real-time results, and see the collective pulse
          of communities worldwide.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {[
          { icon: Shield, title: "Secure", desc: "One vote per user per poll. No manipulation, no duplicates." },
          { icon: Eye, title: "Transparent", desc: "Results are visible to everyone after voting. No hidden agendas." },
          { icon: Users, title: "Inclusive", desc: "Free to use, easy to navigate, accessible to all." },
          { icon: Vote, title: "Fair", desc: "Every vote carries equal weight. Your voice truly matters." },
        ].map((v, i) => (
          <Card key={i} className="text-center">
            <CardContent className="pt-6">
              <v.icon className="mx-auto mb-3 h-10 w-10 text-primary" />
              <h3 className="font-display text-lg font-semibold">{v.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
