import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AdminPanel from "./pages/AdminPanel";
import SeatsUI from "./pages/SeatsUI";
import BookingForm from "./pages/BookingForm";
import Layout from "./components/layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<SeatsUI />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/booking/:seatId" element={<BookingForm />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
