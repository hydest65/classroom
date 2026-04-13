import { membershipBenefits, membershipTags } from "../../lib/constants";

export function Membership() {
  return (
    <section id="membership">
      <div className="container split">
        <div className="panel membership-box">
          <span className="eyebrow">会员体系</span>
          <h2>成为会员，进入持续成长的陪伴系统</h2>
          <p className="lead">
            会员不只获得内容访问权限，更进入一个长期支持你的成长系统。从学习、练习到交流与反馈，每一步都更清晰、稳定且有归属感。
          </p>

          <div className="tag-row">
            {membershipTags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="card">
          <h3>会员核心权益</h3>
          <ul className="feature-list">
            {membershipBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
