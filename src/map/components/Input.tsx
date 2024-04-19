import { ReactElement } from "react";
import styles from "../assets/components/Input.module.sass";
type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Input = ({
  addonsRight,
  children,
  name = "",
  onChange,
  placeholder = "",
  type = "text",
  value,
}: Props) => {
  return (
    <div className={`${styles.input} ${addonsRight && styles.addonsRight}`}>
      <input
        className={styles.formControl}
        name={name}
        onChange={({ target: { value } }: InputChangeEvent) => onChange(value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {addonsRight && <div className={styles.addonsRight}>{children}</div>}
    </div>
  );
};
export default Input;

interface Props {
  addonsRight?: boolean;
  children?: ReactElement;
  name?: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "number";
  value: string;
}
