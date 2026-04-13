import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import { serviceCards } from "../../lib/constants";

export function Services() {
  return (
    <section id="courses">
      <div className="container">
        <SectionTitle
          title="围绕身心稳定、觉察练习与长期成长建立课程体系"
          description="首页不需要把所有内容一次塞给用户，但要让他们知道平台是完整的，不是只靠一句“回来看见自己”的口号。"
        />

        <div className="cards-4">
          {serviceCards.map((item) => (
            <Card key={item.title}>
              <div className="icon-badge">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
