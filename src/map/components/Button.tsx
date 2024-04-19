import style from "../assets/components/Button.module.sass";

const Button = ({ text, disabled, eventClick }: Props) => {
  return (
    <button className={style.btn} disabled={disabled} onClick={eventClick}>
      {text}
    </button>
  );
};
export default Button;

interface Props {
  text: string;
  disabled?: boolean;
  eventClick: () => void;
}
