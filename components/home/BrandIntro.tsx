import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import { brandIntroCards } from "../../lib/constants";

export function BrandIntro() {
  return (
    <section id="about">
      <div className="container">
        <SectionTitle
          title="不只是讲理念，而是把成长真正落到网站路径里"
          description="智慧学堂以东方内观智慧为根基，结合身心疗愈、冥想静修与成长课程，帮助人重新建立与自己、情绪、关系和生活的连接。"
        />

        <div className="cards-3">
          {brandIntroCards.map((item) => (
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
