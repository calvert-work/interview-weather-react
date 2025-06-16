export type TButton = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
	iconLeft?: React.ReactNode;
  variant?: "primary" | "secondary" | "action" | "icon" | "border"
};
