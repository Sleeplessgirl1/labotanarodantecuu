export function Header({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <header className="px-6 pt-10 pb-6">
      {kicker && (
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-bold mb-2 animate-fade-up">
          {kicker}
        </p>
      )}
      <h1 className="text-[2.5rem] leading-[1] font-extrabold tracking-tight animate-fade-up delay-1">
        {title}
      </h1>
    </header>
  );
}
