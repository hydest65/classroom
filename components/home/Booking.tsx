"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  BOOKING_DRAFT_KEY,
  BOOKING_FLOW_KEY,
  BOOKING_RESULT_KEY,
} from "../../lib/storage";
import { Button } from "../ui/Button";

type FormValues = {
  name: string;
  phone: string;
  wechat: string;
  city: string;
  theme: string;
  message: string;
  agreement: boolean;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;
type Step = "form" | "register" | "confirm" | "success";
type SubmitResult = {
  bookingId: string;
  phone: string;
  theme: string;
};
type Slot = {
  id: string;
  date: string;
  mode: string;
  mentor: string;
};
type Advisor = {
  id: string;
  name: string;
  style: string;
};
type FlowState = {
  step: Step;
  registerCode: string;
  selectedSlotId: string;
  selectedAdvisorId: string;
};

const initialValues: FormValues = {
  name: "",
  phone: "",
  wechat: "",
  city: "",
  theme: "",
  message: "",
  agreement: true,
};

export function Booking() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [step, setStep] = useState<Step>("form");
  const [registerCode, setRegisterCode] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState("");
  const [selectedAdvisorId, setSelectedAdvisorId] = useState("");

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(BOOKING_DRAFT_KEY);
    const savedFlow = window.localStorage.getItem(BOOKING_FLOW_KEY);
    const savedResult = window.localStorage.getItem(BOOKING_RESULT_KEY);

    if (savedDraft) {
      try {
        setValues((current) => ({
          ...current,
          ...(JSON.parse(savedDraft) as Partial<FormValues>),
        }));
      } catch {
        window.localStorage.removeItem(BOOKING_DRAFT_KEY);
      }
    }

    if (savedResult) {
      try {
        setSubmitResult(JSON.parse(savedResult) as SubmitResult);
      } catch {
        window.localStorage.removeItem(BOOKING_RESULT_KEY);
      }
    }

    if (savedFlow) {
      try {
        const parsed = JSON.parse(savedFlow) as Partial<FlowState>;
        if (parsed.step) {
          setStep(parsed.step);
        }
        if (typeof parsed.registerCode === "string") {
          setRegisterCode(parsed.registerCode);
        }
        if (typeof parsed.selectedSlotId === "string") {
          setSelectedSlotId(parsed.selectedSlotId);
        }
        if (typeof parsed.selectedAdvisorId === "string") {
          setSelectedAdvisorId(parsed.selectedAdvisorId);
        }
      } catch {
        window.localStorage.removeItem(BOOKING_FLOW_KEY);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(BOOKING_DRAFT_KEY, JSON.stringify(values));
  }, [values]);

  useEffect(() => {
    const nextFlow: FlowState = {
      step,
      registerCode,
      selectedSlotId,
      selectedAdvisorId,
    };

    window.localStorage.setItem(BOOKING_FLOW_KEY, JSON.stringify(nextFlow));
  }, [registerCode, selectedAdvisorId, selectedSlotId, step]);

  useEffect(() => {
    async function loadMeta() {
      try {
        const response = await fetch("/api/booking");
        const result = (await response.json()) as {
          ok: boolean;
          slots?: Slot[];
          advisors?: Advisor[];
        };

        if (response.ok && result.ok) {
          const nextSlots = result.slots ?? [];
          const nextAdvisors = result.advisors ?? [];
          setSlots(nextSlots);
          setAdvisors(nextAdvisors);
          setSelectedSlotId((current) => current || nextSlots[0]?.id || "");
          setSelectedAdvisorId((current) => current || nextAdvisors[0]?.id || "");
        }
      } catch {
        setSlots([]);
        setAdvisors([]);
      }
    }

    loadMeta();
  }, []);

  function updateValue<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setSubmitError("");
  }

  function validateForm() {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "请输入姓名";
    }

    if (!/^1\d{10}$/.test(values.phone.trim())) {
      nextErrors.phone = "请输入正确的 11 位手机号";
    }

    if (!values.city.trim()) {
      nextErrors.city = "请输入所在城市";
    }

    if (!values.theme) {
      nextErrors.theme = "请选择关注方向";
    }

    if (!values.message.trim()) {
      nextErrors.message = "请简单描述你希望改善的状态";
    }

    if (!values.agreement) {
      nextErrors.agreement = "请先勾选协议";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validateForm()) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    setSubmitError("");

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          wechat: values.wechat,
          city: values.city,
          theme: values.theme,
          message: values.message,
        }),
      });

      const result = (await response.json()) as {
        ok: boolean;
        bookingId?: string;
        message?: string;
      };

      if (!response.ok || !result.ok || !result.bookingId) {
        setSubmitError(result.message ?? "提交失败，请稍后再试。");
        setStatus("idle");
        return;
      }

      const nextResult = {
        bookingId: result.bookingId,
        phone: values.phone,
        theme: values.theme,
      };

      setSubmitResult(nextResult);
      window.localStorage.setItem(BOOKING_RESULT_KEY, JSON.stringify(nextResult));
      setStatus("idle");
      setStep("register");
    } catch {
      setSubmitError("网络异常，当前无法提交预约。");
      setStatus("idle");
    }
  }

  async function handleRegisterConfirm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!/^\d{6}$/.test(registerCode.trim())) {
      setRegisterError("请输入 6 位验证码");
      return;
    }

    setRegisterError("");
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("idle");
    setStep("confirm");
  }

  function handleFinalConfirm() {
    setStep("success");
  }

  return (
    <section id="booking" className="booking">
      <div className="container booking-grid">
        <div className="panel">
          <span className="eyebrow">体验课预约</span>
          <h2>先注册，再预约一堂体验课，慢慢进入你的成长节奏</h2>
          <p className="lead">
            首页的核心目标是帮助用户完成注册并预约体验课。我们把入口做得清晰、轻量，也为后续账号、会员与课程系统预留了扩展空间。
          </p>

          <ul className="feature-list">
            <li>支持注册账号后预约体验课场次</li>
            <li>后续可接支付、会员、活动与课程报名逻辑</li>
            <li>可对接企业微信客服、短信验证码与 CRM</li>
          </ul>
        </div>

        <div className="form-panel">
          <div className="booking-steps" aria-label="预约步骤">
            <span className={step === "form" ? "step-chip active" : "step-chip"}>1. 填写信息</span>
            <span className={step === "register" ? "step-chip active" : "step-chip"}>
              2. 注册确认
            </span>
            <span className={step === "confirm" ? "step-chip active" : "step-chip"}>
              3. 预约确认
            </span>
            <span className={step === "success" ? "step-chip active" : "step-chip"}>
              4. 预约完成
            </span>
          </div>

          {step === "form" ? (
            <form onSubmit={handleSubmit}>
              <h3>立即预约体验课</h3>
              <p className="form-hint">先填写你的基本信息，下一步将模拟进入注册确认流程。</p>

              <div className="form-grid">
                <div className="field">
                  <label htmlFor="name">姓名</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="请输入你的姓名"
                    value={values.name}
                    onChange={(event) => updateValue("name", event.target.value)}
                  />
                  {errors.name ? <span className="field-error">{errors.name}</span> : null}
                </div>
                <div className="field">
                  <label htmlFor="phone">手机号</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="请输入手机号"
                    value={values.phone}
                    onChange={(event) => updateValue("phone", event.target.value)}
                  />
                  {errors.phone ? <span className="field-error">{errors.phone}</span> : null}
                </div>
                <div className="field">
                  <label htmlFor="wechat">微信号</label>
                  <input
                    id="wechat"
                    name="wechat"
                    type="text"
                    placeholder="便于后续联系"
                    value={values.wechat}
                    onChange={(event) => updateValue("wechat", event.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="city">所在城市</label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="例如：上海 / 北京"
                    value={values.city}
                    onChange={(event) => updateValue("city", event.target.value)}
                  />
                  {errors.city ? <span className="field-error">{errors.city}</span> : null}
                </div>
                <div className="field full">
                  <label htmlFor="theme">当前更关注的方向</label>
                  <select
                    id="theme"
                    name="theme"
                    value={values.theme}
                    onChange={(event) => updateValue("theme", event.target.value)}
                  >
                    <option value="" disabled>
                      请选择
                    </option>
                    <option>身心疗愈</option>
                    <option>冥想 / 静修</option>
                    <option>关系与情绪</option>
                    <option>能量与成长课程</option>
                  </select>
                  {errors.theme ? <span className="field-error">{errors.theme}</span> : null}
                </div>
                <div className="field full">
                  <label htmlFor="message">你希望改善的状态</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="例如：最近容易焦虑、睡眠不稳，或想建立更稳定的练习习惯"
                    value={values.message}
                    onChange={(event) => updateValue("message", event.target.value)}
                  />
                  {errors.message ? <span className="field-error">{errors.message}</span> : null}
                </div>
              </div>

              <label className="checkbox-row" htmlFor="agreement">
                <input
                  checked={values.agreement}
                  id="agreement"
                  type="checkbox"
                  onChange={(event) => updateValue("agreement", event.target.checked)}
                />
                <span>我同意接收预约通知，并已阅读用户协议与隐私政策。</span>
              </label>
              {errors.agreement ? <p className="form-error">{errors.agreement}</p> : null}

              <div className="form-actions">
                <Button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "提交中..." : "下一步，完成注册确认"}
                </Button>
                <Button href="#" variant="secondary">
                  先咨询顾问
                </Button>
              </div>

              {submitError ? <p className="form-error">{submitError}</p> : null}
            </form>
          ) : null}

          {step === "register" ? (
            <form onSubmit={handleRegisterConfirm}>
              <h3>注册确认</h3>
              <p className="form-hint">
                我们已向 <strong>{values.phone}</strong> 发送验证码。完成注册确认后，将保留你的预约申请并进入确认页。
              </p>

              <div className="register-summary">
                <div>
                  <span className="summary-label">预约人</span>
                  <strong>{values.name}</strong>
                </div>
                <div>
                  <span className="summary-label">关注方向</span>
                  <strong>{values.theme}</strong>
                </div>
                <div>
                  <span className="summary-label">预约编号</span>
                  <strong>{submitResult?.bookingId ?? "等待生成"}</strong>
                </div>
              </div>

              <div className="field">
                <label htmlFor="register-code">短信验证码</label>
                <input
                  id="register-code"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="请输入 6 位验证码"
                  value={registerCode}
                  onChange={(event) => {
                    setRegisterCode(event.target.value.replace(/\D/g, "").slice(0, 6));
                    setRegisterError("");
                  }}
                />
                {registerError ? <span className="field-error">{registerError}</span> : null}
              </div>

              <div className="form-actions">
                <Button type="submit" disabled={status === "submitting"}>
                  {status === "submitting" ? "确认中..." : "完成注册并确认预约"}
                </Button>
                <button
                  className="text-button"
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setRegisterError("");
                    setRegisterCode("");
                  }}
                >
                  返回修改信息
                </button>
              </div>
            </form>
          ) : null}

          {step === "confirm" ? (
            <div>
              <h3>确认体验课场次</h3>
              <p className="form-hint">
                账号已确认完成。请选择你希望参加的体验课场次，并选择一位更适合你的跟进顾问。
              </p>

              <div className="confirm-grid">
                <div className="confirm-block">
                  <h4>选择体验课场次</h4>
                  <div className="option-list">
                    {slots.map((slot) => (
                      <label
                        className={selectedSlotId === slot.id ? "option-card active" : "option-card"}
                        htmlFor={slot.id}
                        key={slot.id}
                      >
                        <input
                          checked={selectedSlotId === slot.id}
                          id={slot.id}
                          name="booking-slot"
                          type="radio"
                          onChange={() => setSelectedSlotId(slot.id)}
                        />
                        <div>
                          <strong>{slot.date}</strong>
                          <span>{slot.mode}</span>
                          <span>{slot.mentor}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="confirm-block">
                  <h4>选择顾问跟进</h4>
                  <div className="option-list">
                    {advisors.map((advisor) => (
                      <label
                        className={
                          selectedAdvisorId === advisor.id ? "option-card active" : "option-card"
                        }
                        htmlFor={advisor.id}
                        key={advisor.id}
                      >
                        <input
                          checked={selectedAdvisorId === advisor.id}
                          id={advisor.id}
                          name="advisor"
                          type="radio"
                          onChange={() => setSelectedAdvisorId(advisor.id)}
                        />
                        <div>
                          <strong>{advisor.name}</strong>
                          <span>{advisor.style}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <Button
                  type="button"
                  disabled={!selectedSlotId || !selectedAdvisorId}
                  onClick={handleFinalConfirm}
                >
                  确认场次与顾问
                </Button>
                <button className="text-button" type="button" onClick={() => setStep("register")}>
                  返回上一步
                </button>
              </div>
            </div>
          ) : null}

          {step === "success" ? (
            <div className="form-success-panel" role="status">
              <span className="success-badge">预约完成</span>
              <h3>你的体验课预约已经提交</h3>
              <p className="form-hint">
                当前流程已模拟完成“填写信息 → 注册确认 → 预约成功”。正式接入后，这里可以继续衔接场次选择、顾问联系或会员引导。
              </p>

              <div className="register-summary">
                <div>
                  <span className="summary-label">预约编号</span>
                  <strong>{submitResult?.bookingId ?? "未生成"}</strong>
                </div>
                <div>
                  <span className="summary-label">姓名</span>
                  <strong>{values.name}</strong>
                </div>
                <div>
                  <span className="summary-label">手机号</span>
                  <strong>{values.phone}</strong>
                </div>
                <div>
                  <span className="summary-label">城市</span>
                  <strong>{values.city}</strong>
                </div>
                <div>
                  <span className="summary-label">方向</span>
                  <strong>{values.theme}</strong>
                </div>
                <div>
                  <span className="summary-label">体验课场次</span>
                  <strong>{slots.find((item) => item.id === selectedSlotId)?.date ?? "待确认"}</strong>
                </div>
                <div>
                  <span className="summary-label">跟进顾问</span>
                  <strong>
                    {advisors.find((item) => item.id === selectedAdvisorId)?.name ?? "待分配"}
                  </strong>
                </div>
              </div>

              <div className="form-actions">
                <Button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setValues(initialValues);
                    setErrors({});
                    setRegisterCode("");
                    setRegisterError("");
                    setSubmitError("");
                    setSubmitResult(null);
                    setSelectedSlotId(slots[0]?.id ?? "");
                    setSelectedAdvisorId(advisors[0]?.id ?? "");
                    window.localStorage.removeItem(BOOKING_DRAFT_KEY);
                    window.localStorage.removeItem(BOOKING_FLOW_KEY);
                    window.localStorage.removeItem(BOOKING_RESULT_KEY);
                  }}
                >
                  再提交一份预约
                </Button>
                <Button href="#courses" variant="secondary">
                  继续查看课程与活动
                </Button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
