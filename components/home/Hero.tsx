import { Button } from "../ui/Button";
import { heroStats, navLinks } from "../../lib/constants";

export function Hero() {
  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <a className="brand" href="#home">
            <span className="brand-mark">智</span>
            <span>智慧学堂</span>
          </a>

          <nav className="nav-links" aria-label="主导航">
            {navLinks.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <Button href="#booking">立即预约</Button>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">东方内观 · 身心疗愈 · 觉察成长</span>
            <h1>回到内观，找到属于你的智慧与秩序</h1>
            <p className="lead">
              通过课程、练习与陪伴，帮助你回到内在秩序，建立更稳定的觉察力、情绪状态与生活节奏。
            </p>

            <div className="hero-actions">
              <Button href="#booking">注册并预约体验课</Button>
              <Button href="#about" variant="secondary">
                了解智慧学堂
              </Button>
            </div>

            <div className="hero-meta">
              <span>公开体验课</span>
              <span>会员成长体系</span>
              <span>社群打卡 + AI 陪伴</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-note">
              <div>安静、自然、清明，不用一上来就把你推进夸张的灵性叙事。</div>
              <div>课程 · 练习 · 社群 · 会员 · AI 助理</div>
              <div>从一堂体验课开始，逐步进入长期成长闭环。</div>
            </div>

            <div className="side-kpi">
              <strong>6+</strong>
              <p>核心成长模块</p>
            </div>

            <div className="energy-ring">
              <div className="energy-ring-inner">
                <span>INNER</span>
                <span>WISDOM</span>
                <span>RETURN</span>
              </div>
            </div>

            <div className="glass-card">
              <strong>更像官网，而不是概念页</strong>
              <p>品牌表达、课程结构、会员体系、预约入口与转化路径都在这里合上了。</p>
            </div>
          </div>
        </div>

        <div className="container metrics">
          <div className="metrics-grid">
            {heroStats.map((item) => (
              <div className="metric" key={item.label}>
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
