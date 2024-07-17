import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function Template() {
      return (
            <>
                  <Header count={10} />
                  <Outlet />
            </>

      )
}