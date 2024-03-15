import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createLazyFileRoute, useNavigate } from "@tanstack/react-router"

import { Input } from "../components/Input"
import { Button } from "../components/Button"
import { ErrorMessage } from "../components/ErrorMessage"

export const Route = createLazyFileRoute("/reset-password")({
	component: ResetPassword,
})

const formSchema = z.object({
	email: z.string().email({
		message: "Please provide a valid email address",
	}),
})
type FormField = z.infer<typeof formSchema>

function ResetPassword() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormField>({
		resolver: zodResolver(formSchema),
	})

	const navigate = useNavigate({ from: "/reset-password" })
	const onSubmit = (data: FormField) => console.log(data)

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
				<Button type="submit" className="block mt-[1.875rem]">
					Send
				</Button>
			</form>
			<Button
				variant="outline"
				className="mt-[1.25rem]"
				onClick={() => navigate({ to: "/login" })}
			>
				Cancel
			</Button>
		</div>
	)
}
