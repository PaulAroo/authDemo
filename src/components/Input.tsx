import * as React from "react"
import { Icons } from "./Icons"
import { cn } from "../lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => (
		<input
			className={cn(
				"w-full text-brand-gray-800 border-[1.2px] border-brand-gray rounded-[6px] py-[0.875rem] px-3 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-brand-gray",
				className
			)}
			ref={ref}
			{...props}
		/>
	)
)
Input.displayName = "Input"

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, ...props }, ref) => {
		const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

		const togglePasswordVisibility = () => {
			setIsPasswordVisible((prev) => !prev)
		}

		return (
			<div className="relative flex flex-row-reverse items-center">
				<Input
					type={isPasswordVisible ? "text" : "password"}
					ref={ref}
					{...props}
					className={className}
				/>
				<div
					className="absolute right-[1.3rem] md:right-[1.8rem] text-[1rem] text-brand-ash cursor-pointer"
					onClick={togglePasswordVisibility}
				>
					{isPasswordVisible ? <Icons.eyeon /> : <Icons.eyeoff />}
				</div>
			</div>
		)
	}
)

export { Input, PasswordInput }
