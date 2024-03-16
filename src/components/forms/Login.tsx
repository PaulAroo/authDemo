import { Link } from "@tanstack/react-router"

import { Icons } from "../Icons"
import { Button } from "../Button"
import { ErrorMessage } from "../ErrorMessage"
import { Input, PasswordInput } from "../Input"
import { useLogin } from "../../hooks/useLogin"

export const LoginForm = () => {
	const { errors, handleLoginFlow, loading, register, showPasswordField } =
		useLogin()

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
			<Button type="submit" className="flex mt-[1.875rem]" disabled={loading}>
				{loading ? (
					<Icons.spinner className="animate-spin" />
				) : (
					"Log in to Qencode"
				)}
			</Button>
		</form>
	)
}
