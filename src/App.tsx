import { Outlet } from "react-router-dom";
import SidebarWrapper from "./components/sidebar";
import Footer from "./components/Footer";
import { SessionProvider } from "./contexts/SessionContext";
import { Loader } from "./pages/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <SessionProvider loader={<Loader/>}>
      <div>
        {/* <Header /> */}
        <div className="relative">
          <SidebarWrapper />
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

export default App;
