type StatCardProps = {
  title: string
  value: number | string
  subtitle?: string
}

export function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <div className="rounded-2xl bg-white dark:bg-zinc-900 shadow p-6 border border-zinc-100 dark:border-zinc-800">
      <div className="text-sm text-zinc-500">{title}</div>

      <div className="mt-2 text-3xl font-bold">
        {value}
      </div>

      {subtitle && (
        <div className="mt-1 text-xs text-zinc-400">
          {subtitle}
        </div>
      )}
    </div>
  )
}