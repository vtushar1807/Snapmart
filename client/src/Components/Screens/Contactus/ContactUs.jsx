import { Button } from "react-bootstrap"
import { FaShoppingCart } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

export const ContactUs = ()=>{

    const formik = useFormik({
        initialValues:{
            fname:"",
            lname:"",
            email:"",
            phone:"",
            message:"",
        },

        validationSchema:Yup.object().shape({
            fname:Yup.string().required("Required").min(2, "First name is too short").max(8, "First name is too long"),
            lname:Yup.string().required("Required").min(2, "Last name is too short").max(8, "First name is too long"),
            email:Yup.string().required("Required").email("Invalid email").min(2, "Email is too short").max(8, "First name is too long"),
            phone:Yup.string().required("Required").matches(/^[0-9]+$/).min(2, "Phone is too short").max(8, "First name is too long"),
            message:Yup.string().required("Required"),
        }),

        validateOnChange:false,

        onSubmit:(values)=>{
            console.log("Form Submitted");
        }
    })

    return (
        <>
    
        <div className="contact-main">

            <div class="inner-feedback-div">
                <h2 className="text-center p-3 feedback-h" style={{fontFamily:"TimesNewRoman"}}>Contact @SnapMart 24/7 <FaShoppingCart className="text-success"/></h2>
                    
                <form onSubmit={formik.handleSubmit}>

                    <div className="feedback-input mt-3 mb-3">
                    <div>
                    <label htmlFor="fnameID">First Name: </label><br />
                    <input type="text" id="fnameID" placeholder="Enter first name" name="fname" {...formik.getFieldProps('fname')}/><br/>
                    {
                        formik.touched.fname && formik.errors.fname ? <span className="error-span">{formik.errors.fname}</span>:null
                    }
                    </div>
                    
                    <div>
                    <label htmlFor="lnameID">Last Name: </label><br />
                    <input type="text" id="lnameID" placeholder="Enter last name" name="lname" {...formik.getFieldProps('lname')}/><br/>
                      {
                        formik.touched.lname && formik.errors.lname ? <span className="error-span">{formik.errors.lname}</span>:null
                    }
                    </div>
                    </div>

                    <div className="feedback-input mt-3 mb-3">
                    <div>
                    <label htmlFor="emailID" >Email: </label><br />
                    <input type="text" id="emailID" placeholder="Enter email" name="email" {...formik.getFieldProps('email')}/><br/>
                      {
                        formik.touched.email && formik.errors.email ? <span className="error-span">{formik.errors.email}</span>:null
                    }
                    </div>

                    <div>
                    <label htmlFor="phoneID">Phone no: </label><br />
                    <input type="text" id="phoneID" placeholder="Enter phone no" name="phone" {...formik.getFieldProps('phone')}/><br/>
                      {
                        formik.touched.phone && formik.errors.phone ? <span className="error-span">{formik.errors.phone}</span>:null
                    }
                    </div>
                    </div>

                    

                    <div>
                    <textarea className="comment mt-2" id="" rows="8" cols="75" name="message" placeholder="Type your message here" {...formik.getFieldProps('message')}></textarea><br/>
                      {
                        formik.touched.message && formik.errors.message ? <span className="error-span">{formik.errors.message}</span>:null
                    }
                    </div>

                    <Button className="mt-2" variant="danger" style={{float:"right"}} type="submit">Submit Feedback →</Button>
                </form>
                
            </div>
            
        </div>
        </>
    )
}