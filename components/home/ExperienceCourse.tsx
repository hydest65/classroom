import { SectionTitle } from "../ui/SectionTitle";
import { pathSteps } from "../../lib/constants";

export function ExperienceCourse() {
  return (
    <section id="path">
      <div className="container">
        <SectionTitle
          title="一条清晰的成长路径，而不是模糊的灵性口号"
          description="来到这里，不只是被安抚，而是有方法、有节奏、有持续性的成长路线。"
        />

        <div className="timeline">
          {pathSteps.map((item) => (
            <article className="timeline-item" key={item.step}>
              <div className="num-badge">{item.step}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
