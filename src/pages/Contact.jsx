import { useState } from "react";
import { Link } from "react-router-dom";

import emailIcon from "../assets/icons/email.svg";
import phoneIcon from "../assets/icons/phone.svg";
import linkedinIcon from "../assets/icons/linkedin.svg";
import githubIcon from "../assets/icons/github.svg";
import resumeIcon from "../assets/icons/resume.svg";

import ColorDiv from "../components/layout/ColorDiv.jsx";

import styles from "./Contact.module.css";

const WEB3FORMS_ACCESS_KEY = "7eab3768-1a8b-4e80-8264-1bb34328c42b";

export default function Contact() {
  const [status, setStatus] = useState("idle"); // 'idle' | 'submitting' | 'success' | 'error'

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.target);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setStatus(data.success ? "success" : "error");
      if (data.success) {
        e.target.reset();
      }
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  }

  return (
    <>
      <section className={styles["contact-hero"]}>
        <div className={styles["section-wrapper"]}>
          <Link to="/" className={styles["back-home"]}>
            Back to home
          </Link>
          <span className={styles["eyebrow"]}>GET IN TOUCH</span>
          <h1>Let's talk about an opportunity</h1>
          <p>
            Open to front-end and React roles — reach out and I'll get back to
            you quickly.
          </p>
        </div>
      </section>
      <ColorDiv />
      <section className={styles["contact-section"]}>
        <div className={styles["section-wrapper"]}>
          <div className={styles["contact-details"]}>
            <span>Direct</span>
            <ul>
              <li>
                <img src={emailIcon} alt="" />
                <a
                  className={styles["email"]}
                  href="mailto:austintorres578@outlook.com"
                >
                  austintorres578@outlook.com
                </a>
              </li>
              <li>
                <img src={phoneIcon} alt="" />
                <a className={styles["phone"]} href="tel:9088758077">
                  (908) 875-8077
                </a>
              </li>
            </ul>
            <span>Elsewhere</span>
            <ul>
              <li>
                <img
                  src={linkedinIcon}
                  alt="https://www.linkedin.com/in/austin-torres-55696420a"
                />
                <a
                  className={styles["linkedin"]}
                  href="https://www.linkedin.com/in/austin-torres-55696420a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <img src={githubIcon} alt="" />
                <a
                  href="https://github.com/austintorres578"
                  className={styles["github"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
              <li>
                <img src={resumeIcon} alt="" />
                <a
                  href="/Austin_Torres_Resume.pdf"
                  download
                  className={styles["resume"]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download Resume
                </a>
              </li>
            </ul>
            <div className={styles["details-sub"]}>
              <p>
                I typically respond within 1–2 business days. For time-sensitive
                opportunities, email is fastest.
              </p>
            </div>
          </div>

          <div className={styles["contact-form-con"]}>
            <form onSubmit={handleSubmit}>
              <div>
                <label>
                  Name
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    name="email"
                    placeholder="johndoe@company.com"
                    required
                  />
                </label>
                <label>
                  Company (optional)
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Inc."
                  />
                </label>
                <label>
                  Role you're hiring for (optional)
                  <input
                    type="text"
                    name="role"
                    placeholder="Full-Stack Developer"
                  />
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Tell me a bit about the role or opportunity..."
                  required
                ></textarea>
              </label>
              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : "Send A Message"}
              </button>
              {status === "success" && (
                <p role="status" className={styles["status"]}>
                  Thanks — I'll get back to you soon.
                </p>
              )}
              {status === "error" && (
                <p role="alert" className={styles["status-bad"]}>
                  Something went wrong. Please try again or email me directly.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
      <ColorDiv />
    </>
  );
}
