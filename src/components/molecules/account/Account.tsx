import { Text } from "../../atoms/text/Text"
import type { TAccount } from "./Account.types"
import styles from "./Account.module.scss"
import { Input } from "../../atoms/input/Input"
import { useState } from "react"
import { Label } from "../../atoms/label/Label"
import { Button } from "../../atoms/button/Button"
import { capitalize } from "../../../util/capitalize"

const AuthPopup = ({
	authType,
	firstName,
	enteredEmail,
	setFirstName,
	setEnteredEmail,
	onCompleteAuthClick,
	onCancel,
}: {
	authType: "register" | "login",
	firstName: string,
	enteredEmail: string,
	setFirstName: (firstName: string) => void,
	setEnteredEmail: (email: string) => void,
	onCompleteAuthClick: () => void,
	onCancel: () => void,
}) => (
	<div className={styles["authPopUpContainer"]}>
		<div className={styles["authPopUp"]}>
			<Text.Paragraph className={styles["authBoxTitle"]}>{capitalize(authType)}</Text.Paragraph>
			<br />
			{authType === "register" && (
				<>
					<Label htmlFor="firstName">
						First name
						<Input id="firstName" onChange={e => setFirstName(e.target.value)} value={firstName} />
					</Label>
					<br />
				</>
			)}
			<Label htmlFor="email">
				Email
				<Input id="email" onChange={e => setEnteredEmail(e.target.value)} value={enteredEmail} />
			</Label>
			<br />
			<Button className={styles["authBtn"]} type="button" variant="action" onClick={onCompleteAuthClick}>
				{capitalize(authType)} User
			</Button>
			<Button className={styles["authBtn"]} type="button" variant="secondary" onClick={onCancel}>
				Cancel
			</Button>
		</div>
	</div>
);

/**
 * 1) Display Register and Login button if no user is logged in.
 * 2) If a user is logged in, it will display "Hi, {email}"
 * 3) A modal pop up will be displayed to allow simple registration and login
 */
export const Account = ({ isLoggedIn = false, email, loginUser, registerUser }: TAccount) => {
	const [showCredsBox, setShowCredsBox] = useState(false);
	const [authType, setAuthType] = useState<"register" | "login">("login");
	const [firstName, setFirstName] = useState("");
	const [enteredEmail, setEnteredEmail] = useState("");

	const openAuthPopup = (type: "register" | "login") => {
		setShowCredsBox(true);
		setAuthType(type);
	};

	const closeAuthPopup = () => {
		setShowCredsBox(false);
		setFirstName("");
		setEnteredEmail("");
	};

	const onCompleteAuthClick = () => {
		if (authType === "register") {
			registerUser(firstName, enteredEmail);
		} else {
			loginUser(enteredEmail);
		}
		closeAuthPopup();
	};

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
					enteredEmail={enteredEmail}
					setFirstName={setFirstName}
					setEnteredEmail={setEnteredEmail}
					onCompleteAuthClick={onCompleteAuthClick}
					onCancel={closeAuthPopup}
				/>
			)}
		</section>
	);
}