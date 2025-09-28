import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router';

import { useFormik } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { removeSignupFn } from '../../../Redux/signupReducer';
import { useState } from 'react';
import { IoMdHome } from "react-icons/io";

import AlertFn from '../../Alert/Alert';
import { createNewuser } from '../../../Redux/signupReducer';


export const SignUp = (props)=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alert,  setAlert]=useState(false);
    const [message,  setMessage]=useState("");

    const formik = useFormik({
        
        initialValues:{
            username:"",
            email:"",
            password:"",
            terms:false,
        },

        validateOnChange:false,

        validationSchema:Yup.object().shape({
            username:Yup.string().required("*Please enter username").min(2,"*Username is too short").max(10, "*Username is too long"),
            email:Yup.string().required("*Please enter email").email("*Please enter valid email").max(20, "*Email is too long"),
            password:Yup.string().required("*Please enter password").min(8, "*Password must be 8-15 characters long").max(15, "*Password is too long"),
            terms:Yup.bool().required().oneOf([true], "*You must accept the terms and conditions"),
        }),

    
        onSubmit:async(values)=>{

          const resultAction = await dispatch(createNewuser(values));

          if(createNewuser.fulfilled.match(resultAction)){

              if(resultAction.payload.msg=="New User Created"){
                setAlert(true);
                setMessage("Sign Up successful");
                // dispatch(removeSignupFn(values));
                setTimeout(()=>{
                  setAlert(false);
                }, 3000)
                setTimeout(()=>{
                  navigate("/login");
                }, 2000)
              }
              
              else if(resultAction.payload.msg=="User already exists"){
                setAlert(true);
              setMessage("Email already registered 🚫");
              setTimeout(()=>{
                setAlert(false);
              }, 2000)
              }
          }

          else if(createNewuser.rejected.match(resultAction)){

              setAlert(true);
              setMessage("Internal Server Error 🚫");
              setTimeout(()=>{
                setAlert(false);
              }, 2000)
            console.log("Error Registering User");
          } 
            console.log("Form Submitted");
            
        }
    })


    return (

        <>
        
 <Modal show={true} className='modal-main'>
  {
    alert ? <AlertFn msg={message}/> : null
  }
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header >
          <Modal.Title className='modal-title fs-2'>Welcome to SnapMart <FaShoppingCart className='text-success'/></Modal.Title>
        </Modal.Header>

        <Modal.Body className='modal-body'>
       
                <div className='w-100 text-center fw-bold fs-4'><p>New user? Register here</p></div>


           <div><label htmlFor="usernameId">Username:</label>
          <input placeholder="Enter username" type="text" name="username" id="usernameId" {...formik.getFieldProps('username')}/>
            {
                formik.touched.username && formik.errors.username ? <span className='error-span'>{formik.errors.username}</span> : null
            }
            </div><br/>


            <div>
          <label htmlFor="emailId">Email: </label>
          <input placeholder="Enter email" type="email" name="email" id="emailId" {...formik.getFieldProps('email')}/>
           {
                formik.touched.email && formik.errors.email ? <span className='error-span'>{formik.errors.email}</span> : null
            }
            </div><br/>


        <div>
          <label  htmlFor="passwordId">Password:</label>
          <input placeholder="Enter password" type="password" name="password" id="passwordId" {...formik.getFieldProps('password')}/><br/>
           {
                formik.touched.password && formik.errors.password ? <span className='error-span'>{formik.errors.password}</span> : null
            }
          </div>
          <div className='already-user-div'>already a user? <button type="button" className='fw-bold text-white login-btn' onClick={()=> navigate("/login")}>Login</button></div>

        <div className='mt-5 terms-div'>  <input type="checkbox" name="terms" id="termsId" {...formik.getFieldProps('terms')} />
          <label id="terms-label" htmlFor="termsId">Agree terms & conditions</label><br/>
          {
                formik.touched.terms && formik.errors.terms ? <span className='error-span'>{formik.errors.terms}</span> : null
            }
        </div>
        
 
        </Modal.Body>

        <Modal.Footer>
          <Link className='mt-4' to="/" style={{textDecoration:"none", fontSize:"14px", marginRight:"152px",display:"flex", gap:"1px", color: "#6c3dc9ff"}}><IoMdHome style={{fontSize:"20px"}}/> <p>Go to home</p> </Link>
          <Button type="submit"  className='signup-btn' variant='success' >Sign Up</Button>

        </Modal.Footer>
        </form>
      
    </Modal>
    
        
        </>
    )
}