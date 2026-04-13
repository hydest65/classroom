import { NextResponse } from "next/server";

type BookingPayload = {
  name: string;
  phone: string;
  wechat: string;
  city: string;
  theme: string;
  message: string;
};

function isValidPayload(payload: Partial<BookingPayload>) {
  return (
    typeof payload.name === "string" &&
    payload.name.trim().length > 0 &&
    typeof payload.phone === "string" &&
    /^1\d{10}$/.test(payload.phone.trim()) &&
    typeof payload.city === "string" &&
    payload.city.trim().length > 0 &&
    typeof payload.theme === "string" &&
    payload.theme.trim().length > 0 &&
    typeof payload.message === "string" &&
    payload.message.trim().length > 0 &&
    typeof payload.wechat === "string"
  );
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<BookingPayload>;

  if (!isValidPayload(payload)) {
    return NextResponse.json(
      {
        ok: false,
        message: "预约信息不完整，请检查后重试。",
      },
      { status: 400 }
    );
  }

  const bookingId = `ZH-${Date.now().toString().slice(-8)}`;

  return NextResponse.json({
    ok: true,
    bookingId,
    message: "预约申请已接收，等待注册确认。",
    nextStep: "register",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    slots: [
      {
        id: "slot-1",
        date: "周三 19:30",
        mode: "线上体验课",
        mentor: "林岚老师",
      },
      {
        id: "slot-2",
        date: "周六 10:00",
        mode: "线下小班体验",
        mentor: "安之导师",
      },
      {
        id: "slot-3",
        date: "周日 20:00",
        mode: "线上主题体验",
        mentor: "清和老师",
      },
    ],
    advisors: [
      {
        id: "advisor-1",
        name: "课程顾问 小宁",
        style: "温和梳理需求，帮助安排首次体验路径",
      },
      {
        id: "advisor-2",
        name: "成长顾问 若溪",
        style: "适合希望先了解课程与会员差异的用户",
      },
    ],
  });
}
