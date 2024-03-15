import { Toaster } from "sonner"
import { createRootRoute, Outlet } from "@tanstack/react-router"

import brandlogo from "/logo.svg"

export const Route = createRootRoute({
	component: () => (
		<div className="container min-h-dvh pt-32 lg:pt-[11.25rem]">
			<div className="w-fit m-auto">
				<img src={brandlogo} alt="quencode logo" />
			</div>
			<Outlet />
			<Toaster
				position="top-center"
				toastOptions={{
					unstyled: true,
					classNames: {
						error:
							"flex p-4 min-w-[356px] items-center text-red-500 shadow-md gap-2 border border-brand-gray rounded-[8px]",
					},
				}}
			/>
		</div>
	),
})
