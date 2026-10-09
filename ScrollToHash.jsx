import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Scrolls to the element matching the URL hash after each navigation.
// With no hash, scrolls to the top, except on back/forward (POP)
// navigations, so the browser's own scroll restoration isn't overridden.
export default function ScrollToHash() {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (location.hash) {
      // "smooth" animates; change to "auto" for an instant jump
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (navigationType !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [location, navigationType]);

  return null;
}
