import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <h1>Homepage</h1>
      <Link to="/products">Go to products</Link>
    </>
  );
};

export default HomePage;
