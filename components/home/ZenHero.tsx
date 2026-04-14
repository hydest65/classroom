"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/Button";

type Ripple = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  blur: number;
  spread: number;
  hue: "core" | "violet" | "gold";
};

const heroNav = [
  { href: "#about", label: "Essence" },
  { href: "#community", label: "Dialogue" },
];

const auraNodes = [
  "node-a",
  "node-b",
  "node-c",
  "node-d",
  "node-e",
  "node-f",
  "node-g",
  "node-h",
];

const dustNodes = ["dust-a", "dust-b", "dust-c", "dust-d", "dust-e", "dust-f"];

export function ZenHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ripplesRef = useRef<Ripple[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    let animationFrame = 0;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      context.clearRect(0, 0, width, height);

      ripplesRef.current = ripplesRef.current
        .map((ripple) => ({
          ...ripple,
          radius: ripple.radius + ripple.spread,
          alpha: ripple.alpha * 0.978,
          blur: ripple.blur + 0.22,
        }))
        .filter((ripple) => ripple.alpha > 0.025);

      ripplesRef.current.forEach((ripple) => {
        const fillColor =
          ripple.hue === "violet"
            ? `rgba(167, 136, 255, ${ripple.alpha * 0.18})`
            : ripple.hue === "gold"
              ? `rgba(255, 224, 181, ${ripple.alpha * 0.14})`
              : `rgba(169, 225, 255, ${ripple.alpha * 0.2})`;
        const strokeColor =
          ripple.hue === "violet"
            ? `rgba(193, 173, 255, ${ripple.alpha * 0.48})`
            : ripple.hue === "gold"
              ? `rgba(255, 240, 210, ${ripple.alpha * 0.32})`
              : `rgba(196, 242, 255, ${ripple.alpha * 0.44})`;

        context.save();
        context.filter = `blur(${ripple.blur}px)`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        context.fillStyle = fillColor;
        context.fill();
        context.restore();

        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius * 0.84, 0, Math.PI * 2);
        context.strokeStyle = strokeColor;
        context.lineWidth = ripple.hue === "core" ? 1.15 : 0.9;
        context.stroke();

        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius * 0.3, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 255, 255, ${ripple.alpha * 0.12})`;
        context.fill();
      });

      animationFrame = window.requestAnimationFrame(draw);
    };

    const handlePointerDown = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      ripplesRef.current.push(
        {
          x,
          y,
          radius: 14,
          alpha: 1,
          blur: 0.4,
          spread: 2.2,
          hue: "core",
        },
        {
          x,
          y,
          radius: 28,
          alpha: 0.8,
          blur: 1.1,
          spread: 1.6,
          hue: "violet",
        },
        {
          x,
          y,
          radius: 46,
          alpha: 0.58,
          blur: 1.6,
          spread: 1.28,
          hue: "gold",
        }
      );
    };

    resizeCanvas();
    draw();

    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <>
      <header className="site-header zen-header">
        <div className="container nav zen-nav">
          <a className="brand zen-brand" href="#home">
            <span className="brand-mark zen-seal">✦</span>
            <span className="brand-name">Wisdom AI</span>
          </a>

          <nav className="nav-links zen-nav-links" aria-label="Main navigation">
            <div className="zen-nav-pill">
              {heroNav.map((item) => (
                <a key={item.href} href={item.href}>
                  {item.label}
                </a>
              ))}
              <Button href="#booking">Enter</Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero zen-hero" id="home">
        <canvas ref={canvasRef} aria-hidden="true" className="ink-canvas" />
        <div className="hero-cosmic-backdrop" />
        <div className="hero-vignette" />
        <div className="hero-frame-glow" />

        <div className="hero-orbital-field" aria-hidden="true">
          {auraNodes.map((name) => (
            <span key={name} className={`aura-node ${name}`} />
          ))}
          {dustNodes.map((name) => (
            <span key={name} className={`dust-node ${name}`} />
          ))}
        </div>

        <div className="container zen-hero-shell">
          <div className="zen-hero-panel mist-enter">
            <div className="zen-hero-brandline">
              <span className="hero-logo-dot">*</span>
              <span>Wisdom AI</span>
            </div>

            <div className="zen-hero-center">
              <div className="energy-orb" aria-hidden="true">
                <div className="orb-glow orb-glow-a" />
                <div className="orb-glow orb-glow-b" />
                <div className="orb-core">
                  <div className="orb-ring orb-ring-a" />
                  <div className="orb-ring orb-ring-b" />
                  <div className="orb-ring orb-ring-c" />
                  <div className="orb-center-light" />
                </div>
                <div className="orb-dust orb-dust-a" />
                <div className="orb-dust orb-dust-b" />
              </div>

              <div className="hero-copy zen-copy">
                <h1 className="zen-title">Wisdom Beyond Logic</h1>

                <div className="hero-actions zen-actions">
                  <Button href="#booking">Enter</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
