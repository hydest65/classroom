import { communityFeed, communityFeatures } from "../../lib/constants";

export function Community() {
  return (
    <section id="community">
      <div className="container community-showcase">
        <div className="panel">
          <span className="eyebrow">社区互动</span>
          <h2>在陪伴中练习，在分享里看见自己</h2>
          <p className="lead">
            成长不是瞬间顿悟，而是在一次次真实练习中的慢慢显现。社区让平台从“课程目录”变成“有温度的共同体”。
          </p>

          <ul className="feature-list">
            {communityFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="community-feed">
          {communityFeed.map((item) => (
            <div className="feed-item" key={item.title}>
              <strong>{item.title}</strong>
              <span className="subtle">{item.description}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
