import React from 'react'
import { Row, Col, Container, Card, Button } from "react-bootstrap";
// import Icon from "react-native-ionicons";
import FeatherIcon from "feather-icons-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const ChangeRol = () => {
  
  return (
    <div className="content-wrapper screenHeight">
      <Container fluid>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="font-weight-bold">Mis roles</h1>
              </div>
            </div>
          </div>
        </section>
        <Row className="col-md-4">
          <Col>
            {/* <div>Aquí van las cards con los roles</div> */}
            <Card>
              <Card.Body className='roles'>
                <Col >
                 <FontAwesomeIcon icon="user" />
                  <h3>RAPE</h3>
                  <div className="mar">
                  <FeatherIcon icon="user" />
                  </div>
                  <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }}> Cambiar <FeatherIcon icon="log-out" /></Button>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
    
  )
}
