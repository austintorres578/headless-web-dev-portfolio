import {Link} from "react-router-dom";

import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <a href="#">
        <img src="/images/site_logo.png" alt="Austin Torres logo" />
      </a>
      <div>
        <a
          href="https://www.linkedin.com/in/austin-torres-55696420a"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          Linkedin
        </a>
        <a
          href="https://github.com/austintorres578"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          Github
        </a>
        <Link to="/contact">Contact</Link>
      </div>
      <p>© 2026 Austin Torres · Built and hand-coded with care</p>
    </footer>
  );
}
