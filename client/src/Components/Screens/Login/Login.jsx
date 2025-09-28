
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router';

import { useFormik } from 'formik';
import * as Yup from "yup";

import { useDispatch } from 'react-redux';

import { removeLogInFn} from '../../../Redux/loginReducer';
import { IoMdHome } from "react-icons/io";

import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

import AlertFn from '../../Alert/Alert';
import { validateUser } from '../../../Redux/loginReducer';



export const LogIn = ()=>{

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [alert, setAlert]=useState(false);
    const[message, setMessage]=useState("");
    const[variant, setVariant]=useState("");

    const formik = useFormik({
        
        initialValues:{
            email:"",
            password:"",
        },

        validateOnChange:false,

        validationSchema:Yup.object().shape({
            email:Yup.string().required("*Please enter email").email("Enter valid email").min(2,"Username not found !!"),
            password:Yup.string().required("*Please enter password").min(8, "*Password not Found !!"),
        }),

        

        onSubmit:async(values)=>{

          const resultAction = await dispatch(validateUser(values));

          if(validateUser.fulfilled.match(resultAction)){

              if(resultAction.payload.msg=="Login Successful"){
              dispatch(removeLogInFn());
              setMessage("Login Successful");
              setVariant("success");
              setAlert(true);
              setTimeout(()=>setAlert(false), 3000);
              setTimeout(()=>navigate("/"), 2000);
              }

              else if(resultAction.payload.msg=="Credentials are required"){
                setMessage("Credentials are required");
                setVariant("danger");
                setAlert(true);
                setTimeout(()=>setAlert(false), 2000);
              }

              else if(resultAction.payload.msg=="Invalid Credentials"){
                setMessage("Invalid Credentials ⚠️");
                setVariant("danger");
                setAlert(true);
                setTimeout(()=>setAlert(false), 2000);
              }
            }

          else if(validateUser.rejected.match(resultAction)){

            setMessage(resultAction.payload.msg);             
            setVariant("danger");
            setAlert(true);
            setTimeout(()=>setAlert(false), 2000);

          }

          // const signedUpUsers = JSON.parse(window.localStorage.getItem("SignedUpUsers"));
            

          // if(signedUpUsers && signedUpUsers.length>0){
          //   const userExist = signedUpUsers.find((item) => item.email===values.email);
          

          //   if(userExist){
          //   const successLogIn = signedUpUsers.find((item) => (item.email===values.email && item.password===values.password));

          //   if(!successLogIn){
          //       setMessage("Username and Password not matched⚠️");
          //       setVariant("danger");
          //       setAlert(true);
          //       setTimeout(()=>setAlert(false), 2000);
          //   }

          //   else{
          //     dispatch(removeLogInFn());
          //     setMessage("Login Successful");
          //     setVariant("success");
          //     setAlert(true);
          //     setTimeout(()=>setAlert(false), 3000);
          //     setTimeout(()=>navigate("/"), 2000);
          //   }
            
          //   }
          //   else{
          //   setMessage("User don't exist");             // If there's a user with entered email but password didn't match
          //   setVariant("danger");
          //    setAlert(true);
          //     setTimeout(()=>setAlert(false), 2000);
          //   }
          // }

          //   else{
          //   setMessage("User don't exist");             // If user with entered email doesn't exists
          //   setVariant("danger");
          //    setAlert(true);
          //     setTimeout(()=>setAlert(false), 2000);
            
          //   }
            console.log("Form Submitted");
        }
    })

    return (

        <>
        
 <Modal show={true} onHide={true} className='modal-main'>

        {
          alert ? <AlertFn msg={message} variant={variant}/>:null
        }
      <form onSubmit={formik.handleSubmit}>
        <Modal.Header >
          <Modal.Title className='modal-title fs-2'>Welcome to SnapMart <FaShoppingCart className='text-success'/></Modal.Title>
        </Modal.Header>

        <Modal.Body className='modal-body'>
       
                <div className='w-100 text-center fw-bold fs-4'><p>Log in here</p></div>

           <div><label htmlFor="emailId">Email:</label>
          <input placeholder="Enter email" type="email" name="email" id="emailId" style={formik.errors.email && formik.touched.email ? {border:"2px solid red"}: null} {...formik.getFieldProps('email')}/>
            {
                formik.touched.email && formik.errors.email ? <span className='error-span'>{formik.errors.email}</span> : null
            }
            </div><br/>

        <div>
          <label  htmlFor="passwordId">Password:</label>
          <input placeholder="Enter password" type="password" name="password" id="passwordId" style={formik.errors.password && formik.touched.password ? {border:"2px solid red"}: null} {...formik.getFieldProps('password')}/><br/>
           {
                formik.touched.password && formik.errors.password ? <span className='error-span'>{formik.errors.password}</span> : null
            }
          </div>
          <div className='already-user-div'>New user? <button type="button" onClick={()=> navigate("/signup")} className='login-btn' >Sign Up</button></div>
        
 
        </Modal.Body>

        <Modal.Footer>
          <Link className='mt-4' to="/" style={{textDecoration:"none", fontSize:"14px", marginRight:"163px",display:"flex", gap:"1px", color: "#6c3dc9ff"}}><IoMdHome style={{fontSize:"20px"}}/> <p>Go to home</p> </Link>
          <Button type="submit" className='signup-btn' >Log in</Button>
          
        </Modal.Footer>
        </form>
    </Modal>
        
        </>
    )
}