import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Container, ProgressBar } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import { CustomLoader } from "../../../shared/components/CustomLoader"
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const ReportDetails = ({
  isOpen,
  handleClose,
  status
}) => {
  const [values, setValues] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [avance, setAvance] = useState([]);
  const [id2, setId2] = useState()

  useEffect(() => {
    
  
  }, [])

  


  const columns = [
    {
      name: <h6 className="text-center">Fase</h6>,
      cell: (row) => <div className="txt4">{row.phases?.descripton}</div>,
    },
    {
      name: <h6 style={{ width: "100%" }}>Avance del proyecto</h6>,
      cell: (row) => <div className="txt4">
        <ProgressBar now={row.porcentaje} variant="success" />
        <small>{row.porcentaje}% completado</small>
      </div>,
    }
  ]




  const handleCloseForm = () => {
    handleClose();
    setValues({});
  };


  return (
    <>
      <Modal show={isOpen} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Porcentaje de avances por fases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* <Form.Group>
              <Form.Label className="font-weight-normal">Inicio</Form.Label>
              <ProgressBar  variant="success" />
              <small>% completado</small>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-normal">Requerimientos</Form.Label>
              <ProgressBar  variant="success" />
              <small>% completado</small>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-normal">Análisis y diseño</Form.Label>
              <ProgressBar   variant="success" />
              <small>% completado</small>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-normal">Construcción</Form.Label>
              <ProgressBar  variant="success" />
              <small>% completado</small>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-normal">Integración y pruebas</Form.Label>
              <ProgressBar  variant="success" />
              <small>% completado</small>
            </Form.Group>
            <Form.Group>
              <Form.Label className="font-weight-normal">Cierre</Form.Label>
              <ProgressBar  variant="success" />
              <small>% completado</small>
            </Form.Group> */}
            <DataTable
              columns={columns}
              data={avance}
              pagination
              progressPending={isLoading}
              progressComponent={<CustomLoader />}
              subHeader
            />
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
}
