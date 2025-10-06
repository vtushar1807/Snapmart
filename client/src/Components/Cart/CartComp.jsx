import { Container,Row,Col } from "react-bootstrap"
import Button from "react-bootstrap/Button"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { removeItemFromCart } from "../../Redux/cartReducer"
import { useEffect, useState } from "react"
import { emptyCart } from "../../Redux/cartReducer"
import { ClipLoaderFn } from "../Spinner/Spinners"
import { MdOutlineAdd } from "react-icons/md";
import { GrFormSubtract } from "react-icons/gr";
import { fetchCartItems } from "../../Redux/cartReducer"

export const CartComp = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cartRed.cartItems);

    const [cartProducts, setCartProducts]=useState([]);
    const [totalQuantity, setTotalQuantity]=useState(0);
    const [totalAmount, setTotalAmount]=useState(0);
    const[loading, setLoading]=useState(true);

    const isLoggedIn = useSelector((store) => store.logInRed.isLogin);

    useEffect(()=>{
        isLoggedIn ? null : dispatch(emptyCart());
    },[])


    useEffect(()=>{
        setTotalQuantity(cartItems.length);
        setTotalAmount(cartProducts.reduce((a, item) => (a+item.price),0));
    },[cartItems,cartProducts])

    useEffect(()=>{
            getPost(cartItems);
    }, [cartItems]);

    useEffect(() => {
        !isLoggedIn?navigate("/login"):null
    }, [isLoggedIn])

   
    const getPost = async(cartItems)=>{

        try{

            const resultAction = await dispatch(fetchCartItems(cartItems));
            if(fetchCartItems.fulfilled.match(resultAction))
            {
                setCartProducts(resultAction.payload.product);
            }
                

            else if(fetchCartItems.rejected.match(resultAction))
                console.log(resultAction.payload.msg);
        }
        catch(err){
            console.log("Error", err);
            
        }
        finally{
            setLoading(false);
        }

    }



    return(
        <>
    {
    cartItems && cartItems.length>0 ?           //If items are available in cart only then individual divs will be created with product details
    
    <>
    <Container style={{height:"100vh"}} fluid className="main-detail ps-5">
    <Row className="w-100">
       
            <Col md="8">
             <h2 className="pb-3 pt-3 dark-heading">Shopping Cart</h2>
            {
              loading ? <ClipLoaderFn loading={loading} mTop="10%"/> : null
            }
                <div style={{maxHeight:"85vh", overflowY:"auto", overflowX:"hidden"}}>
                {cartProducts.map((items) => (
                    
                    <div className="bg-white cart-items mt-2" key={items.id}>

                    <div onClick={() => navigate(`/product/detail/${items.id}`)}>
                        <img style={{height:"100px"}}  src={items.thumbnail} alt="" />
                    </div>

                    <div className="ms-5 p-2 w-100 me-5">
                        <span style={{color:"#231159ff"}} onClick={()=>navigate(`/product/${items.id}`)} className="fw-bold">{items.title}</span><br/>
                        <span onClick={()=>navigate(`/product/detail/${items.id}`)} >{items.brand ? items.brand : "Exclusive"}</span> <span style={{float:"right"}}><img onClick={() => dispatch(removeItemFromCart(items))} height="21px" src="https://img.icons8.com/?size=100&id=64k1WPeHn58b&format=png&color=FA5252" alt="" /></span><span style={{float:"right", fontWeight:"bold", marginRight:"20px"}}><MdOutlineAdd/><span style={{border:"2px solid green", padding:"1px 6px", margin:"4px", fontSize:"14px"}}>{2}</span><GrFormSubtract/></span><br/>
                        <span onClick={()=>navigate(`/product/detail/${items.id}`)} className="text-danger fw-bold">₹{items.price}</span>
                        <span onClick={()=>navigate(`/product/detail/${items.id}`)} style={{fontSize:"10px", padding:"1px 6px 3px", borderRadius:"7px"}} className="bg-warning fw-bold">{items.discountPercentage}% OFF</span><br/>
                        <span onClick={()=>navigate(`/product/detail/${items.id}`)} style={{fontSize:"10px"}} className="text-secondary">{items.availabilityStatus}</span>
                    </div>
                   
                    </div>
                ))}
                </div>
            
             </Col>


            <Col md="4" className="mt-2  ps-5">

            <div className="bg-white p-3 subtotal-cart">
                <span className="fw-bold">Subtotal </span><span className="text-danger">({totalQuantity} Items): </span><span className="text-success fw-bold">₹{totalAmount.toFixed(2)}</span>
                <div className="d-grid mt-3">
                <Button className="fw-bold proceed-btn" >Proceed to Checkout</Button>
                </div>
            </div>
            
            </Col>

        </Row>
        </Container>
    </>
    
    : 

    // if there's no item in cart then this error page will appear
    <Container style={{fontFamily:"cursive", textShadow:"1px 1px black",height:"53vh" }} fluid className="text-center mt-0 p-3">            
    <Row style={{height:"250px"}} className="w-100">
        
            <span style={{marginTop:"100px", color:"#53339eff"}}  className="fs-3">🛒 Cart is empty :(</span>
    </Row>
    </Container>
}
    </>
)}