import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { useState } from "react"
import axiosInstance from "../axios"

type FormField = {
	password: string
	password_confirm: string
}

export const useCreatePassword = ({
	secret,
	token,
}: {
	secret: string
	token: string
}) => {
	const [loading, setLoading] = useState(false)
	const {
		register,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<FormField>()

	const validatePassword = {
		required: "Password is required",
		minLength: {
			value: 8,
			message: "Password must be at least 8 characters long",
		},
	}

	const validateConfirmPassword = {
		validate: (value: string) =>
			value === getValues("password") || "Passwords do not match",
	}

	const onSubmit = (data: FormField) => {
		setLoading(true)
		axiosInstance
			.post("/v1/auth/passwordset", {
				...data,
				secret,
				token,
			})
			.then(() => {
				toast.success("password changed")
				setLoading(false)
			})
			.catch((error) => {
				let errMsg = "something went wrong"
				if (error.response.status === 422) {
					errMsg = "Please provide valid inputs"
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
		onSubmit,
		handleSubmit,
		validatePassword,
		validateConfirmPassword,
	}
}
