import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-7 w-7 text-primary" />
        </div>
        <h1 className="font-display text-3xl font-bold">Privacy Policy</h1>
        <p className="mt-2 text-muted-foreground">Last updated: February 2026</p>
      </div>

      <div className="space-y-6 text-muted-foreground">
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-foreground">Data Collection</h2>
          <p>PulseVote collects minimal data: your name, email address, and voting records. We do not track browsing behavior, sell your data, or share it with third parties.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-foreground">Vote Privacy</h2>
          <p>Your individual vote choices are never publicly displayed. Only aggregate results (total votes per option) are shown. We respect your right to a private ballot.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-foreground">Data Storage</h2>
          <p>Currently, all data is stored locally in your browser using localStorage. No data is sent to external servers. In future versions with backend integration, data will be encrypted and stored securely.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-foreground">Your Rights</h2>
          <p>You can clear all your PulseVote data at any time by clearing your browser's local storage. You have full control over your data.</p>
        </section>
        <section>
          <h2 className="mb-2 font-display text-xl font-semibold text-foreground">Contact</h2>
          <p>For privacy concerns, reach out to us at privacy@pulsevote.app.</p>
        </section>
      </div>
    </div>
  );
}
