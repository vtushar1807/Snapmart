import { useEffect, useState } from "react";
import { ClipLoaderFn } from "../../Spinner/Spinners";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Container, Row, Col } from "react-bootstrap";
import { CardComp } from "../../Card/CardComp";
import { setWomenFn, fetchProducts } from "../../../Redux/productReducer";
import { fetchAPIData } from "../../../Networking/getAPIdata";
import { removeItemFromCart, addItemToCart } from "../../../Redux/cartReducer";

export const Women = () => {

  const [loading, setLoading] = useState(true);

  const womenItems = useSelector((store) => store.productRed.womenArr);
  const isLoggedIn = useSelector((store) => store.logInRed.isLogin);

  const navigate = useNavigate();

 
  const dispatch = useDispatch();

  useEffect(() => {
    if (womenItems.length === 0) {
      setTimeout(() => {
        getPost();
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    !isLoggedIn ? navigate("/login") : null;
  }, [isLoggedIn]);

  const getPost = async () => {
    
        try{
            const resultAction = await dispatch(fetchProducts("womens-dresses"));

            if(fetchProducts.fulfilled.match(resultAction))
            {
                dispatch(setWomenFn(resultAction.payload));
            }

            else if(fetchProducts.rejected.match(resultAction))
            {
                console.log("Error 404! Data not Found: ", resultAction.msg);
            }
                   
            } catch (err) {
      console.log("Error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className="fs-1 mt-3 ms-5 pb-3 pt-2 product-page-title">Women</h1>
      {loading ? <ClipLoaderFn loading={loading} mTop="8%" mBottom="7%" /> : null}
      <Container>
        <Row>
          {womenItems && womenItems.length > 0
            ? womenItems.map((item) => (
                <>
                  <Col sm="4">
                    <CardComp onClick={() => navigate(`/product/${item.id}`)} removeItemFromCart={() => { dispatch(removeItemFromCart(item)); }} addToCartClick={() => { dispatch(addItemToCart(item)); }} id={item.id} thumbnail={item.thumbnail} title={item.title} description={item.description} rating={item.rating} price={item.price} discountPercentage={item.discountPercentage} shippingInformation={item.shippingInformation}/>
                  </Col>
                </>
              ))
            : null}
        </Row>
      </Container>
    </>
  );
};
