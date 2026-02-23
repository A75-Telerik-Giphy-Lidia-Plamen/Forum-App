import { styles } from "./Button.styles";

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof styles.variants;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
};

export default function Button({
  children,
  variant = "default",
  type = "button",
  onClick,
  disabled,
  className = "",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.base} ${styles.variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
