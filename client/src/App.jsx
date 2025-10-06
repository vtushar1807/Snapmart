import { NavBar } from './Components/NavBar/NavBar';
import { Route,  Routes } from 'react-router';

import { Home } from './Components/Screens/Home/Home';
import { LogIn } from './Components/Screens/Login/Login';
import { SignUp } from './Components/Screens/Signup/SignUp';
import { Footer } from './Components/Footer/Footer';
import { CartComp } from './Components/Cart/CartComp';

import { Smartphones } from './Components/Screens/Smartphones/Smartphones';
import { Grocery } from './Components/Screens/Grocery/Grocery';
import { Watches } from './Components/Screens/Watches/Watches';
import { Shoes } from './Components/Screens/Shoes/Shoes';
import { Women } from './Components/Screens/Women/Women';
import { Men } from './Components/Screens/Men/Men';
import { Perfumes } from './Components/Screens/Perfumes/Perfumes';
import { Jewellery } from './Components/Screens/Jewellery/Jewellery';
import { ProductDetail } from './Components/ProductDetail/ProductDetail';
import { ContactUs } from './Components/Screens/Contactus/ContactUs';
import { AboutUs } from './Components/Screens/Aboutus/AboutUs';

function App() {
  

  return (
    <>
    <NavBar/>
    <Routes>
    
    <Route path="/signup" element={<SignUp/>}></Route>
    <Route path="/login" element={<LogIn/>}></Route>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/product/cart" element={<CartComp/>}></Route>
    <Route path="/contact" element={<ContactUs/>}></Route>
    <Route path="/aboutus" element={<AboutUs/>}></Route>

    <Route path="/smartphones" element={<Smartphones/>}></Route>
    <Route path="/product/category/groceries" element={<Grocery/>}></Route>
    <Route path="/jewellery" element={<Jewellery/>}></Route>
    <Route path="/women" element={<Women/>}></Route>
    <Route path="/men" element={<Men/>}></Route>
    <Route path="/watches" element={<Watches/>}></Route>
    <Route path="/shoes" element={<Shoes/>}></Route>
    <Route path="/perfumes" element={<Perfumes/>}></Route>
    <Route path="/product/detail/:id" element={<ProductDetail/>}></Route>

      </Routes>

      <Footer/>
    </>
  )
}

export default App
