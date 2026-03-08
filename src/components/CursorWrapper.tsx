"use client";
import { usePathname } from "next/navigation";
import Cursor from "./Cursor";

export default function CursorWrapper() {
  const pathname = usePathname();
  if (pathname?.includes("/resume")) return null;
  return <Cursor />;
}
