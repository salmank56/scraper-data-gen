import { Outlet } from "react-router-dom";
import SidebarWrapper from "./components/sidebar";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      {/* <Header /> */}
      <div className="relative">
        <SidebarWrapper />
        <div className="min-h-screen p-4 mt-16 sm:ml-64 bg-tertiary/10 ">
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default App;
