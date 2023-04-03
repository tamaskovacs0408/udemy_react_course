import Card from "./Card";
import Button from "./Button";
import style from "./ErrorModal.module.css";

const ErrorModal = ({ title, message }) => {
  return (
    <>
      <div className={style.backdrop}>
        <Card outerClass={style.modal}>
          <header className={style.header}>
            <h2>{title}</h2>
          </header>
          <div className={style.content}>
            <p>{message}</p>
          </div>
          <footer className={style.actions}>
            <Button>Close</Button>
          </footer>
        </Card>
      </div>
    </>
  );
};

export default ErrorModal;
