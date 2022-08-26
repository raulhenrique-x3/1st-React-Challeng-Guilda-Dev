import "./button.scss";
interface IButtonProps {
  type?: "Primary" | "Secondary" | "Success" | "Danger" | "Warning" | "Info" | "Light" | "Dark";
  size?: "small" | "medium" | "large";
  round?: boolean;
  label: string | React.ReactNode;
  click?: (answer: any) => void;
  value?: string | React.ReactNode;
}

export const Button: React.FC<IButtonProps> = ({ size = "medium", label, type, click, round = false, value }) => {
  const mode = round ? "round" : "";
  return (
    <button onClick={click} className={`${size} ${type} ${mode}`} value={`${value}`}>
      <p>{label}</p>
    </button>
  );
};
