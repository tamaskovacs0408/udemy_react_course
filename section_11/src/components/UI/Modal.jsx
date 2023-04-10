import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = ({closeCart}) => {
  return (
    <div className={classes.backdrop} onClick={closeCart}></div>
  )
};

const ModalOverlay = ({children}) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{children}</div>
    </div>
  )
}

const portalElement = document.querySelector("#overlays");

const Modal = ({children, closeCart}) => {
  return (
    <>
      {createPortal(<Backdrop closeCart={closeCart}/>, portalElement)}
      {createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement)}
    </>
  );
}

export default Modal