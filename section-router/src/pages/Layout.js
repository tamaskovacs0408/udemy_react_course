import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

const Layout = () => {
  return (
    <>
      <MainNav />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
