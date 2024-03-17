import React, { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Layout from "../layout/Index";
import LayoutNoSidebar from "../layout/Index-nosidebar";
import HomePage from "../components/HomePage";
import TermCondition from "../components/TermCondition";


const Router = () => {
  const location = useLocation();
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage/>}></Route>
        <Route path="/terms-condition" element={<TermCondition/>}></Route>
      </Route>
      
    </Routes>
  );
};
export default Router;
