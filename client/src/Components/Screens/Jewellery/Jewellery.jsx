import { useEffect, useState } from "react";
import { ClipLoaderFn } from "../../Spinner/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { CardComp } from "../../Card/CardComp";
import { setJewelleryFn, fetchProducts } from "../../../Redux/productReducer";
import { fetchAPIData } from "../../../Networking/getAPIdata";
import { removeItemFromCart, addItemToCart } from "../../../Redux/cartReducer";

export const Jewellery = () => {
  const [loading, setLoading] = useState(true);
  // const [loadingMore, setLoadingMore] = useState(false);

  const jewelleryItems = useSelector((store) => store.productRed.jewelleryArr);

  const isLoggedIn = useSelector((store) => store.logInRed.isLogin);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(()=>{

      if(jewelleryItems.length===0){
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

  // const handleScroll = ()=>{

  //     const {scrollTop, clientHeight, scrollHeight} = docujewellaryt.docujewellarytElejewellaryt;

  //     if(scrollTop + clientHeight >= scrollHeight)
  //     {
  //         dispatch(setjewellarySkip());
  //         setLoadingMore(true);
  //     }
  // }

  // useEffect(()=>{

  //     window.addEventListener("scroll", handleScroll);

  //     return ()=> window.removeEventListener("scroll", handleScroll);
  // }, [])

  const getPost = async () => {
    try {
      const resultAction = await dispatch(fetchProducts("womens-jewellery"));

      if (fetchProducts.fulfilled.match(resultAction)) {
        dispatch(setJewelleryFn(resultAction.payload));
      }
      
      else if(fetchProducts.rejected.match(resultAction)){
        console.log("Error 404! Data not Found");
      }
    } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
      // setLoadingMore(false);
    }
  };

  return(
    <>
      <h1 className="fs-1 mt-3 ms-5 pb-3 pt-2 product-page-title">Jewellery</h1>
      {loading ? <ClipLoaderFn loading={loading} mTop="8%" mBottom="7%" /> : null}
      <Container>
        <Row>
          {jewelleryItems && jewelleryItems.length > 0 ?
           jewelleryItems.map((item) => (
                <>
                  <Col sm="4">
                    <CardComp onClick={() => navigate(`/product/${item.id}`)} removeItemFromCart={() => { dispatch(removeItemFromCart(item)); }} addToCartClick={() => { dispatch(addItemToCart(item)); }} id={item.id} thumbnail={item.thumbnail} title={item.title} description={item.description} rating={item.rating} price={item.price} discountPercentage={item.discountPercentage} shippingInformation={item.shippingInformation}
                    />
                  </Col>
                </>
              ))
            : null}
        </Row>
      </Container>
      {/* {loadingMore ? <ClipLoaderFn loading={loadingMore} mTop="10%" /> : null} */}
    </>
  );
};
