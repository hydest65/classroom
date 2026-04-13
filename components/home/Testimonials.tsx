import { SectionTitle } from "../ui/SectionTitle";
import { testimonials } from "../../lib/constants";

export function Testimonials() {
  return (
    <section>
      <div className="container">
        <SectionTitle
          title="一些真实发生的改变"
          description="真实、温和、不过度神化的用户反馈，更能建立信任，也更像真正会发生的事情。"
        />

        <div className="testimonial-grid">
          {testimonials.map((item) => (
            <article className="testimonial" key={item.author}>
              <p>“{item.quote}”</p>
              <strong>{item.author}</strong>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
