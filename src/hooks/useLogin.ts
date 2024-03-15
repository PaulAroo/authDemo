import * as z from "zod"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { FormEvent, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axiosInstance from "../axios"

const formSchema = z.object({
	email: z
		.string()
		.email({
			message: "Please provide a valid email address",
		})
		.min(15, {
			message: "Email must be at least 15 characters long",
		}),
	password: z.string().min(6, {
		message: "Password must be at least 8 characters long",
	}),
})
type FormField = z.infer<typeof formSchema>

export const useLogin = () => {
	const [showPasswordField, setShowPasswordField] = useState(false)
	const [loading, setLoading] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
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
			}
		}
	}

	const onSubmit = (data: FormField) => {
		setLoading(true)
		axiosInstance
			.post("/v1/auth/login", data)
			.then((res) => {
				console.log(0, res)
				setLoading(false)
			})
			.catch((error) => {
				let errMsg = "something went wrong"
				if (error.response.status === 422) {
					errMsg = `Please provide valid inputs`
				} else {
					errMsg = error.response.data.detail
				}
				setLoading(false)
				toast.error(errMsg)
			})
	}

	return {
		errors,
		loading,
		register,
		handleLoginFlow,
		showPasswordField,
	}
}
