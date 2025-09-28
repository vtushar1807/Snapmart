import { useEffect, useState } from "react";
import { ClipLoaderFn } from "../../Spinner/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container,Row,Col } from "react-bootstrap";
import { CardComp } from "../../Card/CardComp";
import { setSmartphonesFn } from "../../../Redux/productReducer";
import { fetchAPIData } from "../../../Networking/getAPIdata";
import { removeItemFromCart, addItemToCart } from "../../../Redux/cartReducer";


export const Smartphones = ()=>{

    const [loading, setLoading]=useState(true);
    
    const smartphonesItems = useSelector((store) => store.productRed.smartphonesArr);
    const isLoggedIn = useSelector((store) => store.logInRed.isLogin);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{

        if(smartphonesItems.length===0){
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

            const result = await fetchAPIData("smartphones");

            if(result.status==="Success")
            {
                dispatch(setSmartphonesFn(result.data.post));
            }

            else{
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

        <h1 className="fs-1 mt-3 ms-5 pb-3 pt-2 product-page-title">Smartphones</h1>
        {
            loading ? <ClipLoaderFn loading={loading} mTop="8%" mBottom="7%"/> : null
        }
        <Container>

            <Row>
            {
                smartphonesItems && smartphonesItems.length>0 ? 
                
                    smartphonesItems.map((item) => (
                        <>
                        <Col sm="4" >
                            <CardComp onClick={() => navigate(`/product/${item.id}`)} removeItemFromCart={() => dispatch(removeItemFromCart(item))} addToCartClick={() => dispatch(addItemToCart(item))} id={item.id} thumbnail={item.thumbnail} title={item.title} description={item.description} rating={item.rating}  price={item.price}  discountPercentage={item.discountPercentage} shippingInformation={item.shippingInformation}/>
                        </Col>
                        </>
                    ))
                :
                null
            }

            </Row>
        </Container>
        </>
        
    )
}