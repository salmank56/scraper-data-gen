import { Outlet } from "react-router-dom";
import Footer from "./components/layout/Footer";
import { SessionProvider } from "./contexts/SessionContext";
import { Loader } from "./scraper/pages/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./components/layout/Sidebar";
import Header from "./components/layout/Header";

const DataGeneration = () => {
  return (
    <SessionProvider loader={<Loader/>}>
      <div>
        <Header />
        <div className="relative">
          <Sidebar />
          <div className="min-h-screen p-4 mt-16 sm:ml-64 bg-tertiary/10 ">
            <Outlet />
          </div>
          <Footer />
        </div>
        <ToastContainer />
      </div>
    </SessionProvider>
  );
};

export default DataGeneration;