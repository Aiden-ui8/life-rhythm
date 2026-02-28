"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLogin } from "@/modules/user/client/user.hooks"
import { toast } from "sonner"

export default function LoginPage() {
    const router = useRouter()
    const { mutateAsync: login, isPending } = useLogin()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!email) {
            toast.error("Email is required")
            return
        }

        if (!password) {
            toast.error("Password is required")
            return
        }

        try {
            await login({ email, password })
            router.push("/dashboard")
        } catch { }

    }

    return (
        <AuthLayout>
            <Card className="rounded-2xl shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        Sign in to your account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <Button className="w-full" disabled={isPending}>
                            {isPending ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <p className="mt-4 text-center text-sm text-zinc-500">
                        Don't have an account?{" "}
                        <Link href="/register" className="font-medium text-black dark:text-white">
                            Sign up
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    )
}