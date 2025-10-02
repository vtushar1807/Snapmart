import Carousel from 'react-bootstrap/Carousel';
import { Container, Row, Col } from 'react-bootstrap';
import a from '../../../assets/a.jpg'
import b from '../../../assets/b.jpg'
import c from '../../../assets/c.jpg'
import d from '../../../assets/d.jpg'
import e from '../../../assets/e.jpg'
import f from '../../../assets/f.jpg'

import grocery from '../../../assets/grocery.png'
import jewellary from '../../../assets/jewellary.png'
import smartphone from '../../../assets/smartphone.png'
import perfume from '../../../assets/perfume.png'
import shoes from '../../../assets/shoes.png'
import women from '../../../assets/women.png'
import watch from '../../../assets/watch.png'
import men from '../../../assets/men.png'

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { useNavigate } from 'react-router';
import { accessHomepage } from '../../../Redux/productReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeLogInFn,setLogInFn } from '../../../Redux/loginReducer';
import { subscribeUser } from '../../../Redux/productReducer';


const CarouselImage = [a,b,c,d,e,f];

const featuredItems = [
  {
    image:smartphone,
    title:"Tech Essentials",
    des:"Latest Smartphones, gadgets and accessories for your digital lifestyle",
    click:"/smartphones",
  },

  {
    image:jewellary,
    title:"Luxury Jewellary",
    des:"Exquisite pieces that add elegance to every ocacasion",
    click:"/jewellery",
  },

   {
    image:shoes,
    title:"Fashion Forward",
    des:"Step out in style with our premium footwear collection",
    click:"/shoes",
  }

]


export const  Home = ()=>{

  const naviagte = useNavigate();
  const dispatch=useDispatch();
  const currentUser=useSelector(store => store.logInRed.loggedInUser);


  const handleSubscribe = async (currentUser)=>{
      const resultAction = await dispatch(subscribeUser(currentUser));

      if(subscribeUser.fulfilled.match(resultAction)){
        // console.log("User subscribed successfully");
        console.log("Subscription added: ", resultAction.payload.msg);
        
      }

      else if(subscribeUser.rejected.match(resultAction)){
        if(resultAction.payload=="Already Subscribed🚫")
          console.warn("Email is already on the list");
        else
          console.log("Subscription Error: ", resultAction.payload);
      }
  }
  
  

  useEffect(()=>{

    authorizedfn();
    
  }, []);

  const authorizedfn = async ()=>{
    try {
          const resultAction=await dispatch(accessHomepage());

          if(accessHomepage.fulfilled.match(resultAction)){

            if(resultAction.payload.msg=="Authorization Successful"){
            dispatch(removeLogInFn());
            console.log("User is already in");
            }

            else if(resultAction.payload.msg=="User is not authorized" || resultAction.payload.msg=="Authorization Failed"){
              dispatch(setLogInFn());
              console.log("Require Login");
            }
          }

          else if(accessHomepage.rejected.match(resultAction)){
            // dispatch(setLogInFn());
            console.log("Require Login");
          }

    } catch (error) {
      console.log("Auth Error");
    }
  }
  
    return(

        <>
        <Container >

          <Row className='w-100 mt-5 mb-4 img-nav' style={{color:"rgba(40, 11, 104, 1)"}}>
        
        <Col onClick={() => naviagte("/product/category/groceries")}><img className='home-images' src={grocery} alt="" /><br/><p className='home-op-title' style={{marginLeft:"34px"}}>Grocery</p></Col>
        <Col onClick={() => naviagte("/smartphones")}><img className='home-images' src={smartphone} alt="" /><br/><p className='home-op-title' style={{marginLeft:"25px"}}>Smartphones</p></Col>
        <Col onClick={() => naviagte("/jewellery")}><img className='home-images' src={jewellary} alt="" /><br/><p className='home-op-title' style={{marginLeft:"38px"}}>Jewellery</p></Col>
        <Col onClick={() => naviagte("/women")}><img className='home-images' src={women} style={{padding:"10px"}}  alt="" /><br/><p className='home-op-title' style={{marginLeft:"40px"}}>Women</p></Col>
        <Col onClick={() => naviagte("/men")}><img className='home-images' src={men} alt="" /><br/><p className='home-op-title' style={{marginLeft:"53px"}}>Men</p></Col>
        <Col onClick={() => naviagte("watches")}><img className='home-images' src={watch} alt="" /><br/><p className='home-op-title' style={{marginLeft:"40px"}}>Watches</p></Col>
        <Col onClick={() => naviagte("/perfumes")}><img className='home-images' src={perfume} alt="" /><br/><p className='home-op-title' style={{marginLeft:"38px"}}>Perfumes</p></Col>
        <Col onClick={() => naviagte("/shoes")}><img className='home-images' src={shoes} alt="" /><br/><p className='home-op-title' style={{marginLeft:"55px"}}>Shoes</p></Col>
        
          </Row>

        </Container>


         <Carousel ride="carousel" data-bs-theme="dark" indicators={false} interval={3000}>

          {
            CarouselImage && CarouselImage.length>0 ? 

              CarouselImage.map((item) => (
                <Carousel.Item>
              <img className='w-100' src={item} alt="" />
              </Carousel.Item>
              ))

             :

             null
          }
    </Carousel>
    

  <div className='text-center fs-1 dancing-script-moto'><p>It's not just a product, it's an experience.</p></div>

<Container style={{marginTop:"90px"}}>
<Row className='w-100 h-100'>

  <Col sm="6" >
          <h2 className='dark-heading fw-bold'>Why choose SnapMart?</h2>
          <p className='mt-3 p-1 why'>At SnapMart, we believe shopping should be seamless, enjoyable, and rewarding. With over 10,000+ products across multiple
            categories, we bring you the latest trends and timeless classics at unbeatable prices. Our commitment to quality and customer satisfaction
             has made us the preferred choice for millions of shoppers worldwide.</p>
            <br/>
<p className='why'>Experience fast delivery, secure payments, and 24/7 customer support. Join our community and discover why SnapMart is more than just shopping - it's a lifestyle.</p>
  </Col>


  <Col sm="6" className='why-2 text-center'>
          <h2 className='dark-heading mt-3 mb-3'>Our Promise</h2>
          <h6 className='light-heading'>Free Shipping</h6>
          <p className='why'>On orders above $50</p>
           <h6 className='light-heading'>Secure Payments</h6>
          <p className='why'>100% protected transactions</p>
           <h6 className='light-heading'>24/7 Support</h6>
          <p className='why'>Always here to help you</p>
  </Col>
</Row>
</Container>

<Container fluid="0" style={{backgroundColor:"rgb(248, 248, 245)"}}>
<Row className='mt-5 pt-5 featured-div text-center w-100 pb-5'>

  <h1 className='dark-heading fw-bold'>Featured Collections</h1>
  <p className='why'>Discover our handpicked selection of trending products</p>

</Row>
  
  
    <Row className='pb-5 d-flex w-100 text-center' style={{justifyContent:"center"}}>
  {
    featuredItems && featuredItems.length>0 ? 

    featuredItems.map((item) => (

        <Col md="4" className='m-3' style={{width:"380px"}}>
           <Card className='animated-card'>
          <Card.Img style={{height:"150px",width:"175px",marginLeft:"auto", marginRight:"auto", marginTop:"20px"}} variant="top" src={item.image} />
            <Card.Body>
          <Card.Title>{item.title}</Card.Title>
            <Card.Text className='dark-heading'>
          {item.des}
          </Card.Text>
          <Button className='shop-now-btn mb-1' variant="primary" onClick={() => naviagte(item.click)}>Shop Now</Button>
        </Card.Body>
      </Card>
        </Col>
    ))
  
    :

    null
  }
  </Row>

</Container>



<Container fluid="0" className='mt-5'>
<Row className='text-center w-100'>

  <Col className='fw-bold' sm="3"> <p className='fs-1 dark-heading mb-0'>10K+</p><br/><p className='light-heading'>Happy Customers</p></Col>
  <Col className='fw-bold' sm="3"> <p className='fs-1 dark-heading mb-0'>500K+</p><br/><p className='light-heading'>Premium brands</p></Col>
  <Col className='fw-bold' sm="3"> <p className='fs-1 dark-heading mb-0'>50K+</p><br/><p className='light-heading'>Products available</p></Col>
  <Col className='fw-bold' sm="3"> <p className='fs-1 dark-heading mb-0'>90%</p><br/><p className='light-heading'>Satisfaction Rate</p></Col>
</Row>
</Container>


<Container fluid="0" className='contact-div-home pb-5' style={{background: "linear-gradient(to right, #1e0d5c, #a723e7)"}}>
<Row className='mt-4 contact-div-home text-center text-white w-100' style={{background: "linear-gradient(to right, #1e0d5c, #a723e7)"}}>

<p className='fw-bold mt-5 mb-0 fs-2'>Stay Updated with SnapMart</p>
<p className='mt-4'>Get exclusive deals, new arrivalsand shopping tips delivered to your inbox</p>
<div className='d-flex w-100 mt-2' style={{justifyContent:"center"}}><input className='subscribe' placeholder="Enter your email address" type="text" /> <button onClick={() => handleSubscribe(currentUser)} className='sub-btn fw-bold dark-heading'>Subscribe</button></div>

</Row>
</Container>

</>
           
    )
}