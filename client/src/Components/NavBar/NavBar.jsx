import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router';
import { FaSearch } from "react-icons/fa"
import { FaShoppingCart } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { useSelector } from 'react-redux';
import { executeLogout } from '../../Redux/loginReducer';
import { useDispatch } from 'react-redux';

import { setLogInFn,removeLogInFn} from '../../Redux/loginReducer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiLogOut } from "react-icons/fi";

export const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((store) => store.logInRed.isLogin);
  let cartItems=useSelector((store) => store.cartRed.cartItems);
  const loginUsername = useSelector(store => store.logInRed.loggedInUser.username);

  const handleWelcome = (loginUsername)=>{
      return loginUsername.toUpperCase();
  }


  const formik = useFormik({
    initialValues:{
      search:"",
    },

    validationSchema:Yup.object().shape({
      search:Yup.string().oneOf(["smartphones", "perfumes", "watches", "shoes", "men", "women", "jewellery", "grocery"], "*Invalid Category")
    }),

    // validateOnBlur:false,
    validateOnChange:false,

    onSubmit:(values)=>{

      navigate(`/${values.search}`);
      console.log("Form Submitted");
      formik.resetForm();
    }
  });

    

    const handleLogin = async()=>{

       try {
        const resultAction = await dispatch(executeLogout());

        if(executeLogout.fulfilled.match(resultAction)){
           console.log("Logged out successfully");
            navigate("/");
            dispatch(setLogInFn());
        }

        else if(executeLogout.rejected.match(resultAction)){
            console.log("Error in Log out");
        }
         
      } catch (error) {
        console.log("Logout Requesting Error");
      }
    }

     const handleLogout = ()=>{
      navigate('/login');
      // console.log("inside logout");
    }

  return (
    
    
    <Navbar expand="xxl" className="bg-body-tertiary pt-0" >

      <Container fluid className='navMain'>
        <Navbar.Brand as={Link} to="/" className='navLogo text-white fs-1'><h1 className='mt-auto fw-bold'>SnapMart</h1></Navbar.Brand>
        
        <form onSubmit={formik.handleSubmit}>
        <div className="d-flex align-items-center flex-grow-1 me-3">
      <input type="text" className='navSearch' name="search" placeholder='Search for product category' {...formik.getFieldProps('search')}/><button className='search-btn fst-italic' type="submit"><FaSearch/></button>
          {
            formik.touched.search && formik.errors.search ? <span style={{fontSize:"10px", fontStyle:"italic"}} className='text-white mt-0'>{formik.errors.search}</span>:null
          }
        </div>
          </form>
        
        
        <Navbar.Toggle aria-controls="basic-navbar-nav w-100" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mb-auto mt-auto d-flex align-items-center navOptions">
       
          <Nav.Link className='text-white' as={Link} to="/">Home</Nav.Link>
          <Nav.Link className='text-white' as={Link} to="/about">About Us</Nav.Link>
          <Nav.Link className='text-white' as={Link} to="/contact">Contact</Nav.Link>
          <Nav.Link className='text-white' as={Link} to="/cart"><FaShoppingCart className='fs-15'/> 
          
          Cart<span className='fw-bold' style={{fontSize:"12px", position:"absolute", top:"5px", left:"65px", color:"black", backgroundColor:"white", padding:"0px 5px", borderRadius:"20px"}}>{cartItems.length>0 ? cartItems.length : null}</span>
          
          </Nav.Link>
          <button className='text-white p-0 m-0 nav-link' style={{position:"relative", left:"80px"}} onClick={() => isLoggedIn? handleLogin() : handleLogout()} >{ isLoggedIn ? 
          <>
          Welcome {handleWelcome(loginUsername)} <FiLogOut className='ms-1'/>
          </>
          : "Login/Signup"}</button>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
    
  );
}