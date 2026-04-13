import { SectionTitle } from "../ui/SectionTitle";
import { faqs } from "../../lib/constants";

export function Faq() {
  return (
    <section>
      <div className="container">
        <SectionTitle
          title="常见问题"
          description="把用户最容易卡住的疑问提前说清楚，首页的信任感和转化率都会更稳。"
        />

        <div className="faq-grid">
          {faqs.map((item) => (
            <article className="faq-item" key={item.question}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
