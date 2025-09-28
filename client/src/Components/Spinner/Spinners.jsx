import { ClipLoader } from "react-spinners";

export const ClipLoaderFn = (props)=>{

    return(

        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
         <ClipLoader
        color="rgb(43, 6,125)"
        loading={props.loading}
        cssOverride={{
          marginTop:props.mTop,
          marginBottom:props.mBottom,
        }}
        size={80}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
        
        </div>
    )
}