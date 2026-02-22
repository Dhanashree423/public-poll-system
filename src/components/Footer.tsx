import { Link } from "react-router-dom";
import { Vote, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-display text-lg font-bold text-primary">
              <Vote className="h-5 w-5" /> PulseVote
            </div>
            <p className="text-sm text-muted-foreground italic">"Your Voice, Your Choice."</p>
          </div>

          <div>
            <h4 className="mb-3 font-display font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/polls" className="hover:text-primary transition-colors">Active Polls</Link></li>
              <li><Link to="/results" className="hover:text-primary transition-colors">Results</Link></li>
              <li><Link to="/history" className="hover:text-primary transition-colors">Poll History</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display font-semibold">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 font-display font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@pulsevote.app</li>
              <li>contact@pulsevote.app</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-1 border-t pt-6 text-sm text-muted-foreground">
          Made with <Heart className="h-3 w-3 text-destructive" /> by PulseVote Team &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
}
