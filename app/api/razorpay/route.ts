import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    // support both RAZORPAY_KEY_ID (server-only) and NEXT_PUBLIC_ variant
    key_id:
        process.env.RAZORPAY_KEY_ID ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "",
});

export const runtime = "nodejs";

export async function POST(req: Request) {
    const keyId =
        process.env.RAZORPAY_KEY_ID ||
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        "";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "";

    if (!keyId || !keySecret) {
        console.error("Razorpay keys missing from environment");
        return NextResponse.json(
            { error: "Payment gateway not configured." },
            { status: 500 }
        );
    }

    try {
        const body = await req.json();
        const { amount } = body;

        if (!amount || isNaN(Number(amount))) {
            return NextResponse.json(
                { error: "A valid amount is required." },
                { status: 400 }
            );
        }

        // amount must be in paise (INR smallest unit) and passed as a number
        const options = {
            amount: Math.round(Number(amount) * 100), // e.g. 499 => 49900 paise
            currency: "INR",
            receipt: `ucr_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json(order);
    } catch (error: unknown) {
        const msg =
            error instanceof Error ? error.message : JSON.stringify(error);
        console.error("Razorpay order creation failed:", msg);
        return NextResponse.json(
            { error: msg || "Order creation failed." },
            { status: 500 }
        );
    }
}
