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
          <h2 className="mb-1 font-semibold">Introduction</h2>
          <p className="text-muted-foreground">
            Student Expense Tracker ("the App") is designed to help students track personal expenses. 
            Your privacy is important to us. This policy explains how the App handles your data.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Data Storage</h2>
          <p className="text-muted-foreground">
            All data is stored locally on your device using your browser's or app's local storage. 
            No data ever leaves your device. No cloud syncing or remote backups are performed.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Data Collection</h2>
          <p className="text-muted-foreground">
            We do <span className="font-semibold text-foreground">not</span> collect, store, process, 
            or transmit any personal data. No usage analytics, crash reports, or telemetry data is gathered.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Third-Party Services</h2>
          <p className="text-muted-foreground">
            This app does not integrate with any third-party analytics, advertising, tracking SDKs, 
            or external APIs. No data is shared with third parties.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">No Account Required</h2>
          <p className="text-muted-foreground">
            No login, signup, email address, or any personal information is required to use this app. 
            The app functions fully without any form of user identification.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Permissions</h2>
          <p className="text-muted-foreground">
            This app does not request access to your camera, microphone, contacts, location, 
            or any other device sensors. It only uses local storage to save your expense data on your device.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Children's Privacy</h2>
          <p className="text-muted-foreground">
            This app does not knowingly collect any information from children under 13. Since no data 
            is collected from any user, this app is safe for users of all ages.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Data Deletion</h2>
          <p className="text-muted-foreground">
            You can export, import, or permanently delete all your data at any time from the Settings page. 
            Use the "Clear All Data" option to remove all stored information. Uninstalling the app also 
            removes all locally stored data.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Changes to This Policy</h2>
          <p className="text-muted-foreground">
            We may update this privacy policy from time to time. Any changes will be reflected on this page 
            with an updated date below.
          </p>
        </section>

        <section>
          <h2 className="mb-1 font-semibold">Contact</h2>
          <p className="text-muted-foreground">
            If you have questions about this privacy policy, please reach out through the app's 
            Google Play Store listing page.
          </p>
        </section>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Effective date: April 16, 2026 · Last updated: April 16, 2026
      </p>
    </div>
  );
}
