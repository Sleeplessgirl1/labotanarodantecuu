export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="px-5 pt-8 pb-4">
      <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
      <div className="mt-2 h-[3px] w-12 bg-primary rounded-full" />
      {subtitle && <p className="mt-3 text-sm text-muted-foreground font-light">{subtitle}</p>}
    </header>
  );
}
