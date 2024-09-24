import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShoppingPage from "../modules/shopping/ShoppingPage";
import { ProductsPage } from "../modules/products/ProductsPage";
import { ErrorPage } from "../modules/error/ErrorPage";
import {BlogPage} from "../modules/blog/BlogPage";
import {PostDetail} from "../modules/blog/sub_pages/PostDetail.jsx"
import {Authors} from "../modules/blog/sub_pages/Authors.jsx"
import {CreatePost} from  "../modules/blog/sub_pages/CreatePost.jsx"
import {CategoryPosts} from "../modules/blog/sub_pages/CategoryPosts.jsx"
import {AuthorPosts} from "../modules/blog/sub_pages/AuthorPosts.jsx"
import {Dashboard} from "../modules/blog/sub_pages/Dashboard.jsx"
import {UserProfile} from "../modules/blog/sub_pages/UserProfile.jsx"
import {EditPost} from "../modules/blog/sub_pages/EditPost.jsx"
import {DeletePost} from "../modules/blog/sub_pages/DeletePost.jsx"
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
      {isAuthenticated  && auth?.role=== 'user' ? <NavbarPrivate /> : <NavbarPublic />}
      <Routes>
      <Route path='/' element={<div className="content"><ProductsPage /></div>} />
        <Route path='/products' element={<div className="content"><ProductsPage /></div>} />
        <Route path='/shopping' element={<div className="content"><ShoppingPage /></div>} />
        <Route path='/login' element={<div className="content"><Login /></div>} />
        <Route path='*' element={<div className="content"><ErrorPage /></div>} />
        <Route path="/private" element={<PrivateRoute element={<PrivatePage />} />} />

          <Route path="/blog" element={<div className="content"><BlogPage/></div>}></Route>
          <Route path='/posts/:id' element={<div className="content">< PostDetail/></div>}></Route>
          <Route path='/authors' element={<div className="content">< Authors/></div>}></Route>
          <Route path='/create' element={<div className="content">< CreatePost/></div>}></Route>
          <Route path='/post/categories/:category' element={<div className="content">< CategoryPosts/></div>}></Route>
          <Route path='/posts/user/:id' element={<div className="content"><AuthorPosts/></div>}></Route>
          <Route path='/myposts/:id' element={<div className="content"><Dashboard/></div>}></Route>
          <Route path='/profile/:id' element={<div className="content"><UserProfile/></div>}></Route>
          <Route path='/posts/:id/edit' element={<div className="content">< EditPost/></div>}></Route>
          <Route path='/posts/:id/delete' element={<div className="content">< DeletePost/></div>}></Route>
          <Route path='*' element={<div className="content"> <ErrorPage /></div>}></Route>
      </Routes>
      <Footer />
    </>
  );
};
