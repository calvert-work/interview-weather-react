import { Text } from "../../atoms/text/Text"
import type { TAccount } from "./Account.types"
import styles from "./Account.module.scss"
import { Input } from "../../atoms/input/Input"
import { useEffect, useState } from "react"
import { Label } from "../../atoms/label/Label"
import { Button } from "../../atoms/button/Button"
import { capitalize } from "../../../utils/capitalize"
import CircularProgress from "@mui/material/CircularProgress"

const AuthPopup = ({
	authType,
	firstName,
	email,
	setUserFirstName,
	setUserEmail,
	onCompleteAuthClick,
	onCancel,
	isLoading
}: {
	authType: "register" | "login",
	firstName: string,
	email: string,
	setUserFirstName: (firstName: string) => void,
	setUserEmail: (email: string) => void,
	onCompleteAuthClick: () => void,
	onCancel: () => void,
	isLoading?: boolean
}) => (
	<div className={styles["authPopUpContainer"]}>
		<div className={styles["authPopUp"]}>
			<Text.Paragraph className={styles["authBoxTitle"]}>{capitalize(authType)}</Text.Paragraph>
			<br />
			{authType === "register" && (
				<>
					<Label htmlFor="firstName">
						First name
						<Input autoFocus id="firstName" onChange={e => setUserFirstName(e.target.value)} value={firstName} disabled={isLoading} />
					</Label>
					<br />
				</>
			)}
			<Label htmlFor="email">
				Email
				<Input autoFocus={authType === "login"} id="email" onChange={e => setUserEmail(e.target.value)} value={email} disabled={isLoading} />
			</Label>
			<br />

			{
				isLoading ?
					<CircularProgress /> :
					<>
						<Button className={styles["authBtn"]} type="button" variant="action" onClick={onCompleteAuthClick}>
							{capitalize(authType)} User
						</Button>
						<Button className={styles["authBtn"]} type="button" variant="secondary" onClick={onCancel}>
							Cancel
						</Button>
					</>
			}
		</div>
	</div>
);

/**
 * 1) Display Register and Login button if no user is logged in.
 * 2) If a user is logged in, it will display "Hi, {email}"
 * 3) A modal pop up will be displayed to allow simple registration and login
 */
export const Account = ({ isLoggedIn = false, email, firstName, loginUser, registerUser, setUserEmail, setUserFirstName, isLoading }: TAccount) => {
	const [showCredsBox, setShowCredsBox] = useState(false);
	const [authType, setAuthType] = useState<"register" | "login">("login");

	const openAuthPopup = (type: "register" | "login") => {
		setShowCredsBox(true);
		setAuthType(type);
	};

	const closeAuthPopup = () => {
		setShowCredsBox(false);
	};

	const onCompleteAuthClick = async () => {
		if (authType === "register") {
			await registerUser();
		} else {
			await loginUser();
		}
	};

	useEffect(() => {
		if (isLoggedIn) {
			closeAuthPopup();
		}
	}, [isLoggedIn])

	return (
		<section>
			{isLoggedIn ? (
				<Text.Paragraph className={styles["greetingUser"]}>Hi, {email}</Text.Paragraph>
			) : (
				<div className={styles["accountContainer"]}>
					<Text.Paragraph onClick={() => openAuthPopup("register")} className={styles["accountContainer__link"]}>Register</Text.Paragraph>
					<Text.Paragraph onClick={() => openAuthPopup("login")} className={styles["accountContainer__link"]}>Login</Text.Paragraph>
				</div>
			)}

			{showCredsBox && (
				<AuthPopup
					authType={authType}
					firstName={firstName}
					email={email}
					setUserFirstName={setUserFirstName}
					setUserEmail={setUserEmail}
					onCompleteAuthClick={onCompleteAuthClick}
					onCancel={closeAuthPopup}
					isLoading={isLoading}
				/>
			)}
		</section>
	);
}