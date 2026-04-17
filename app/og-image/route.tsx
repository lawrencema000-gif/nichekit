import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const dynamic = "force-static";
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          background: "#F5F0EB",
          padding: "60px 80px",
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Subtle noise overlay simulation */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 80,
            fontSize: 18,
            color: "#C45D3E",
            fontWeight: 500,
            letterSpacing: "3px",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          For Australians
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 400,
              color: "#1A1A1A",
              letterSpacing: "-1px",
              display: "flex",
            }}
          >
            NicheKit
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 400,
              color: "#1A1A1A",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Build your own</span>
            <span>e-commerce store.</span>
            <span style={{ color: "#C45D3E" }}>No Shopify. Just AI.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            borderTop: "1.5px solid #E0D8CE",
            paddingTop: 24,
            fontSize: 20,
            color: "#4A4A4A",
          }}
        >
          <span style={{ display: "flex" }}>5 courses · 33 modules · 30+ templates</span>
          <span style={{ display: "flex", color: "#C45D3E", fontWeight: 600 }}>
            From $29/mo AUD
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
