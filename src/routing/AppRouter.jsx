import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";

import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPage } from "../modules/products/ProductsPage";
import { ErrorPage } from "../modules/error/ErrorPage";
import { NavbarPublic } from "../components/NavbarPublic";
import { Login } from "../components/Login";
import { Footer } from "../components/Footer";
import { AuthProvider, useAuth } from "../context/AuthContext";
/* import PrivateRoute from "../private/components/PrivateRoute"; */

import { PublicClassView } from "../modules/classes/public/PublicClassView"
import { CustomerView } from "../private/classes/privateUser/CustomerView";
import { AdminView } from "../private/classes/privateAdmin/AdminView";

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
          <Route path='/classes' element={<div className="content">< PublicClassView/></div>}></Route>
          <Route path='/login' element={<div className="content">< Login/></div>}></Route>
          <Route path='*' element={<div className="content"> <ErrorPage /></div>}></Route>
          <Route path='/uclasses' element={<div className="content">< CustomerView/></div>}></Route>
          <Route path='/pclasses' element={<div className="content">< AdminView/></div>}></Route>
      </Routes>
      <Footer/>
     </Router>
      </AuthProvider>
    
  )
}