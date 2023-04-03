import Card from "./Card";
import Button from "./Button";
import style from "./ErrorModal.module.css";

const ErrorModal = ({ title, message, onCloseModal }) => {
  return (
    <>
      <div className={style.backdrop} onClick={onCloseModal}>
        <Card outerClass={style.modal}>
          <header className={style.header}>
            <h2>{title}</h2>
          </header>
          <div className={style.content}>
            <p>{message}</p>
          </div>
          <footer className={style.actions}>
            <Button onClick={onCloseModal}>Close</Button>
          </footer>
        </Card>
      </div>
    </>
  );
};

export default ErrorModal;
