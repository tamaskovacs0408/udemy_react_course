import "./Card.css";

const Card = ({children, className}) => {
  const classes = "card " + className
  // Here, we add a classes variables which has the card class and the className class prop. With this we can add dynamically more classes to the card component
  return <div className={classes}>
    {children}
  </div>;
};

export default Card;
