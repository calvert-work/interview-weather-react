export type TAccount = {
	isLoggedIn: boolean,
	email: string
	firstName: string
	setUserEmail: React.Dispatch<React.SetStateAction<string>>
	setUserFirstName: React.Dispatch<React.SetStateAction<string>>
	registerUser: () => Promise<void>
	loginUser: () => Promise<void>
	isLoading?: boolean
}