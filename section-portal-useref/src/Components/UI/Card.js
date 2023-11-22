import style from "./Card.module.css";

const Card = ({outerClass, children}) => {
  return (
    <div className={`${style.card} ${outerClass}`}>{children}</div>
  )
}

export default Card