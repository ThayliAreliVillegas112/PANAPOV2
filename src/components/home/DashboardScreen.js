import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Badge, Card, Table, ProgressBar, Button } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate } from 'react-router-dom';
import { CustomLoader } from "../../shared/components/CustomLoader";
import DataTable from "react-data-table-component";

export const DashboardScreen = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [values, setValues] = useState({});
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  let value = "";
  const navigation = useNavigate();

  const setValue = (id) => {
    value = id;
  }
  const handleReport = () =>{
    navigation('/report', {state: {id: value}});
}

  useEffect(() => {
    setIsLoading(true);
    getProjects();
  }, []);



  let project = [
    {
      "name": "SIGEH",
      "nameComplete": "Sistema de Gestión de Proyectos",
      "progress": 50,
      "daysD": 2,
      "priority": "Alta",
      "status": "Activo",

      "id": 134
    },
    {
      "name": "PANAPO",
      "nameComplete": "Panel de Gestión de Proyectos",
      "progress": 80,
      "daysD": 13,
      "priority": "Alta",
      "status": "Activo",

      "id": 135
    },
    {
      "name": "AMTE",
      "nameComplete": "Sistema de Gestión de Proyectos",
      "progress": 20,
      "daysD": 8,
      "priority": "Media",
      "status": "Cancelado",

      "id": 136
    },
    {
      "name": "SIMTE",
      "nameComplete": "Sistema de Gestión de Proyectos",
      "progress": 95,
      "daysD": -5,
      "priority": "Baja",
      "status": "Cerrado",

      "id": 137
    },

  ];

  const columns = [
    {
      name: <h6>#</h6>,
      cell: (row, index) => <div><h6>{index + 1}</h6></div>,
      width:"6%",
      
    },
    {
      name: <h6>Acrónimo</h6>,
      cell: (row) => <div className="txt4 text-center">{row.name}</div>,
      width:"15%",
      center: true,
    },
    {
      name: <h6>Nombre del proyecto</h6>,
      cell: (row) => <div className="txt4 text-center">{row.nameComplete}</div>,
      width:"25%",
      center: true,
    },
    {
      name: <h6 >Avance real del proyecto</h6>,
      cell: (row) => <div className="txt4">
        <ProgressBar now={row.progress} variant="success" />
        <small>{row.progress}% completado</small>
      </div>,
      width:"25%"
    },
    {
      name: <h6 title="Si hay números negativos es porque van adelantados en el proyecto">Días de desviación</h6>,
      cell: (row) =>
        <div className='text-center'>
          {
            row.daysD <= 5 ? (
              <h6>
                <Badge bg="success">
                  <div>{row.daysD}</div>
                </Badge>
              </h6>
            ) : (row.daysD >= 6 && row.daysD <= 11 ?
              <h6>
                <Badge bg="warning">
                  <div>{row.daysD}</div>
                </Badge>
              </h6> : (row.daysD >= 12 ?
                <h6>
                  <Badge bg="danger">
                    <div>{row.daysD}</div>
                  </Badge>
                </h6> :
                <h6>
                  <Badge bg="danger">
                    <div>{row.daysD}</div>
                  </Badge>
                </h6>
              )
            )
          }
        </div>,
        width:"15%",
    },
    {
      name: <h6>Prioridad</h6>,
      cell: (row) =>
        <>
          {
            row.priority === "Alta" ? (
              <h6>
                <Badge bg="danger">
                  <div>{row.priority}</div>
                </Badge>
              </h6>
            ) : (row.priority === "Media" ?
              <h6>
                <Badge bg="warning">
                  <div>{row.priority}</div>
                </Badge>
              </h6> :
              <h6>
                <Badge bg="success">
                  <div>{row.priority}</div>
                </Badge>
              </h6>
            )
          }
        </>
    },
    {
      name: <h6>Estado</h6>,
      cell: (row) =>
        <>
          {
            row.status === "Activo" ? (
              <h6>
                <Badge bg="success">
                  <div>{row.status}</div>
                </Badge>
              </h6>
            ) : (row.status === "Cancelado" ?
              <h6>
                <Badge bg="danger">
                  <div>{row.status}</div>
                </Badge>
              </h6> : (row.status === "Pausado" ?
                <h6>
                  <Badge bg="warning">
                    <div>{row.status}</div>
                  </Badge>
                </h6> :
                <h6>
                  <Badge bg="primary">
                    <div>{row.status}</div>
                  </Badge>
                </h6>
              )
            )
          }
        </>
    },
    {
      name: <div><h6>Historial de reportes</h6></div>,
      cell: (row) => <div>
          <Button variant="success" size="md" onClick={() => {
              setValue(row.id)
              handleReport()
          }}
          >
              <FeatherIcon icon="file" />
          </Button>
      </div>,
      center: true,
  },
  ];

  const getProjects = () => {
    setProjects(project);
    setIsLoading(false);
  };

  const paginationOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
  };

  return (
    <div className="content-wrapper screenHeight">
      <Container fluid>
        <section class="content-header">
          <div class="container-fluid">
            <div class="row mb-2">
              <div class="col-sm-6">
                <h1 class="font-weight-bold">Panel de proyectos</h1>
              </div>
            </div>
          </div>
        </section>
        <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body className='activos'>
              <Col >
                <h3>5</h3>
                <h4>Proyectos activos</h4>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='pausados'>
              <Col >
                <h3>5</h3>
                <h4>Proyectos pausados</h4>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='cerrados'>
              <Col >
                <h3>5</h3>
                <h4>Proyectos cerrados</h4>
              </Col>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card>
            <Card.Body className='cancelados'>
              <Col >
                <h3>5</h3>
                <h4>Proyectos cancelados</h4>
              </Col>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* TABLA DE PROYECTOS */}
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Header className="backgroundHeadCard">
              <Row>
                <Col as="h6">Proyectos</Col>
              </Row>
            </Card.Header>
            <Card.Body>
              <DataTable
                columns={columns}
                data={project}
                pagination
                paginationComponentOptions={paginationOptions}
                progressPending={isLoading}
                progressComponent={<CustomLoader />}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </Container>
    </div>
  )
}
