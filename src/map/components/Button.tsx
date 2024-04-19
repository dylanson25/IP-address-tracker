import style from "../assets/components/Button.module.sass";

const Button = ({ text, disabled }: Props) => {
  return (
    <button className={style.btn} disabled={disabled}>
      {text}
    </button>
  );
};
export default Button;

interface Props {
  text: string;
  disabled?: boolean;
}
