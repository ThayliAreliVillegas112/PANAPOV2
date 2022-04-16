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
  setProjects,
  status
}) => {
  const [values, setValues] = useState({ status: status });
  const [isLoading, setIsLoading] = useState(false);


  let avance = [
    {
      "fase": "Inicio",
      "progress": 100,

    },
    {
      "fase": "Requerimientos",
      "progress": 100,

    },
    {
      "fase": "Anális y diseño",
      "progress": 80,

    },
    {
      "fase": "Construcción",
      "progress": 20,

    },
    {
      "fase": "Integración y pruebas",
      "progress": 5,

    },
    {
      "fase": "Cierre",
      "progress": 10,

    }
  ];

  const columns = [
    {
      name: <h6 className="text-center">Fase</h6>,
      cell: (row) => <div className="txt4">{row.fase}</div>,
    },
    {
      name: <h6 style={{ width: "100%" }}>Avance del proyecto</h6>,
      cell: (row) => <div className="txt4">
        <ProgressBar now={row.progress} variant="success" />
        <small>{row.progress}% completado</small>
      </div>,
    }
  ]

  // const handleChange = (event) =>{
  //   const { name, value } = event.target;
  //   setValues({ ...values, [name]: value});
  // }  

  // const handleSubmit = (event) =>{
  //   event.preventDefault();
  //   console.log(values);
  //   Alert.fire({
  //   title: titleConfirmacion,
  //   text: msjConfirmacion,
  //   confirmButtonText: "Aceptar",
  //   cancelButtonText: "Cancelar",
  //   showCancelButton: true,
  //   reverseButtons: true,
  //   showLoaderOnConfirm: true,
  //   icon: "warning",
  //   preConfirm: () => {
  //     return axios({
  //       url: "/category/",
  //       method: "PUT",
  //       data: JSON.stringify(values),
  //     })
  //       .then((response) => {
  //         console.log(response);
  //         if (!response.error) {
  //           setCategories((categories) => [
  //             ...categories.filter((it) => it.id !== values.id),
  //             values,
  //           ]);
  //           handleCloseForm();
  //           Alert.fire({
  //             title: titleExito,
  //             text: msjExito,
  //             icon: "success",
  //             confirmButtonText: "Aceptar",
  //           });
  //         }
  //         return response;
  //       })
  //       .catch((error) => {
  //         Alert.fire({
  //           title: titleError,
  //           confirmButtonColor: "#198754",
  //           text: msjError,
  //           icon: "error",
  //           confirmButtonText: "Aceptar",
  //         });
  //       });
  //   },
  //   backdrop: true,
  //   allowOutsideClick: !Alert.isLoading,
  //   });
  // };

  const handleCloseForm = () => {
    handleClose();
    setValues({});
  };

  // useEffect(() => {
  //   setValues({
  //     name: name
  //   });
  // }, [name]);

  return (
    <>
      <Modal show={isOpen} onHide={handleCloseForm}>
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Porcentaje de avances por fases</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
