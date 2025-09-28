import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useSelector } from 'react-redux';

  const handleActualPrice = (dPrice, dPercent)=>            //Calculating actual price with help of discount percentage and discounted price
    {
        return parseInt(dPrice/(1-(dPercent/100)));
    }

    const handleRating = (rating)=>{                    //Rounding off the rating to one decimal
        return (Math.round(rating*10)/10);
    }

export const CardComp = (props)=>{

   const cartItems = useSelector((store) => store.cartRed.cartItems);      //fetching cart items from store
  const present = cartItems.find((ele) => ele===props.id);             //checking if the current item whose reference is passed in props is already present in cart or not and then rendering 'Add to cart' and 'Remove from cart' button based on that

    return(
        <div className='card-main-div'>
         <Card  style={{border:"none", borderRadius:"180px 10px"}} className='p-2 mt-3 card w-100'>
      <Card.Img onClick={props.onClick} className='item-thumbnail' variant="top" src={props.thumbnail} loading="lazy"/>
      <Card.Body>
        <Card.Title onClick={props.onClick} style={{display:"-webkit-box", WebkitLineClamp:"2", WebkitBoxOrient:"vertical", overflow:"hidden", textOverflow:"ellipsis"}} className='fs-6 fw-bold card-title'>{props.title} | {props.description}</Card.Title>
        <Card.Text onClick={props.onClick}>
         
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star checked"></span>
        <span className="fa fa-star"></span>
        <span className="fa fa-star"></span>
         
         <span style={{color:"green"}} className='fw-bold fs-6 ms-1'>{handleRating(props.rating)}</span><br/>
         <span className='fs-4 fw-bold price'>₹{props.price}</span><span className='text-danger fw-bold fs-6 text-decoration-line-through ms-1'>₹{handleActualPrice(props.price, props.discountPercentage)}</span> <span className='discountSPan'>({props.discountPercentage}% off)</span><br></br>
         <span className='shipping-span'>Exclusive {props.shippingInformation}</span>
        </Card.Text>

        <div className='d-grid'>
         {
            <Button className='fw-bold pt-2 pb-2 border-0 w-25' style={ present ? {backgroundColor:"#baaae0ff", color:"#1e0a4dff"} : {backgroundColor:"#260e5dff", color:"white"}} onClick={present ? (props.removeItemFromCart) : (props.addToCartClick)}>{present ? 'Remove' : 'Add'}</Button>

          }
        </div>

      </Card.Body>
    </Card>
        </div>
    )
}