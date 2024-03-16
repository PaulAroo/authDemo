import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/utils"

const buttonVariants = cva(
	"inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 py-[0.875rem] w-full",
	{
		variants: {
			variant: {
				default: "bg-brand text-white hover:bg-brand/90",
				outline: "border-[1.2px] border-brand-gray bg-background",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
)

interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<button
				className={cn(buttonVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		)
	}
)
Button.displayName = "Button"

export { Button }
