import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, X, HelpCircle, Vote, BarChart3, UserPlus } from "lucide-react";

const helpTopics = [
  {
    icon: UserPlus,
    q: "How do I register?",
    a: "Click 'Sign Up' in the navbar, enter your name, email, and password. You'll be logged in immediately!",
  },
  {
    icon: Vote,
    q: "How do I vote?",
    a: "Go to 'Active Polls', select a poll, choose your option, and click 'Cast Vote'. You can only vote once per poll.",
  },
  {
    icon: BarChart3,
    q: "How do I view results?",
    a: "After voting, results are shown immediately. You can also visit the 'Results' page to see all poll outcomes.",
  },
  {
    icon: HelpCircle,
    q: "Can I change my vote?",
    a: "No — to ensure fairness, each vote is final. Make sure you're confident before submitting!",
  },
];

export function HelpAssistant() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 w-80 rounded-xl border bg-card shadow-xl animate-scale-in">
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="font-display font-semibold text-primary">Help Assistant</h3>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="max-h-80 overflow-y-auto p-4 space-y-3">
            {helpTopics.map((t, i) => (
              <div key={i} className="rounded-lg bg-muted p-3">
                <div className="flex items-center gap-2 font-medium text-sm">
                  <t.icon className="h-4 w-4 text-primary" /> {t.q}
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{t.a}</p>
              </div>
            ))}
            <div className="rounded-lg border border-dashed p-3 text-center text-xs text-muted-foreground">
              🤖 AI-powered assistant coming soon!
            </div>
          </div>
        </div>
      )}
      <Button
        size="lg"
        className="h-14 w-14 rounded-full shadow-lg"
        onClick={() => setOpen(!open)}
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  );
}
