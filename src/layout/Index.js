import React from "react";
import { Outlet } from "react-router-dom";
import Head from "./head/Head";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import AppRoot from "./global/AppRoot";
import AppWrap from "./global/AppWrap";


const Layout = ({title, ...props}) => {
  return (
    <>
      <Head title={!title && 'Loading'} />
      <AppRoot>
          <AppWrap>
            <Header fixed />
            <Outlet />
            <Footer />
          </AppWrap>
      </AppRoot>
    </>
  );
};
export default Layout;
