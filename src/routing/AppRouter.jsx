import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPage } from "../modules/products/ProductsPage";
import { ErrorPage } from "../modules/error/ErrorPage";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { AuthProvider } from "../context/AuthProvider";
import PrivatePage from "../private/components/PrivatePage";
import PrivateRoute from "../private/components/PrivateRoute";
import { NavbarPublic } from "../components/NavbarPublic";
import { NavbarPrivate } from "../components/NavbarPrivate";
import useAuth from "../hooks/useAuth"; // Asegúrate de que este import esté correcto

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Router>
        <MainContent />
      </Router>
    </AuthProvider>
  );
};

const MainContent = () => {
  const { isAuthenticated, auth } = useAuth(); 
  console.log(isAuthenticated, auth)

  return (
    <>
      {isAuthenticated  && auth?.role=== 'admin' ? <NavbarPrivate /> : <NavbarPublic />}
      <Routes>
        <Route path='/' element={<div className="content"><ProductsPage /></div>} />
        <Route path='/products' element={<div className="content"><ProductsPage /></div>} />
        <Route path='/shopping' element={<div className="content"><ShoppingPage /></div>} />
        <Route path='/login' element={<div className="content"><Login /></div>} />
        <Route path='*' element={<div className="content"><ErrorPage /></div>} />
        <Route path="/private" element={<PrivateRoute element={<PrivatePage />} />} />
      </Routes>
      <Footer />
    </>
  );
};
