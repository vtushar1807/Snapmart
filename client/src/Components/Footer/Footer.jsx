import { Container, Row, Col } from "react-bootstrap"


export const Footer = ()=>{




    return(
        <>

          <Container fluid="0" className="pt-5" style={{background: "radial-gradient(circle, rgb(255, 255, 255) 0%, rgb(248, 248, 250) 100%)"}}>

            <Row className="w-100 mt-2" style={{paddingLeft:"200px"}}>

                <Col sm="4">
                <h4 className="dark-heading fw-bold">SnapMart</h4>
                <p className="why mt-4">Your trusted shopping destination for quality products, ubbeatable practices 
                    and exceptional service. Shop with confidence, shop with SnapMart.
                </p>
                
                </Col>


                <Col sm="2" className="pb-5">
                <h5 className="dark-heading">Quick Links</h5>
                <p className="why mt-3 footer">About Us</p>
                <p className="why footer">Contact</p>
                <p className="why footer">FAQ</p>
                <p className="why footer">Return</p>
                
                </Col>


                <Col sm="2">

                <h5 className="dark-heading">Categories</h5>
                <p className="why mt-3 footer">Electronics</p>
                <p className="why footer">Fasion</p>
                <p className="why footer">Home and Living</p>
                <p className="why footer">Beauty</p>
                
                </Col>


                <Col sm="3">
                <h5 className="dark-heading">Follow Us</h5>
                <p className="why footer mt-4">© 2025 SnapMart. All rights reserved</p>
                
                </Col>

            </Row>


          </Container>

        </>
    )
}