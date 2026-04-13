import { Card } from "../ui/Card";
import { SectionTitle } from "../ui/SectionTitle";
import { courseEntries } from "../../lib/constants";

export function CourseEntry() {
  return (
    <section>
      <div className="container">
        <SectionTitle
          title="课程与活动入口清晰展开，让用户知道下一步去哪里"
          description="官网不只介绍品牌，也要帮用户快速判断自己适合先体验、先学习，还是先进入更深的活动场景。"
        />

        <div className="cards-3">
          {courseEntries.map((item) => (
            <Card key={item.title} className="entry-card">
              <span className="entry-meta">{item.meta}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
