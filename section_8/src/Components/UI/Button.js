import style from "./Button.module.css";

const Button = ({ type, onHandleClick, children }) => {
  return (
    <button
      className={style.button}
      type={type || "button"}
      onClick={onHandleClick}
    >
      {children}
    </button>
  );
};

export default Button;
