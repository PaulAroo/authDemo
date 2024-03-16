import * as z from "zod"
import { createFileRoute } from "@tanstack/react-router"

import { Icons } from "../components/Icons"
import { Button } from "../components/Button"
import { PasswordInput } from "../components/Input"
import { ErrorMessage } from "../components/ErrorMessage"
import { useCreatePassword } from "../hooks/useCreatePassword"

const createPasswordSearchSchema = z.object({
	token: z.string().default(""),
	secret: z.string().default(""),
})

export const Route = createFileRoute("/create-new-password")({
	component: CreateNewPassword,
	validateSearch: createPasswordSearchSchema,
})

function CreateNewPassword() {
	const { secret, token } = Route.useSearch()
	const {
		errors,
		loading,
		register,
		onSubmit,
		handleSubmit,
		validatePassword,
		validateConfirmPassword,
	} = useCreatePassword({ secret, token })

	return (
		<div className="max-w-[25rem] mt-20 m-auto">
			<h1 className="text-center text-3xl text-brand-gray-900 font-bold">
				Create new Password?
			</h1>
			<form onSubmit={handleSubmit(onSubmit)} className="pt-[1.875rem]">
				<div>
					<label htmlFor="password">
						Password
						<PasswordInput
							{...register("password", validatePassword)}
							placeholder="Password"
						/>
					</label>
					<ErrorMessage message={errors.password?.message} />
				</div>
				<div>
					<label htmlFor="password_confirm">
						Confirm Password
						<PasswordInput
							{...register("password_confirm", validateConfirmPassword)}
							placeholder="Password"
						/>
					</label>
					<ErrorMessage message={errors.password_confirm?.message} />
				</div>
				<Button type="submit" className="flex mt-[1.875rem]" disabled={loading}>
					{loading ? <Icons.spinner className="animate-spin" /> : "Send"}
				</Button>
			</form>
		</div>
	)
}
