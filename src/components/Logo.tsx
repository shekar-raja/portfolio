import { useId } from "react";
import portfolioConfig from "@/data/portfolio.config";

interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 40, className = "" }: LogoProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `logo-grad-${uid}`;
  const bgId = `logo-bg-${uid}`;

  // Strip trailing dot from initials for the graphic
  const initials = portfolioConfig.personal.initials.replace(/\.$/, "");

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={`${portfolioConfig.personal.name} logo`}
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <linearGradient id={bgId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1c1105" />
          <stop offset="100%" stopColor="#05130f" />
        </linearGradient>
      </defs>

      {/* Flat-top hexagon */}
      <path
        d={`M 95,50 L 72.5,11.03 L 27.5,11.03 L 5,50 L 27.5,88.97 L 72.5,88.97 Z`}
        fill={`url(#${bgId})`}
        stroke={`url(#${gradId})`}
        strokeWidth="4"
      />

      {/* Initials */}
      <text
        x="50"
        y="53"
        textAnchor="middle"
        dominantBaseline="middle"
        fill={`url(#${gradId})`}
        fontFamily="Sora, Inter, sans-serif"
        fontWeight="700"
        fontSize={initials.length > 2 ? "24" : "30"}
        letterSpacing="-1"
      >
        {initials}
      </text>
    </svg>
  );
}
