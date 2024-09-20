import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPage } from "../modules/products/ProductsPage";
import { ClassesPages } from "../modules/classes/ClassesPages";
import { ErrorPage } from "../modules/error/ErrorPage";
import { NavbarPublic } from "../components/NavbarPublic";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { AuthProvider, useAuth } from "../context/AuthContext";
/* import PrivateRoute from "../private/components/PrivateRoute"; */


export const AppRouter = () => {

  return (

      <AuthProvider>
        <Router>
      {/* Componentes rutas publicas */}
      <NavbarPublic />
      <Routes>
          <Route path='/' element={<div className="content"><ProductsPage /></div>}></Route>
        {/*   <Route path='/shopping' element={<PrivateRoute element={<div className="content"><ShoppingPage /></div>} />} /> */}
          <Route path='/products' element={<div className="content"><ProductsPage /></div>}></Route>
          <Route path='/shopping' element={<div className="content">< ShoppingPage/></div>}></Route>
          <Route path='/login' element={<div className="content">< Login/></div>}></Route>
          <Route path='*' element={<div className="content"> <ErrorPage /></div>}></Route>
      </Routes>
      <Footer/>
     </Router>
      </AuthProvider>
    
  )
}