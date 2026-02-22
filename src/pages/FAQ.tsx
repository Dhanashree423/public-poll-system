import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqs = [
  { q: "What is PulseVote?", a: "PulseVote is a secure online voting platform where users can vote on various topics and issues. It's designed to be simple, transparent, and fair." },
  { q: "How do I create an account?", a: "Click the 'Sign Up' button in the top navigation bar. Enter your name, email address, and a password (at least 6 characters). You'll be logged in immediately after registration." },
  { q: "Can I vote more than once on the same poll?", a: "No. Each user can cast exactly one vote per poll. This ensures fairness and prevents manipulation of results." },
  { q: "Can I change my vote after submitting?", a: "No, votes are final once submitted. Please review your choice carefully before casting your vote." },
  { q: "How are results calculated?", a: "Results are calculated in real-time based on all submitted votes. The results page shows bar charts with vote counts and percentages for each option." },
  { q: "Is my vote anonymous?", a: "Your individual vote choice is not publicly visible. Only aggregate results (total votes per option) are displayed." },
  { q: "What happens when a poll closes?", a: "Closed polls can no longer accept votes. They move to the 'Poll History' page where anyone can view the final results." },
  { q: "How do I view results?", a: "You can view results after voting by clicking 'View Results', or visit the Results page from the navigation bar to see all poll outcomes." },
  { q: "What is the 'Your Impact' badge?", a: "The Impact badge on the homepage shows how many polls you've participated in — a fun way to track your civic engagement!" },
  { q: "Is PulseVote free to use?", a: "Yes! PulseVote is completely free. Create an account, vote on polls, and view results at no cost." },
];

export default function FAQPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <HelpCircle className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="mt-2 text-muted-foreground">Everything you need to know about PulseVote</p>
      </div>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border bg-card px-4">
            <AccordionTrigger className="text-left font-medium hover:no-underline">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
