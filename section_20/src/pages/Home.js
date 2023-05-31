import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  function navigateHandler() {
    navigate("/products");
  }

  return (
    <>
      <h1>Homepage</h1>
      <Link to="/products">Go to products</Link>
      <p>
        <button onClick={navigateHandler}>Navigate</button>
      </p>
    </>
  );
};

export default HomePage;
