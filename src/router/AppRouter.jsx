
import "../index.css";
import {  Content} from "../page";
import { Route, Routes } from "react-router-dom";

const AppRouter = () => {

  return (
    <>
      <Routes>
        <Route path="/" element={<Content />} />
      </Routes>
      
    </>
  );
};

export default AppRouter;
