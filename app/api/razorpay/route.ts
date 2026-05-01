import { NextResponse } from "next/server";
import Razorpay from "razorpay";

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

    // Lazily instantiate Razorpay inside the handler so it never crashes at build time
    const razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });

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
