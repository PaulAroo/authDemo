import { createLazyFileRoute } from "@tanstack/react-router"

export const Route = createLazyFileRoute("/reset-password")({
	component: ResetPassword,
})

function ResetPassword() {
	return (
		<div className="max-w-[25rem] mt-20 m-auto">
			<h1 className="text-center text-3xl text-brand-gray-900 font-bold">
				Forgot Password?
			</h1>
		</div>
	)
}
