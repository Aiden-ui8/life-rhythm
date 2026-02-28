"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { AuthLayout } from "@/components/auth-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRegister } from "@/modules/user/client/user.hooks"

export default function RegisterPage() {
    const router = useRouter()
    const { mutate, isPending, error } = useRegister()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const passwordTooShort = password.length > 0 && password.length < 6
    const passwordMismatch =
        confirmPassword.length > 0 && password !== confirmPassword

    const isFormValid =
        name &&
        email &&
        password &&
        confirmPassword &&
        password.length >= 6 &&
        password === confirmPassword

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()

        if (!isFormValid) return

        mutate(
            { name, email, password },
            {
                onSuccess: () => {
                    router.push("/login")
                },
            }
        )
    }

    return (
        <AuthLayout>
            <Card className="rounded-2xl shadow-2xl backdrop-blur-sm bg-white/80 dark:bg-zinc-900/80">
                <CardHeader>
                    <CardTitle className="text-center text-xl">
                        Create your account
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                placeholder="Your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

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
                                placeholder="At least 6 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordTooShort && (
                                <p className="text-xs text-amber-500 mt-1">
                                    Password must be at least 6 characters
                                </p>
                            )}
                        </div>

                        <div>
                            <Label>Confirm Password</Label>
                            <Input
                                type="password"
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            {passwordMismatch && (
                                <p className="text-xs text-red-500 mt-1">
                                    Passwords do not match
                                </p>
                            )}
                        </div>

                        <Button
                            className="w-full"
                            disabled={
                                isPending ||
                                !isFormValid
                            }
                        >
                            {isPending
                                ? "Creating account..."
                                : "Create Account"}
                        </Button>

                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {(error as Error).message}
                            </p>
                        )}
                    </form>

                    <p className="mt-4 text-center text-sm text-zinc-500">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-black dark:text-white"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </AuthLayout>
    )
}