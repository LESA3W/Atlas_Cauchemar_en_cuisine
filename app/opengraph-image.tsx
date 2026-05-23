import { ImageResponse } from "next/og";
import { TOTAL_EPISODES_AIRED } from "@/data/restaurants";

export const runtime = "edge";
export const alt = "Carte Cauchemar en cuisine — L'Atlas des restaurants de Philippe Etchebest";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0A0A0A",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 60,
          fontFamily: "serif",
          color: "#F5F0E8",
          position: "relative"
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(ellipse at top left, rgba(185,28,28,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(184,134,11,0.15), transparent 60%)"
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "#B91C1C"
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 12, zIndex: 1 }}>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              letterSpacing: "0.32em",
              color: "#B8860B",
              textTransform: "uppercase"
            }}
          >
            L'Atlas · Édition 2026
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", zIndex: 1 }}>
          <h1
            style={{
              fontSize: 96,
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.02em",
              fontWeight: 700
            }}
          >
            Carte Cauchemar
            <br />
            <span style={{ fontStyle: "italic", color: "#F5F0E8" }}>en cuisine</span>
          </h1>
          <p
            style={{
              marginTop: 24,
              fontSize: 32,
              color: "rgba(245,240,232,0.78)",
              fontStyle: "italic"
            }}
          >
            {TOTAL_EPISODES_AIRED} restaurants visités par Philippe Etchebest — France & Corse
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            zIndex: 1
          }}
        >
          <div style={{ display: "flex", gap: 32 }}>
            <Stat label="Adresses" value={TOTAL_EPISODES_AIRED} accent="#F5F0E8" />
            <Stat label="Régions" value={13} accent="#B8860B" />
            <Stat label="Depuis" value="2011" accent="#B91C1C" />
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: 18,
              color: "rgba(245,240,232,0.62)",
              letterSpacing: "0.18em",
              textTransform: "uppercase"
            }}
          >
            carte-cauchemar-en-cuisine.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}

function Stat({
  label,
  value,
  accent
}: {
  label: string;
  value: string | number;
  accent: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span
        style={{
          fontFamily: "monospace",
          fontSize: 14,
          color: "rgba(245,240,232,0.62)",
          letterSpacing: "0.22em",
          textTransform: "uppercase"
        }}
      >
        {label}
      </span>
      <span style={{ fontSize: 48, color: accent, fontWeight: 700 }}>{value}</span>
    </div>
  );
}
