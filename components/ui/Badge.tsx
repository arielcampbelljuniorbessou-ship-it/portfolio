type BadgeProps = {
  children: React.ReactNode;
  tone?: "green" | "aqua" | "brass" | "muted";
};

const toneClasses = {
  green: "border-neon/25 bg-neon/10 text-mint",
  aqua: "border-aqua/25 bg-aqua/10 text-aqua",
  brass: "border-brass/30 bg-brass/10 text-brass",
  muted: "border-line bg-white/[0.03] text-muted"
};

export function Badge({ children, tone = "green" }: BadgeProps) {
  return (
    <span
      className={`inline-flex min-h-8 items-center rounded-full border px-3 text-xs font-semibold uppercase ${toneClasses[tone]}`}
    >
      {children}
    </span>
  );
}
