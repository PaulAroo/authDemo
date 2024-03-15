import * as z from "zod"
import { useForm } from "react-hook-form"
import { FormEvent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "../Button"
import { Link } from "@tanstack/react-router"
import { Input, PasswordInput } from "../Input"
import { ErrorMessage } from "../ErrorMessage"

const formSchema = z.object({
	email: z.string().email({
		message: "Please provide a valid email address",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 8 characters long",
	}),
})
type FormField = z.infer<typeof formSchema>

export const LoginForm = () => {
	const [showPasswordField, setShowPasswordField] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		setFocus,
	} = useForm<FormField>({
		resolver: zodResolver(formSchema),
	})

	const handleLoginFlow = () => {
		if (showPasswordField) {
			return handleSubmit(onSubmit)
		}
		return async (e: FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			const isvalid = await trigger("email", { shouldFocus: true })
			if (isvalid) {
				setShowPasswordField(true)
				setFocus("password")
			}
		}
	}
	const onSubmit = (data: FormField) => console.log(data)

	return (
		<form onSubmit={handleLoginFlow()} className="pt-[1.875rem]">
			<div>
				<Input {...register("email")} placeholder="Work email" />
				<ErrorMessage message={errors.email?.message} />
			</div>
			{showPasswordField && (
				<>
					<div className="mt-[1.5625rem]">
						<PasswordInput {...register("password")} placeholder="Password" />
						<ErrorMessage message={errors.password?.message} />
					</div>
					<p className="text-right text-brand mt-[0.9375rem]">
						<Link to="/reset-password">Forgot your password?</Link>
					</p>
				</>
			)}
			<Button type="submit" className="block w-full mt-[1.875rem]">
				Log in to Qencode
			</Button>
		</form>
	)
}
