import { Route, Routes } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import AdminRoutes from "./routes/AdminRoutes";
import UserRoutes from "./routes/UserRoutes";
import RestaurantRoutes from "./routes/RestaurantRoutes";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/restaurant/*" element={<RestaurantRoutes />} />
        <Route path="/*" element={<UserRoutes />} />
      </Routes>

      <ToastContainer
        toastClassName="custom-toast"
        position="top-center"
        autoClose={5000}
        // closeButton={true}
        hideProgressBar={true}
        newestOnTop={false}
        // closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
