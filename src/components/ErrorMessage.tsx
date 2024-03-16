export const ErrorMessage = ({ message }: { message: string | undefined }) => {
	if (message) {
		return (
			<p role="alert" className="text-red-500 text-sm">
				{message}
			</p>
		)
	}
}
