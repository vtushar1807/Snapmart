import { useEffect, useState } from "react";
import { ClipLoaderFn } from "../../Spinner/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { Container,Row,Col } from "react-bootstrap";
import { CardComp } from "../../Card/CardComp";

import { fetchProducts, setGroceryFn } from "../../../Redux/productReducer";
import { fetchAPIData } from "../../../Networking/getAPIdata";
import { removeItemFromCart, addItemToCart } from "../../../Redux/cartReducer";


export const Grocery = ()=>{

    const [loading, setLoading]=useState(true);

    const groceryItems = useSelector((store) => store.productRed.groceryArr);
    const isLoggedIn = useSelector((store) => store.logInRed.isLogin);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{

        if(groceryItems.length===0){
        setTimeout(()=>{
            getPost();
        }, 1000);
    }
     else{
            setLoading(false);
        }
    },[]);

    useEffect(() => {

    !isLoggedIn?navigate("/login"):null
    
    }, [isLoggedIn])

    
    const getPost = async ()=>{

        try{

            const resultAction = await dispatch(fetchProducts("groceries"));

            if(fetchProducts.fulfilled.match(resultAction))
            {
                dispatch(setGroceryFn(resultAction.payload));
            }

            else if(fetchProducts.rejected.match(resultAction)){
                console.log("Error 404! Data not Found");
            }
        }
        catch(err)
        {
            console.log("Error", err);
        }
        finally{
                setLoading(false);
        }
        
    }


    return (

            <>

        <h1 className="fs-1 mt-3 ms-5 pb-3 pt-2 product-page-title">Grocery</h1>
        {
            loading ? <ClipLoaderFn loading={loading} mTop="8%" mBottom="7%"/> : null
        }
        <Container>

            <Row>
            {
                groceryItems && groceryItems.length>0 ? 
                
                
                    groceryItems.map((item) => (
                        <>
                        <Col sm="4" >
                            <CardComp onClick={() => navigate(`/product/${item.id}`)} removeItemFromCart={()=> {dispatch(removeItemFromCart(item))}} addToCartClick={()=> {dispatch(addItemToCart(item))}} id={item.id} thumbnail={item.thumbnail} title={item.title} description={item.description} rating={item.rating}  price={item.price}  discountPercentage={item.discountPercentage} shippingInformation={item.shippingInformation}/>
                        </Col>
                        </>
                    ))
                
                
                :null
            }

            </Row>
        </Container>
        </>
        
    )
}