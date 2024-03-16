import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import axiosInstance from "../axios"
import { useState } from "react"

const formSchema = z.object({
	email: z
		.string()
		.email({
			message: "Please provide a valid email address",
		})
		.min(15, {
			message: "Email must be at least 15 characters long",
		}),
})
type FormField = z.infer<typeof formSchema>

export const useForgotPassword = () => {
	const [loading, setLoading] = useState(false)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormField>({
		resolver: zodResolver(formSchema),
	})

	const onSubmit = (data: FormField) => {
		setLoading(true)
		axiosInstance
			.post("/v1/auth/passwordreset", data)
			.then(() => {
				toast.success(`A password reset link has been sent to ${data.email}`)
				setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				let errMsg = "something went wrong"
				if (error.response.status === 422) {
					errMsg = `Please provide valid inputs`
				} else {
					errMsg = error.response.data.detail
				}
				setLoading(false)
				toast.error(errMsg)
			})
		reset()
	}

	return {
		errors,
		loading,
		onSubmit,
		register,
		handleSubmit,
	}
}
