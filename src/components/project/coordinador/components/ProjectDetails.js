import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Card, Collapse } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import axios from "../../../../shared/plugins/axios";
import DataTable from "react-data-table-component";

import { CustomLoader } from "../../../../shared/components/CustomLoader"

export const ProjectDetails = ({
  isOpenDetails,
  handleClose,
  id,
  dateStart,
  dateEnd,
  cotizacion,
  description,
  months,
  name,
  numberBeca,
  client,
  project,
  statusProject,
  priceClient,
  priority,
  personTeam,
  status
}) => {

  const [values, setValues] = useState({
    id: id,
    dateStart: dateStart,
    dateEnd: dateEnd,
    cotizacion: cotizacion,
    months: months,
    name: name,
    status: status,
    description: description,
    numberBeca: numberBeca,
    client: client,
    project: project,
    statusProject: statusProject,
    priceClient: priceClient,
    priority: priority,
    personTeam: personTeam,
    status: status
  });

  const [isOpenData, setIsOpenData] = useState(true);
  const [isOpenClient, setIsOpenClient] = useState(true);
  const [isOpenCotizacion, setIsOpenCotizacion] = useState(true);
  const [isOpenTeam, setIsOpenTeam] = useState(true);
  const [isOpenProg, setIsOpenProg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  }


  const handleCloseForm = () => {
    handleClose(false);
    setValues({});
  };

  useEffect(() => {
    setValues({
      id: id,
      dateStart: dateStart,
      dateEnd: dateEnd,
      cotizacion: cotizacion,
      months: months,
      name: name,
      status: status,
      description: description,
      numberBeca: numberBeca,
      client: client,
      project: project,
      statusProject: statusProject,
      priceClient: priceClient,
      priority: priority,
      personTeam: personTeam,
      status: status
    });
  }, [isOpenDetails]);

  const columnsProg = [
    {
      name: <h6 className="text-center">Nombre</h6>,
      cell: (row) => <div className="txt4">{row.name}</div>,
    },
    {
      name: <h6>Rol</h6>,
      cell: (row) => <div className="txt4">{row.profession}</div>,
    }
  ]

  return (
    <>
      <Modal show={isOpenDetails} onHide={handleCloseForm} size="lg">
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Detalles del proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* DATOS DEL PROYECTO */}
            <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenData(!isOpenData)}
                aria-controls="example-collapse-text"
                aria-expanded={isOpenData}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Datos del proyecto</Col>
                  <Col className="text-end">
                    <Col>
                      {isOpenData ? (
                        <FeatherIcon icon="minus"
                          color="grey" />
                      ) : (
                        <FeatherIcon icon="plus"
                          color="grey" />
                      )}
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={isOpenData}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Proyecto anterior</Form.Label>
                        <Form.Control name="project" value={values.project === null || values.project === undefined ? "No aplica" : values.project?.acronym} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="name" value={values.name} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Acrónimo</Form.Label>
                        <Form.Control name="acronym" value={values.project?.acronym} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Estado del proyecto</Form.Label>
                        <Form.Control name="statusProject" value={values.statusProject?.description} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label>Prioridad</Form.Label>
                        <Form.Control name="priority" value={values.priority} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label>Fecha de inicio</Form.Label>
                        <Form.Control name="dateStart" value={values.dateStart} onChange={handleChange} type="date" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label>Fecha de fin</Form.Label>
                        <Form.Control name="dateEnd" value={values.dateEnd} onChange={handleChange} type="date" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-12 mb-4" >
                        <Form.Label>Descripción del proyecto</Form.Label>
                        <Form.Control name="description" value={values.description} onChange={handleChange} as="textarea" readOnly />
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            {/* DATOS DEL CLIENTE */}
            <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenClient(!isOpenClient)}
              aria-controls="example-collapse-text"
                aria-expanded = {isOpenClient}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Cliente</Col>
                  <Col className="text-end">
                    <Col>
                      {isOpenClient ? (
                        <FeatherIcon icon="minus" color="grey" />
                      ) : (
                        <FeatherIcon icon="plus" color="grey" />
                      )}
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={isOpenClient}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                      <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label>Nombre completo</Form.Label>
                        <Form.Control name="client" value={values.client?.name+" "+values.client?.surname+" "+values.client?.secondSurname} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            {/* COTIZACION */}
            <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenCotizacion(!isOpenCotizacion)}
                aria-controls="example-collapse-text"
                aria-expanded={isOpenCotizacion}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Cotización</Col>
                  <Col className="text-end">
                    <Col>
                      {isOpenClient ? (
                        <FeatherIcon icon="minus" color="grey" />
                      ) : (
                        <FeatherIcon icon="plus" color="grey" />
                      )}
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={isOpenCotizacion}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                    <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Presupuesto</Form.Label>
                        <Form.Control name="cotizacion" value={values.cotizacion} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Precio al cliente</Form.Label>
                        <Form.Control name="priceClient" value={values.priceClient} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Tiempo estimado (meses)</Form.Label>
                        <Form.Control name="months" value={values.months} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label>Cantidad de becarios</Form.Label>
                        <Form.Control name="numberBeca" value={values.numberBeca} onChange={handleChange} type="text" readOnly />
                      </Form.Group>
                    </div>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            {/* EQUIPO DE TRABAJO  */}
             <Card className="mb-3" bg="white">
              <Card.Header onClick={() => setIsOpenTeam(!isOpenTeam)}
                aria-controls="example-collapse-text"
                aria-expanded={isOpenTeam}
                type="button">
                <Row>
                  <Col as="h6" className="text-bold">Equipo de trabajo</Col>
                  <Col className="text-end">
                    <Col>
                      {isOpenTeam ? (
                        <FeatherIcon icon="minus" color="grey" />
                      ) : (
                        <FeatherIcon icon="plus" color="grey" />
                      )}
                    </Col>
                  </Col>
                </Row>
              </Card.Header>
              <Collapse in={isOpenTeam}>
                <div id="example-collapse-text">
                  <Card.Body>
                    <div className="row">
                      {/* <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label className="font-weight-normal">Responsable de proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="rape" value={values.rape} onChange={handleChange}> </Form.Control>                        
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label className="font-weight-normal">Responsable de desarrollo<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="rd" value={values.rd} onChange={handleChange}> </Form.Control>
                      </Form.Group> */}
                    </div>
                    {/* ANALISTAS PROGRAMADORES */}
                    <Card className="mb-3" bg="white">
                      <Card.Header onClick={() => setIsOpenProg(!isOpenProg)}
                        aria-controls="example-collapse-text"
                        aria-expanded={isOpenProg}
                        type="button">
                        <Row>
                          <Col as="h6" className="text-bold">Analistas programadores</Col>
                          <Col className="text-end">
                            <Col>
                              {isOpenProg ? (
                                <FeatherIcon icon="minus" color="grey" />
                              ) : (
                                <FeatherIcon icon="plus" color="grey" />
                              )}
                            </Col>
                          </Col>
                        </Row>
                      </Card.Header>
                      <Collapse in={isOpenProg}>
                        <div id="example-collapse-text">
                          <Card.Body>
                            <div className="row">                        
                              
                            </div>
                          </Card.Body>
                        </div>
                      </Collapse>
                    </Card>
                   </Card.Body>
                </div>
              </Collapse>
            </Card> 
            <Form.Group className="mb-4">
              <Row>
                <Col className="text-end">
                  <Button variant="secondary" type="button" onClick={handleCloseForm}>
                    Cerrar
                  </Button>
                </Col>
              </Row>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};