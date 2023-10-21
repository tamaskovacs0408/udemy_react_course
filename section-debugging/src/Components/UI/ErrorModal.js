import ReactDOM from "react-dom";
import Card from "./Card";
import Button from "./Button";
import style from "./ErrorModal.module.css";

const Backdrop = ({ onCloseModal }) => {
  return <div className={style.backdrop} onClick={onCloseModal} />;
};

const ModalOverlay = ({ title, message, onCloseModal }) => {
  return (
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
  );
};

const ErrorModal = ({ title, message, onCloseModal }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onCloseModal={onCloseModal} />,
        document.querySelector("#backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={title}
          message={message}
          onCloseModal={onCloseModal}
        />,
        document.querySelector("#modal-root")
      )}
    </>
  );
};

export default ErrorModal;
