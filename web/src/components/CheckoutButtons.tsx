"use client";

import { useCallback, useEffect, useRef } from "react";

declare global {
  interface Window {
    paypal?: {
      Buttons: (options: Record<string, unknown>) => { render: (selector: string) => void };
    };
  }
}

type CheckoutButtonsProps = {
  productName: string;
  amount: number;
  /** Lemon Squeezy product/variant slug, e.g. "marbella-display-desktop" */
  lemonSqueezyCheckoutUrl?: string;
};

const PAYPAL_SDK_ID = "paypal-sdk";

export default function CheckoutButtons({
  productName,
  amount,
  lemonSqueezyCheckoutUrl,
}: CheckoutButtonsProps) {
  const paypalRef = useRef<HTMLDivElement>(null);

  const renderButtons = useCallback(() => {
    if (!window.paypal || !paypalRef.current) return;

    paypalRef.current.innerHTML = "";

    window.paypal
      .Buttons({
        style: { layout: "horizontal", height: 40 },
        createOrder: async () => {
          const res = await fetch("/api/checkout/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount, description: productName }),
          });
          const data = await res.json();
          return data.id;
        },
        onApprove: async (data: { orderID: string }) => {
          await fetch("/api/checkout/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId: data.orderID }),
          });
          window.location.href = "/checkout/success";
        },
      })
      .render(`#${paypalRef.current.id}`);
  }, [amount, productName]);

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) return;

    if (window.paypal) {
      renderButtons();
      return;
    }

    let script = document.getElementById(PAYPAL_SDK_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = PAYPAL_SDK_ID;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
      document.body.appendChild(script);
    }
    script.addEventListener("load", renderButtons);
    return () => script?.removeEventListener("load", renderButtons);
  }, [renderButtons]);

  return (
    <div className="flex flex-col gap-3">
      {lemonSqueezyCheckoutUrl ? (
        <a
          href={lemonSqueezyCheckoutUrl}
          className="lemonsqueezy-button rounded-lg bg-ink px-5 py-3 text-center text-sm font-semibold text-paper hover:bg-black"
        >
          Buy with card — ${amount}
        </a>
      ) : (
        <button
          disabled
          title="Set NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL and a real checkout link"
          className="cursor-not-allowed rounded-lg bg-ink/40 px-5 py-3 text-center text-sm font-semibold text-paper"
        >
          Buy with card — ${amount}
        </button>
      )}
      <div
        id={`paypal-buttons-${productName.replace(/\s+/g, "-")}-${amount}`}
        ref={paypalRef}
      />
      {!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID && (
        <p className="text-xs text-muted">
          Set NEXT_PUBLIC_PAYPAL_CLIENT_ID to enable the PayPal button.
        </p>
      )}
    </div>
  );
}
