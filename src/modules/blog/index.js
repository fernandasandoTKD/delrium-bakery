import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import Layout from './components/Layout/Layout';
import Home from './sub_pages/Home/Home.jsx'
import PostDetail from  './sub_pages/PostDetail/PostDetail.jsx'
import Register from  './sub_pages/Register/Register.jsx'
import Login from  './sub_pages/Login/Login.jsx'
import UserProfile from  './pages/UserProfile'
import Authors from  './sub_pages/Authors/Authors.jsx'
import CreatePost from  './sub_pages/CreatePost/CreatePost.jsx'
import DeletePost from  './pages/DeletePost'
import CategoryPosts from  './pages/CategoryPosts'
import AuthorPosts from  './pages/AuthorPosts'
import Dashboard from  './pages/Dashboard'
import Logout from  './pages/Logout'


const router = createBrowserRouter ([
  {
    path: "/",
    element: <Layout/>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home />},
      {path: "posts/:id" , element: <PostDetail />},
      {path: "register" , element: <Register />},
      {path: "login" , element: <Login />},
      {path: "profile/:id" , element: <UserProfile />},
      {path: "authors" , element: <Authors />},
      {path: "create" , element: <CreatePost />},
      {path: "posts/categories/:category" , element: <CategoryPosts />},
      {path: "posts/users/:id" , element: <AuthorPosts />},
      {path: "myposts/:id" , element: <Dashboard />},
      {path: "posts/:id/edit" , element: <EditPost />},
      {path: "posts/:id/delete" , element: <DeletePost/>},
      {path: "logout" , element: <Logout />},
    ]
  }
]) 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router ={router}/>
  </React.StrictMode>
);


