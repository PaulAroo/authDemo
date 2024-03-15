import { createRootRoute, Outlet } from "@tanstack/react-router"

import brandlogo from "/logo.svg"

export const Route = createRootRoute({
	component: () => (
		<div className="container min-h-dvh pt-32 xl:pt-[11.25rem]">
			<div className="w-fit m-auto">
				<img src={brandlogo} alt="quencode logo" />
			</div>
			<Outlet />
		</div>
	),
})
