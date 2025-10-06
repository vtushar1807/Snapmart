
// export const fetchAPIData = async(cat)=>{

//         const url = `http://localhost:1001/product/category/${cat}`;

//         try{
//             const response = await fetch(url, {method:"GET"});
//             // const result = await response.json();

//             if(response)
//             {   
//                 return({
//                     status:"Success",
//                     data:{
//                         post:response.data.post,
//                     }
//                 })
//             }
//         }
//         catch(err)
//         {
//             return({
//                 status:"Failed",
//                 data:err,
//             })

//         }
// }


// export const fetchAPIDetail = async(id)=>{

//         const url = `https://dummyjson.com/products/${id}`;

//         try{
//             const response = await fetch(url, {method:"GET"});
//             const result = await response.json();    

//                 return({
//                     status:"Success",
//                     data:{
//                         post:result,
//                     }
//                 })
            
//         }
//         catch(err)
//         {
//             return({
//                 status:"Failed",
//                 data:err,
//             })

//         }
// }

// export const fetchCartItems = async (data)=>{

//     try{
//          const result = await Promise.all((data).map(async (id)=>{

//             const result = await fetch(`https://dummyjson.com/products/${id}`, {method:"GET"});
//             return await result.json();
//     }))

//         return({
//             status:"Success",
//             data:{
//                 post:result,
//             }
//         })

//     }
//     catch(err)
//     {
//         return({
//             status:"Failed",
//             data:err,
//         })    
//     }
// }