import { Link, createLazyFileRoute } from "@tanstack/react-router"
import { Icons } from "../components/Icons"
import { Button } from "../components/Button"
import { LoginForm } from "../components/forms/Login"

export const Route = createLazyFileRoute("/login")({
	component: Login,
})

function Login() {
	return (
		<div className="max-w-[25rem] mt-20 m-auto">
			<h1 className="text-center text-3xl text-brand-gray-900 font-bold">
				Log in to your account
			</h1>
			<div className="flex justify-between gap-4 pt-10 pb-[1.875rem]">
				<Button className="gap-[0.625rem]" variant="outline">
					<Icons.google />
					<span className="capitalize text-brand-gray-800">google</span>
				</Button>
				<Button className="gap-[0.625rem]" variant="outline">
					<Icons.gitHub />
					<span className="capitalize text-brand-gray-800">gitHub</span>
				</Button>
			</div>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-white px-2 text-brand-gray uppercase font-medium">
						or
					</span>
				</div>
			</div>
			<LoginForm />
			<p className="text-center mt-5 text-sm">
				Is your company new to Qencode?{" "}
				<Link className="text-brand font-medium">Sign up</Link>
			</p>
		</div>
	)
}
