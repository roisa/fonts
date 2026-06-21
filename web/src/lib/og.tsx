import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function buildOgImage(eyebrow: string, title: string, subtitle?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fbfaf7",
          color: "#14141a",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#d94f30",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ marginTop: 24, fontSize: 32, color: "#6b6b75", maxWidth: 900 }}>
            {subtitle}
          </div>
        )}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 80,
            fontSize: 30,
            fontWeight: 800,
            display: "flex",
          }}
        >
          Ibra<span style={{ color: "#d94f30" }}>Fonts</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
