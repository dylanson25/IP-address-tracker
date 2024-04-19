import { ReactElement } from "react";
import styles from "../assets/components/Input.module.sass";

const Input = ({
  type = "text",
  placeholder = "",
  name = "",
  addonsRight,
  children,
}: Props) => {
  return (
    <div className={`${styles.input} ${addonsRight && styles.addonsRight}`}>
      <input
        className={styles.formControl}
        name={name}
        type={type}
        placeholder={placeholder}
      />
      {addonsRight && <div className={styles.addonsRight}>{children}</div>}
    </div>
  );
};
export default Input;

interface Props {
  type?: "text" | "email" | "number";
  name?: string;
  placeholder?: string;
  addonsRight?: boolean;
  children?: ReactElement;
}
