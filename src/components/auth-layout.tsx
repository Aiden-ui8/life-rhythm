import { ReactNode } from "react"

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-zinc-100 via-white to-zinc-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-black">

      {/* 光晕装饰 */}
      <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-300 opacity-20 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-[400px] w-[400px] rounded-full bg-pink-300 opacity-20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(0,0,0,0.05)_1px,_transparent_0)] [background-size:20px_20px]" />

      <div className="relative w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Life Rhythm
          </h1>
          <p className="text-sm text-zinc-500">
            Manage your life with clarity
          </p>
        </div>

        {children}
      </div>
    </div>
  )
}