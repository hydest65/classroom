import { Button } from "../ui/Button";
import { aiConversation, aiFeatures } from "../../lib/constants";

export function AiAssistant() {
  return (
    <section id="ai">
      <div className="container ai-grid">
        <div className="card">
          <span className="eyebrow">AI 助理</span>
          <h2>你的专属成长陪伴 AI</h2>
          <p className="lead">
            AI 助理会根据你的学习阶段与关注主题，帮你更快找到适合自己的练习方式，让成长不再迷路。
          </p>

          <ul className="feature-list">
            {aiFeatures.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero-actions">
            <Button href="#booking">先体验课程</Button>
            <Button href="#ai" variant="ghost">
              体验 AI 对话
            </Button>
          </div>
        </div>

        <div className="ai-chat">
          {aiConversation.map((item, index) => (
            <div className={`chat-bubble ${item.role}`} key={`${item.role}-${index}`}>
              {item.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
