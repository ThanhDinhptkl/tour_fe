import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import TourList from "./pages/TourList";

import Header from "./components/Header";
import Footer from "./components/Footer";
import UserProfile from "./pages/UserProfile";
import TourDetail from "./pages/TourDetail";
import AboutUs from "./pages/AboutUs";
import BookingForm from "./pages/BookingForm";
import PaymentForm from "./pages/PaymentForm";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { AuthProvider } from './contexts/AuthContext';
import PaymentCallback from './pages/PaymentCallback';
import MyBookings from "./pages/MyBookings";
import Contact from "./pages/ContactUs";
import OAuth2SuccessPage from './contexts/OAuth2SuccessPage ';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<TourList />} />
              <Route path="/tourdetail/:id" element={<TourDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/aboutus" element={<AboutUs />} />
              <Route path="/booking/:id" element={<BookingForm />} />
              <Route path="/payment/:id" element={<PaymentForm />} />
              <Route path="/payment/callback" element={<PaymentCallback />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/termofservice" element={<TermsOfService />} />
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/oauth2/success" element={<OAuth2SuccessPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
