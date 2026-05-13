export function Header({ title, subtitle, emoji }: { title: string; subtitle?: string; emoji?: string }) {
  return (
    <header className="px-5 pt-8 pb-5">
      <div className="flex items-center gap-3">
        {emoji && (
          <div className="h-12 w-12 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center text-2xl shadow-soft">
            {emoji}
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-extrabold tracking-tight leading-none">{title}</h1>
          <div className="mt-2 h-[4px] w-14 bg-primary rounded-full" />
        </div>
      </div>
      {subtitle && <p className="mt-3 text-base text-muted-foreground">{subtitle}</p>}
    </header>
  );
}
