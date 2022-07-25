
import "./App.scss"
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginForm from "./login/LoginForm"
import RegisterForm from "./register/ReisterForm"
import Products from "./products/Products"
import AdminPanel from "./adminPanel/AdminPanel"
import Nav from "./nav/Nav"
import Cart from "./cart/Cart"
import Profile from "./profile/Profile"
import ProductForm from "./adminPanel/ProductForm";


function App() {



  return (
    <BrowserRouter>
     <Nav/>
      <Routes>
        <Route path="/" element={<Products/>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/add-product" element={<ProductForm />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default App