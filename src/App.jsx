// Code written and maintained by Elisee Kajingu
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import AppRoutes from "./AppRoutes";
import { showSuccessAlert, showErrorAlert } from "./utils/alerts";

function App() {
  const [session, setSession] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Only show alerts for specific auth events, not on every state change
      if (event === "SIGNED_IN") {
        showSuccessAlert("Welcome back!", `Signed in as ${session.user.email}`);
      } else if (event === "SIGNED_OUT") {
        showSuccessAlert("Signed out successfully");
      } else if (event === "USER_UPDATED") {
        showSuccessAlert("Profile updated successfully");
      } else if (event === "PASSWORD_RECOVERY") {
        showSuccessAlert("Password reset email sent");
      } else if (event === "USER_DELETED") {
        showErrorAlert("Account deleted");
      }

      // Always update the session state
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Show cookie consent banner on first visit
  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookieConsent");

    if (!hasAcceptedCookies) {
      const timer = setTimeout(() => {
        import("sweetalert2").then((Swal) => {
          Swal.default
            .fire({
              title: "Cookie Consent",
              html:
                "We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies. " +
                '<a href="/cookies" class="text-indigo-600 hover:text-indigo-800">Learn more</a>',
              icon: "info",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Accept All",
              cancelButtonText: "Essential Only",
            })
            .then((result) => {
              if (result.isConfirmed) {
                localStorage.setItem("cookieConsent", "all");
              } else {
                localStorage.setItem("cookieConsent", "essential");
              }
            });
        });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return <AppRoutes session={session} />;
}

export default App;
