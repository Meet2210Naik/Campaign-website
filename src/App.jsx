import "./App.css";
import { useRef, useEffect, useState } from "react";
import candidatePhoto from "./assets/img/candidate-img.webp";
import present from "./assets/img/present1.webp";
import present1 from "./assets/img/present2.webp";
import present2 from "./assets/img/present3.webp";
import aboutpic from "./assets/img/aboutpic.webp";
import confetti from "canvas-confetti";

function App() {
  const navbarRef = useRef(null);
  const infoRef = useRef(null);
  const footerRef = useRef(null);
  const testimonialRef = useRef(null);
  const visionRef = useRef(null);
  const policyRef = useRef(null);
  const impactRef = useRef(null);
  const aboutRef = useRef(null);
  const achievementRef = useRef(null);

  const [activeVision, setActiveVision] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVoteButton, setShowVoteButton] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [displayFull, setDisplayFull] = useState(false);
const [flipped, setFlipped] = useState(false);

  const timeoutRef = useRef(null);

  const wordCount = 11;
  const animationDelay = 0.4;

  // ================= Preloader =================
  useEffect(() => {
    const baseDelay = 0.5;
    const animationDuration = 0.8;
    const totalDuration =
      (wordCount - 1) * animationDelay + baseDelay + animationDuration + 1;

    const timer = setTimeout(() => setShowPreloader(false), totalDuration * 1000);
    return () => clearTimeout(timer);
  }, []);

  // ================= Navbar scroll effect =================
  useEffect(() => {
    const scrollable = infoRef.current;
    if (!scrollable || !navbarRef.current || !footerRef.current) return;

    const handleScroll = () => {
      const scrollTop = scrollable.scrollTop;
      const maxScroll = 200;

      const navbarOpacity = Math.max(0.4, 0.9 - scrollTop / maxScroll);
      navbarRef.current.style.background = `rgba(31, 41, 55, ${navbarOpacity})`;

      const footerOpacity = Math.min(0.9, scrollTop / maxScroll);
      footerRef.current.style.background = `rgba(31, 41, 55, ${footerOpacity})`;
      footerRef.current.style.backdropFilter = scrollTop > 20 ? "blur(6px)" : "blur(0px)";
    };

    scrollable.addEventListener("scroll", handleScroll);
    return () => scrollable.removeEventListener("scroll", handleScroll);
  }, [showPreloader]);

  // ================= Expand title effect =================
  const handleExpand = () => {
    setDisplayFull(true);
    setExpanded(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setExpanded(false);
      setTimeout(() => setDisplayFull(false), 600);
    }, 7000);
  };

  useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

  // ================= Scroll animations =================
  useEffect(() => {
    const scrollable = infoRef.current;
    if (!scrollable) return;

    const panels = scrollable.querySelectorAll(
      ".candidate-testimonial-panel, .candidate-vision-panel, .candidate-policy-panel, .candidate-impact-panel, .candidate-about-panel, .candidate-achievement-panel"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("panel-visible");
        });
      },
      { root: scrollable, threshold: 0.2 }
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, [showPreloader]);

  // ================= Confetti at bottom =================
  useEffect(() => {
    const scrollable = infoRef.current;
    if (!scrollable) return;

    let buttonShown = false;

    const handleScroll = () => {
      if (
        !buttonShown &&
        scrollable.scrollTop + scrollable.clientHeight >= scrollable.scrollHeight - 10
      ) {
        setShowVoteButton(true);
        buttonShown = true;
        confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 } });
      }
    };

    scrollable.addEventListener("scroll", handleScroll);
    return () => scrollable.removeEventListener("scroll", handleScroll);
  }, [showPreloader]);

  // ================= Impact cards stagger animation =================
  useEffect(() => {
    const impact = impactRef.current;
    if (!impact) return;

    const impactCards = impact.querySelectorAll(".impact-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            impactCards.forEach((card, index) => {
              card.style.transitionDelay = `${index * 0.3}s`;
              card.classList.add("show");
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { root: infoRef.current, threshold: 0.3 }
    );

    observer.observe(impact);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setMenuOpen(false);
  };

  return (
    <>
      <>
        {showPreloader && (
          <div className="preloader-container">
            {[
              "Welcome",
              "To",
              "Shivani",
              "Sohoni's",
              "Campaign",
              "For",
              "FSU",
              "President",
              "Your",
              "Voice",
              "Matters",
            ].map((word, index) => {
              const isGold = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`preloader-block ${isGold ? "gold-block" : "navy-block"} animate`}
                  style={{
                    animationDelay: `${index * 0.3}s`,
                  }}
                >
                  <span className="preloader-word">{word}</span>
                </div>
              );
            })}
          </div>
        )}
      </>

      {!showPreloader && (
        <div className="campaign-page">
          {/* Navbar */}
          <div ref={navbarRef} className="page-navbar">
            <div
              className={`title-name ${expanded ? "expanded" : ""}`}
              onMouseEnter={handleExpand}
              onClick={handleExpand}
            >
              <span>{displayFull ? "Shivani Sohoni" : "SS"}</span>
            </div>
            <button className="option-button-link" onClick={() => setMenuOpen(true)}>
              ?
            </button>
          </div>

          {/* Menu Overlay */}
          {menuOpen && (
            <div className="modal-overlay" onClick={() => setMenuOpen(false)}>
              <div className="modal-menu" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Navigate</h3>
                <button onClick={() => scrollToSection(testimonialRef)}>Testimonial</button>
                <button onClick={() => scrollToSection(visionRef)}>Vision & Mission</button>
                <button onClick={() => scrollToSection(policyRef)}>Key Policies</button>
                <button onClick={() => scrollToSection(impactRef)}>Community Impact</button>
                <button onClick={() => scrollToSection(aboutRef)}>About</button>
                <button onClick={() => scrollToSection(achievementRef)}>Achievements</button>
                <button
                  onClick={() => window.open("https://github.com/Meet2210Naik", "_blank")}
                >
                  Credits
                </button>
              </div>
            </div>
          )}

          {/* Scrollable content */}
          <div ref={infoRef} className="info-page">
            {/* Intro */}
            <div className="intro-panel">
              <div className="candidate-title">Your FSU Presidential Candidate</div>
              <div className="candidate-name">Shivani Sohoni</div>
            </div>

            <img className="candidate-photo" src={candidatePhoto} alt="Candidate" />

            <div className="candidate-quote">
              <div className="candidate-quote-text">
                "It’s Time for a Change! I’m here to be your<br /> advocate
                and protect your education."
              </div>
              <div className="candidate-quote-name">— Shivani Sohoni</div>
            </div>

            {/* Testimonial */}
            <div ref={testimonialRef} className="candidate-testimonial-panel panel-visible">
              <h2 className="testimonial-title">Why Shivani?</h2>
              <ul className="testimonial-list">
                <li>✔️Transparent Leadership✔️</li>
                <li>✔️Enhanced Student Support✔️</li>
                <li>✔️A Vibrant Campus Life for Everyone✔️</li>
              </ul>
              <p className="testimonial-info">
                Meet Shivani at the Main Campus campaign booth throughout the week.
              </p>
              <p className="testimonial-vote">
                <strong>VOTE MARCH 1–3!</strong> Results out March 4.
              </p>
            </div>

            {/* Vision & Mission */}
            <div ref={visionRef} className="candidate-vision-panel">
              <h2>Vision & Mission</h2>
              <ul className="candidate-vision-panel-modal">
                {[
                  "Protect Your Education",
                  "Affordability & Accessibility",
                  "Equity & Inclusion",
                  "Campus Life",
                  "Student Voice",
                  "Academic Quality",
                  "Safety & Visibility",
                ].map((title, index) => (
                  <li key={index}>
                    <div
                      className={`vision-item ${activeVision === index ? "active" : ""}`}
                      onClick={() =>
                        setActiveVision(activeVision === index ? null : index)
                      }
                    >
                      <h3>{title}</h3>
                      <p className="vision-content">
                        Shivani’s plan ensures {title.toLowerCase()} with realistic, fully-funded initiatives that impact every student.
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Policies */}
            <div ref={policyRef} className="candidate-policy-panel">
              <h2>Key Policies</h2>
              <div className="policy-grid">
                <div className="policy-card">📚 Transition Support for Program Cuts</div>
                <div className="policy-card">🍲 Pay-What-You-Can Meals & Health Coverage</div>
                <div className="policy-card">🌎 Equity Across All Campuses</div>
                <div className="policy-card">🔍 Transparency & Report Cards</div>
              </div>
            </div>

            {/* Impact */}
            <div ref={impactRef} className="candidate-impact-panel">
              <h2>Community Impact</h2>
              <p className="impact-subtitle">
                Actions that protect and empower students today.
              </p>
              <div className="impact-stats">
                <div className="impact-card">
                  <h3>29</h3>
                  <p>Promises Costing $0</p>
                </div>
                <div className="impact-card">
                  <h3>44</h3>
                  <p>Total Promises Advocated</p>
                </div>
                <div className="impact-card">
                  <h3>400</h3>
                  <p>Staff Supported</p>
                </div>
                <div className="impact-card">
                  <h3>40</h3>
                  <p>Programs Protected</p>
                </div>
              </div>
            </div>

          <div className="about-modal">
      <div
        className={`about-card ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Front Side */}
        <div className="about-card-front">
          <h2>About</h2>
          <img src={aboutpic} alt="Shivani" className="profile-image" />
          <p>
            Hello! I am Shivani, passionate about technology and web
            development. I love connecting with like-minded people and sharing
            ideas.
          </p>
          <div className="flip-hint">Click card to see socials</div>
        </div>

        {/* Back Side */}
        <div className="about-card-back">
          <h2>Socials</h2>
          <div className="social-buttons">
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.linkedin.com/in/shivani-s-0b54a3224?utm_source=share_via&utm_content=profile&utm_medium=member_android", "_blank");
              }}
            >
              LinkedIn
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://www.instagram.com/shivanaaayyy?igsh=dzBtamIzcnV5YWVp", "_blank");
              }}
            >
              Instagram
            </button>
            <button
      onClick={(e) => {
        e.stopPropagation();
        window.open(
          "https://ci46sbrcplrdc.ok.kimi.link/?sharetype=link", // <-- replace with your manifesto link
          "_blank"
        );
      }}
    >
      Manifesto
    </button>
          </div>
          <div className="flip-hint">Click card to go back</div>
        </div>
      </div>
    </div>

            {/* Achievements */}
            <div ref={achievementRef} className="candidate-achievement-panel">
              <h2>Achievements</h2>
              <ul className="candidate-achievement-panel-modal">
                <li className="achievement-card">
                  <img src={present} alt="Program Support" className="achievement-image" />
                  <h3>Program & Staff Protection</h3>
                  <p>Fought to secure transitions and advocate for students despite college cuts.</p>
                </li>
                <li className="achievement-card">
                  <img src={present1} alt="Equity Initiatives" className="achievement-image" />
                  <h3>Equity & Inclusion</h3>
                  <p>Ensured fair access and visibility for Indigenous, LGBTQ+, and regional students.</p>
                </li>
                <li className="achievement-card">
                  <img src={present2} alt="Student Services" className="achievement-image" />
                  <h3>Enhanced Student Support</h3>
                  <p>Launched PWYC meals, improved health coverage, and streamlined student resources.</p>
                </li>
              </ul>
            </div>

            <h3 style={{ textAlign: "center", marginTop: "40px" }}>
              🎉 Thank You For Joining Us!
            </h3>

            {/* Vote button */}
            <div className="vote-button-last">
              <a
                href="https://www.fsu.ca/elections"
                target="_blank"
                rel="noopener noreferrer"
                className={`vote-confetti-button ${showVoteButton ? "show" : ""}`}
              >
                VOTE NOW
              </a>
            </div>
          </div>

          {/* Footer */}
          <div ref={footerRef} className="footer">
            <div className="message" style={{ display: "flex", flexDirection: "column" }}>
              <span>Your Fees. Your Services. Your Voice.</span>
              <span style={{ alignSelf: "flex-end" }}>— Vote Shivani Sohoni</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;