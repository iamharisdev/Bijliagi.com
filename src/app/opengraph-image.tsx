import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { siteConfig } from "@/content/site";

export const alt = `${siteConfig.name}, electricians in ${siteConfig.city}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoSrc = `data:image/png;base64,${(await readFile(join(process.cwd(), "public/brand/logo.png"))).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(120deg, #0a1a33 0%, #0b4192 70%, #1667d9 100%)",
          color: "#ffffff",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignSelf: "flex-start", background: "#ffffff", borderRadius: 16, padding: 12 }}>
          <img src={logoSrc} alt="" width={170} height={180} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 800, lineHeight: 1.05, maxWidth: 980 }}>
            {`Electricians in ${siteConfig.city}. 35+ years of experience, now online.`}
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#ffc72c" }}>
            Wiring · Faults & DBs · AC · UPS · Solar · CCTV
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ height: 6, background: "#2f86ff" }} />
          <div style={{ height: 6, background: "#ffffff", opacity: 0.25 }} />
          <div style={{ height: 6, background: "#ffc72c" }} />
        </div>
      </div>
    ),
    size,
  );
}
