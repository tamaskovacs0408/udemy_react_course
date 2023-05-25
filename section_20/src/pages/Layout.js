import { Outlet } from "react-router-dom";
import MainNav from "../components/MainNav";

import classes from "./Layout.module.scss";

const Layout = () => {
  return (
    <>
      <MainNav />
      <main className={classes.content}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
