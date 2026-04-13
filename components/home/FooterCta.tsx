import { Button } from "../ui/Button";
import { footerLinks } from "../../lib/constants";

export function FooterCta() {
  return (
    <>
      <section>
        <div className="container">
          <div className="cta">
            <span className="eyebrow">开始第一步</span>
            <h2>准备好先注册并预约一堂体验课了吗？</h2>
            <p className="lead cta-lead">
              用一堂轻量、可信、不过度神秘化的体验课，帮助用户先感受品牌方式，再决定是否进入更长期的学习与会员陪伴。
            </p>
            <div className="hero-actions centered">
              <Button href="#booking">注册并预约体验课</Button>
              <Button href="#courses" variant="secondary">
                查看课程体系
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div className="footer-col">
            <div className="brand footer-brand">
              <span className="brand-mark">智</span>
              <span>智慧学堂</span>
            </div>
            <p>
              以东方内观智慧为根基的身心疗愈与成长平台，帮助用户通过课程、练习与陪伴回到内在秩序。
            </p>
          </div>

          <div className="footer-col">
            <h4>网站导航</h4>
            {footerLinks.sitemap.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>功能入口</h4>
            {footerLinks.features.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-col">
            <h4>联系与政策</h4>
            {footerLinks.policy.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="container footer-bottom">
          <div>© 2026 智慧学堂 Wisdom Academy. All rights reserved.</div>
          <div>Homepage demo for brand, membership, booking, community and AI assistant.</div>
        </div>
      </footer>
    </>
  );
}
