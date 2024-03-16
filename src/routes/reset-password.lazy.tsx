import { createLazyFileRoute, useNavigate } from "@tanstack/react-router"

import { Input } from "../components/Input"
import { Icons } from "../components/Icons"
import { Button } from "../components/Button"
import { ErrorMessage } from "../components/ErrorMessage"
import { useForgotPassword } from "../hooks/useForgotPassword"

export const Route = createLazyFileRoute("/reset-password")({
	component: ResetPassword,
})

function ResetPassword() {
	const navigate = useNavigate({ from: "/reset-password" })
	const { errors, onSubmit, loading, handleSubmit, register } =
		useForgotPassword()

	return (
		<div className="max-w-[25rem] mt-20 m-auto">
			<h1 className="text-center text-3xl text-brand-gray-900 font-bold">
				Forgot Password?
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="pt-[1.875rem]">
				<div>
					<Input {...register("email")} placeholder="Enter your email" />
					<ErrorMessage message={errors.email?.message} />
				</div>
				<Button type="submit" className="flex mt-[1.875rem]" disabled={loading}>
					{loading ? <Icons.spinner className="animate-spin" /> : "Send"}
				</Button>
			</form>
			<Button
				variant="outline"
				className="mt-[1.25rem] text-brand-gray-800"
				disabled={loading}
				onClick={() => navigate({ to: "/login" })}
			>
				Cancel
			</Button>
		</div>
	)
}
