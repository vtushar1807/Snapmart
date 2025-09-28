import { useEffect,useState } from 'react';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from 'react-router';
import { fetchAPIDetail } from '../../Networking/getAPIdata';
import { useDispatch, useSelector } from 'react-redux';
import { addProductDetail } from '../../Redux/productDetailReducer';
import { ClipLoaderFn } from '../Spinner/Spinners';


import { Container, Row, Col } from 'react-bootstrap';
import { cleanProductDetail } from '../../Redux/productDetailReducer';

export const ProductDetail = ()=>{

    const item = useSelector((store) => store.productDetailRed.itemDetail);             //Getting the detail of the product on which user clicked
    const params = useParams();                     //For reading the variable passed dynamically in url
    const dispatch = useDispatch();

    const[loading, setLoading]=useState(true);

    useEffect(()=>{

        setTimeout(()=>{
            fetchDetail();
        }, 2000)

        return ()=> dispatch(cleanProductDetail());

    }, [])


     const handleActualPrice = (dPrice, dPercent)=>
    {
        const num = parseFloat(dPrice/(1-(dPercent/100)));
            return num.toFixed(2);
    }

    const fetchDetail = async()=>{

        try{

        const result = await fetchAPIDetail(params.id);          //Fetching the detail of the product based on its id, read from url with the help of useParams()
        if(result.status==="Success"){
        dispatch(addProductDetail(result.data.post));       //Setting product detail into store using addProductDetail reducer
        console.log(result.data.post);
        
        }

        }
        catch(arr)
        {
            console.log("Error", err)
        }
        finally{
            setLoading(false);
        }

    }

    
    return(
        <>
        {loading ? <ClipLoaderFn loading={loading} mTop="11%" mBottom="11%" /> : null}
        {/* {console.log(item)} */}
        
        {item && Object.keys(item).length>0 ? 


        <>
        <Container className='main-detail' fluid="0" >
        <Row className="main-detail d-flex w-100" key={item.id}>
            

        <Col md="6" className="left-detail w-50">
    {
        item.images && item.images.length===1 ?
    
        <Card className='w-70 m-4'>
        <Card.Img className='h-75' loading='lazy' variant="top" src={item.images} />
        </Card>

    :

    <Carousel className='m4' data-bs-theme="dark" indicators={false} interval={2000}>
      
    {
        item.images.map((item) => (
            <Carousel.Item className='bg-white mt-4' key={item.id}>
                <img style={{height:"700px"}} loading='lazy'  src={item} alt="" />
            </Carousel.Item>

        ))
    }
    </Carousel>
    }
        

        </Col>

        <Col md="6" className="right-detail w-40 mt-4">
            <h4 className='fw-bold' style={{color:"#1e0c60"}}>{item.title}</h4>
            <p>{item.brand}</p>

            <span style={{borderRadius:"7px", fontSize:"11px",padding:"1px 6px 3px"}} className='text-white bg-success'>{item.availabilityStatus}</span>
            <span style={{borderRadius:"7px", fontSize:"11px", padding:"1px 6px 3px"}} className='text-white bg-primary  '>{item.category}</span>
            
            <div style={{whiteSpace:"wrap"}} className='w-100 mt-3'>
                {item.description}
            </div>

        <div className='mt-3'>
            <span className='text-success fs-4 mt-4 fw-bold'>₹{item.price}</span>
            <span className='text-danger text-decoration-line-through fw-bold'>₹{handleActualPrice(item.price, item.discountPercentage)}</span>
            <span style={{borderRadius:"5px", backgroundColor:"#442d98ff"}} className='text-white pt-1 pb-1 ps-2 pe-2 fw-bold'>{item.discountPercentage}% OFF</span>
        </div>

            <div className='bg-white mt-4 p-2'><h6 className='fw-bold'>Rating: </h6>
            
              <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
            
            <span className='text-success fw-bold'>{item.rating}</span></div>
             <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Stock: </h6>{item.stock}</div>
        <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Dimensions: </h6>{item.dimensions.width} x {item.dimensions.height} x {item.dimensions.depth}</div>
        <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Weight: </h6>{item.weight}</div>
    <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Shipping: </h6>{item.shippingInformation}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Warranty: </h6>{item.warrantyInformation}</div>
        <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Return Policy: </h6>{item.returnPolicy}</div>
    <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>SKU: </h6>{item.sku}</div>
            <div className='bg-white mt-1 p-2'><h6 className='fw-bold'>Tags: </h6>
            
            {item.tags.map((ele) => (
                
                
                <span style={{borderRadius:"7px", fontSize:"11px",padding:"1px 6px 2px"}} className='fw-bold bg-warning p-1'>{ele}</span>
                
            ))}
            
            </div>
        </Col>

        </Row>


        <div className='p-3'>
            <h3 className='m-3' style={{color:"#1e0c60"}}>🗣️Customer Reviews</h3>
           {
            item.reviews.map((ele) => (
                <div className='bg-white p-4 m-3 comment-div'>
                    <span className='fw-bold'>⭐{ele.rating} - {ele.reviewerName}</span>  <span className='float-detail'>{ele.date.slice(0,10)} | {ele.reviewerEmail}</span><br/>
                    <span className='product-comment'>{ele.comment}</span>

                </div>
            ))
           }

        </div>
        
        </Container>
        
        </>
        :null
        }
        
        </>
    )
}