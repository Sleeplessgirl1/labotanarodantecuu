export function Header({ title, kicker }: { title: string; kicker?: string }) {
  return (
    <header className="px-6 pt-10 pb-6">
      {kicker && (
        <p className="text-[11px] uppercase tracking-[0.18em] text-primary font-bold mb-2 animate-fade-up">
          {kicker}
        </p>
      )}
      <h1 className="font-display text-[3.25rem] animate-fade-up delay-1">
        {title}
      </h1>
    </header>
  );
}
