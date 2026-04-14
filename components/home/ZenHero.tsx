"use client";

import { useEffect, useRef } from "react";
import { Button } from "../ui/Button";
import { heroStats, navLinks } from "../../lib/constants";

type Ripple = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  blur: number;
  spread: number;
  hue: "ink" | "vermillion" | "green";
};

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
          alpha: ripple.alpha * 0.976,
          blur: ripple.blur + 0.18,
        }))
        .filter((ripple) => ripple.alpha > 0.02);

      ripplesRef.current.forEach((ripple) => {
        const strokeColor =
          ripple.hue === "vermillion"
            ? `rgba(192, 57, 43, ${ripple.alpha * 0.38})`
            : ripple.hue === "green"
              ? `rgba(85, 107, 47, ${ripple.alpha * 0.28})`
              : `rgba(26, 26, 26, ${ripple.alpha * 0.32})`;

        context.save();
        context.filter = `blur(${ripple.blur}px)`;
        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        context.fillStyle =
          ripple.hue === "vermillion"
            ? `rgba(192, 57, 43, ${ripple.alpha * 0.08})`
            : ripple.hue === "green"
              ? `rgba(85, 107, 47, ${ripple.alpha * 0.06})`
              : `rgba(26, 26, 26, ${ripple.alpha * 0.12})`;
        context.fill();
        context.restore();

        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius * 0.86, 0, Math.PI * 2);
        context.strokeStyle = strokeColor;
        context.lineWidth = ripple.hue === "ink" ? 1.15 : 0.9;
        context.stroke();

        context.beginPath();
        context.arc(ripple.x, ripple.y, ripple.radius * 0.28, 0, Math.PI * 2);
        context.fillStyle = `rgba(26, 26, 26, ${ripple.alpha * 0.14})`;
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
          radius: 10,
          alpha: 1,
          blur: 0.2,
          spread: 1.8,
          hue: "ink",
        },
        {
          x,
          y,
          radius: 24,
          alpha: 0.72,
          blur: 0.8,
          spread: 1.35,
          hue: "vermillion",
        },
        {
          x,
          y,
          radius: 38,
          alpha: 0.5,
          blur: 1.2,
          spread: 1.15,
          hue: "green",
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
            <span className="brand-mark zen-seal">智</span>
            <span className="brand-name">智慧学堂</span>
          </a>

          <nav className="nav-links zen-nav-links" aria-label="主导航">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Button href="#booking">预约体验</Button>
          </nav>
        </div>
      </header>

      <section className="hero zen-hero" id="home">
        <canvas ref={canvasRef} aria-hidden="true" className="ink-canvas" />
        <div className="paper-texture" />

        <nav className="vertical-nav" aria-label="意境导航">
          <a href="#about">意境</a>
          <a href="#community">对话</a>
          <a href="#booking">体验</a>
        </nav>

        <div className="container zen-hero-layout">
          <div className="hero-copy mist-enter">
            <span className="eyebrow zen-eyebrow">东方内观 · 身心疗愈 · 禅意生长</span>
            <h1 className="zen-title">
              大象无形
              <span>让成长回到安静、清明与有呼吸感的秩序里。</span>
            </h1>
            <p className="lead zen-lead">
              以更克制的方式呈现课程、冥想、社群与陪伴。不是把用户推进神秘叙事，
              而是让他们在留白与缓慢节奏里，自然靠近自己。
            </p>

            <div className="hero-actions zen-actions">
              <Button href="#booking">注册并预约体验课</Button>
              <Button href="#about" variant="secondary">
                进入意境
              </Button>
            </div>

            <div className="hero-meta zen-meta">
              <span>留白式首页结构</span>
              <span>会员与社区陪伴</span>
              <span>AI 助理与冥想陪练</span>
            </div>
          </div>

          <div className="enso-stage mist-enter">
            <div className="enso-wrapper">
              <svg className="enso-svg" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                  <linearGradient id="ensoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(26,26,26,0.88)" />
                    <stop offset="72%" stopColor="rgba(192,57,43,0.72)" />
                    <stop offset="100%" stopColor="rgba(85,107,47,0.5)" />
                  </linearGradient>
                </defs>
                <path
                  className="enso-path"
                  d="M 50,50 m -40,0 a 40,40 0 1,0 80,0 a 40,40 0 1,0 -80,0"
                  fill="none"
                  stroke="url(#ensoGradient)"
                  strokeWidth="0.55"
                  strokeLinecap="round"
                />
              </svg>
              <div className="enso-core">
                <p>留白</p>
                <p>呼吸</p>
                <p>归心</p>
              </div>
            </div>

            <div className="hero-visual-quote">
              <p>“慢一点，让感受先出现，让答案后出现。”</p>
            </div>
          </div>
        </div>

        <div className="container metrics zen-metrics">
          <div className="metrics-grid">
            {heroStats.map((item) => (
              <div className="metric zen-metric" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
