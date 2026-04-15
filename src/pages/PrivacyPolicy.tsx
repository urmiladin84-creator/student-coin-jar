import { ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4 p-4 pb-24">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold">Privacy Policy</h1>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 text-sm leading-relaxed">
        <section>
          <h2 className="mb-1 font-semibold">Data Storage</h2>
          <p className="text-muted-foreground">
            All data is stored locally on your device using your browser's localStorage. No data ever leaves your device.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Data Collection</h2>
          <p className="text-muted-foreground">
            No data is collected, shared, or transmitted to any server. This app works entirely offline.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground">
            This app does not use any third-party analytics, trackers, advertising SDKs, or external APIs.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">No Account Required</h2>
          <p className="text-muted-foreground">
            No login, signup, email, or personal information is required to use this app.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Your Control</h2>
          <p className="text-muted-foreground">
            You can export, import, or delete all your data at any time from the Settings page. Use the "Clear All Data" option to permanently remove all stored information.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            If you have questions about this privacy policy, please reach out through the app's distribution page.
          </p>
        </section>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Last updated: {new Date().toLocaleDateString()}
      </p>
    </div>
  );
}
