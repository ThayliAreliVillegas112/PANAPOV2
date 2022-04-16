import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { Button, Row, Col, Container, Card, Badge, ProgressBar } from "react-bootstrap";
import { CustomLoader } from "../../../shared/components/CustomLoader";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import { ReportDetails } from './ReportDetails';
import axios from "../../../shared/plugins/axios";

export const ProjectReports = ({
  data,


}) => {

  const [values, setValues] = useState({data: data});
  const [isLoading, setIsLoading] = useState(false);
  const [reports, setReports] = useState([]);
  const [id, setId] = useState()

  const [isOpen, setIsOpen] = useState(false);

  console.log(data)
  useEffect(() => {
    setValues({
      data: data,
      
    })
    document.title = "PANAPO | Reportes";
    setId(data);
    
    console.log("Si jalaba hace un momento chin**** x7");
    
    getReport();
    
    
  }, [id])



  const getReport = () => {
    axios({ url: "/report/", method: "GET" })
        .then((response) => {
            // let reportT;
            // reportT = response.data;
            let data = response.data;
            let reportTemp = data.filter(item => item.project.id === id);
            setReports(reportTemp);
            console.log(reportTemp);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
        });
  };

  

  const columns = [
    {
      name: <h6>#</h6>,
      cell: (row, index) => <div className="txt4">{index + 1}</div>,
      width: "6%",
      center: true,
      compact: true
    },
    {
      name: <h6>Fecha</h6>,
      cell: (row) => <div className="txt4">{row.date}</div>,
      center: true,
      compact: true
    },
    {
      name: <h6>Etapa planeada</h6>,
      cell: (row) => <div className="txt4">{row.stagePlanned}</div>,
      center: true,
      compact: true
    },
    {
      name: <h6>Etapa real</h6>,
      cell: (row) => <div className="txt4">{row.stageReal}</div>,
      center: true,
      compact: true
    },
    {
      name: <h6>Fase planeada</h6>,
      cell: (row) => <div className="txt4">{row.phasePlanned}</div>,
      center: true,
      compact: true
    },
    {
      name: <h6>Fase real</h6>,
      cell: (row) => <div className="txt4">{row.phaseReal}</div>,
      center: true,
      compact: true
    },
    {
      name: <h6>Porcentaje de avance total</h6>,
      cell: (row) => <Container fluid>
        <ProgressBar now={row.percentage} variant="success" visuallyHidden />
        <div className='text-center'><small>{row.percentage}% completado</small></div>
      </Container>,
      center: true,
      width: "17%",
      compact: true
    },
    {
      name: <h6>Porcentaje de avance por fase</h6>,
      cell: (row) => <div>
        <Button variant="primary" size="md"
          onClick={() => {
            setValues(row)
            setIsOpen(true)
          }}>
          <FeatherIcon icon="list" />
        </Button>
      </div>,
      center: true,
      compact: true
    },
    {
      name: <h6>Costo total de inversión</h6>,
      cell: (row) => <div className="txt4 align-center-items">${row.cost}</div>,
      right: false,
      compact: true
    },
    {
      name: <h6>Días de desviación</h6>,
      cell: (row) =>
        <>
          {
            row.daysDeviation <= 0 ? (
              <h6>
                <Badge bg="success">
                  <div>{row.daysDeviation}</div>
                </Badge>
              </h6>
            ) : (
              <h6>
                <Badge bg="danger">
                  <div>{row.daysDeviation}</div>
                </Badge>
              </h6>
            )
          }
        </>,
      compact: true
    }
  ];

  // const getReports = () => {
  //   setReports(report);
  //   setIsLoading(false);
  // };

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
                <h1 class="font-weight-bold">Nombre del proyecto</h1>
              </div>
            </div>
          </div>
        </section>
        <Row>
          <Col>
            <Card className="mb-0">
              <Card.Header
                className="backgroundHeadCard">
                <Row>
                  <Col as="h6">Proyectos</Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <DataTable
                  columns={columns}
                  data={reports}
                  pagination
                  paginationComponentOptions={paginationOptions}
                  noDataComponent="No hay registros"
                  progressPending={isLoading}
                  progressComponent={<CustomLoader />}
                />
                <ReportDetails
                  isOpen={isOpen}
                  handleClose={() => setIsOpen(false)}
                  {...values}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
};