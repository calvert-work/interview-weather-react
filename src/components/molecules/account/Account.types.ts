export type TAccount = {
	isLoggedIn: boolean,
	email?: string
	registerUser: (firstName: string, email: string) => void
	loginUser: (email: string) => void
}