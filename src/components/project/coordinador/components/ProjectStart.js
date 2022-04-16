import React, { useEffect, useState } from "react";
import { Button, Row, Col, Container, Form, Collapse, Card, Modal } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import DataTable from "react-data-table-component";
import { CustomLoader } from "../../../../shared/components/CustomLoader"
import { AlertData } from "../../../../shared/components/alertData"
import axios from "../../../../shared/plugins/axios";
import * as yup from "yup";
import { useFormik } from "formik";

export const ProjectStart = ({
  isOpenStart,
  handleClose,
  getProspectProject,
  getProyectos,
  id,
  cotizacion,
  description,
  months,
  name,
  numberBeca,
  client,
  project,
  statusProject,
  priceClient,
  status
}) => {

  const [values, setValues] = useState({
    id: id,
    cotizacion: cotizacion,
    description: description,
    months: months,
    name: name,
    numberBeca: numberBeca,
    client: client,
    project: project,
    statusProject: statusProject,
    priceClient: priceClient,
    status: status
  });

  const [isOpenData, setIsOpenData] = useState(true);
  const [isOpenTeam, setIsOpenTeam] = useState(true);
  const [isOpenProg, setIsOpenProg] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [clients, setClients] = useState(false);

  const [rd, setRd] = useState([])
  const [rape, setRape] = useState([])
  const [personal, setPersonal] = useState([])
  const [programmers, setProgrammers] = useState([])
  const [programmer, setProgrammer] = useState("")
  const [idRd, setIdRd] = useState("")
  const [idRape, setIdRape] = useState("")

  const addProgramador = async() => {
    console.log(value)
    await axios({ url: "/person/"+value, method: "GET" })
      .then(async (response) => {
        let programadores = [];
        programadores = programmers
        let data = response.data;
        console.log(data)
        programadores.push(data)
        setProgrammers(programadores)
        console.log(programadores)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let value = "";
  const setId = (id) => {
    value = id;
  }

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

  const getRD = () => {
    axios({ url: "/user/", method: "GET" })
      .then((response) => {
        let data = response.data;
        let rds = []
        for (let r = 0; r < data.length; r++) {
          for (let m = 0; m < data[r].authorities.length; m++) {
            let rdTemp = data[r];
            if (data[r].authorities[m].acronym === "RD") {
              rds.push(rdTemp)
            }
          }
        }
        setRd(rds);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getRape = () => {
    axios({ url: "/user/", method: "GET" })
      .then((response) => {
        let data = response.data;
        let rapes = []
        for (let r = 0; r < data.length; r++) {
          for (let m = 0; m < data[r].authorities.length; m++) {
            let rapeTemp = data[r];
            if (data[r].authorities[m].acronym === "RAPE") {
              rapes.push(rapeTemp)
            }
          }
        }
        setRape(rapes);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPersonal = () => {
    axios({ url: "/person/", method: "GET" })
      .then((response) => {
        let data = response.data;
        let becaTemp = data.filter(item => item.profession.description === "Becario")
        setPersonal(becaTemp);
        console.log(becaTemp);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseForm = () => {
    formik.resetForm();
    setValues([])
    setProgrammers([])
    handleClose(false);
  };

  useEffect(() => {
    setValues({
      id: id,
      cotizacion: cotizacion,
      description: description,
      months: months,
      name: name,
      numberBeca: numberBeca,
      client: client,
      project: project,
      statusProject: statusProject,
      priceClient: priceClient,
      status: status
    });
    getRD();
    getRape();
    getPersonal();
    // getProspectProject();
  }, [isOpenStart]);

  //iniciar prospecto
  const formik = useFormik({
    initialValues: {
      acronym: "",
      statusProject: {
        id: 2,
        description: "Activo"
      },
      priority: "",
      dateStart: "",
      dateEnd: "",
      rd: "",
      rape: "",
      prog: "",
    },
    validationSchema: yup.object().shape({
      acronym: yup.string().required("Campo obligatorio"),
      priority: yup.string().required("Campo obligatorio"),
      dateStart: yup.string().required("Campo obligatorio"),
      dateEnd: yup.string().required("Campo obligatorio"),
      rd: yup.string().required("Campo obligatorio"),
      rape: yup.string().notOneOf([yup.ref(('rd'))], 'El RD y RAPE deben ser diferentes').required("Campo obligatorio"),
    }),
    onSubmit: (values) => {
      let project = { ...values };
      if (values.project === "") {
        project = {
          ...values,
          project: {
            id: null
          },
          client: {
            id: parseInt(values.client)
          },
        };
      } else {
        project = {
          ...values,
          project: {
            id: parseInt(values.project)
          },
          client: {
            id: parseInt(values.client)
          },
        };
      }
      //console.log(project);
      Alert.fire({
        title: titleConfirmacion,
        text: msjConfirmacion,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#198754",
        cancelButtonColor: "#dc3545",
        showCancelButton: true,
        reverseButtons: true,
        showLoaderOnConfirm: true,
        icon: "warning",
        preConfirm: () => {
          return axios({ url: "/project/", method: "POST", data: JSON.stringify(project) })
            .then((response) => {
              if (!response.error) {

                Alert.fire({
                  title: titleExito,
                  text: msjExito,
                  confirmButtonColor: "#198754",
                  icon: "success",
                  confirmButtonText: "Aceptar",
                }).then((result) => {
                  if (result.isConfirmed) {
                    handleCloseForm();
                  }
                });
              }
              return response;
            })
            .catch((error) => {
              console.log(error);
              Alert.fire({
                title: titleError,
                text: msjError,
                cancelButtonColor: "#198754",
                icon: "error",
                confirmButtonText: "Aceptar",
              });
            });
        },
        backdrop: true,
        allowOutsideClick: !Alert.isLoading,
      });
    },
  });

  return (
    <>
      <Modal show={isOpenStart} onHide={handleCloseForm} size="lg">
        <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
          <Modal.Title>Iniciar proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* DATOS DEL PROYECTO */}
          <Form onSubmit={formik.handleSubmit}>
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
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label className="font-weight-normal">Acrónimo del proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="acronym" type="text" placeholder="Ejemplo: PANAPO" value={formik.values.acronym}
                          onChange={formik.handleChange} />
                        {formik.errors.acronym ? (
                          <span className="text-danger">{formik.errors.acronym}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label className="font-weight-normal">Estado del proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="statusProject" type="text" value="Activo" readOnly />
                      </Form.Group>
                      <Form.Group className="col-md-4 mb-4" >
                        <Form.Label className="font-weight-normal">Prioridad<span className="text-danger">*</span></Form.Label>
                        <Form.Select aria-label="Seleccionar tipo de cliente" name="priority"
                          value={formik.values.priority}
                          onChange={formik.handleChange} >
                          <option value="">Seleccione una opción</option>
                          <option value="Alta">Alta</option>
                          <option value="Media">Media</option>
                          <option value="Baja">Baja</option>
                        </Form.Select>
                        {formik.errors.priority ? (
                          <span className='text-danger'>{formik.errors.priority}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label className="font-weight-normal">Fecha de inicio<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="dateStart" type="date" value={formik.values.dateStart}
                          onChange={formik.handleChange} />
                        {formik.errors.dateStart ? (
                          <span className='text-danger'>{formik.errors.dateStart}</span>
                        ) : null}
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4" >
                        <Form.Label className="font-weight-normal">Fecha de fin<span className="text-danger">*</span></Form.Label>
                        <Form.Control name="dateEnd" type="date" value={formik.values.dateEnd}
                          onChange={formik.handleChange} />
                        {formik.errors.dateEnd ? (
                          <span className='text-danger'>{formik.errors.dateEnd}</span>
                        ) : null}
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
                      <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label className="font-weight-normal">Responsable de proyecto<span className="text-danger">*</span></Form.Label>
                        <Form.Select name="rape" value={formik.values.rape} onChange={formik.handleChange}>
                          <option value="">Seleccione una opción</option>
                          {
                            rape.map((resp) => (
                              <option key={resp.id} value={resp.id} >{resp.person.name + " " + resp.person.surname + " " + resp.person.secondSurname}</option>
                            ))
                          }
                        </Form.Select>
                        {formik.errors.rape ? (
                          <span className='text-danger'>{formik.errors.rape}</span>
                        ) : null
                        }
                      </Form.Group>
                      <Form.Group className="col-md-6 mb-4"  >
                        <Form.Label className="font-weight-normal">Responsable de desarrollo<span className="text-danger">*</span></Form.Label>
                        <Form.Select name="rd" value={formik.values.rd} onChange={formik.handleChange}>
                          <option value="">Seleccione una opción</option>
                          {
                            rd.map((res) => (
                              <option key={res.id} value={res.id} >{res.person.name + " " + res.person.surname + " " + res.person.secondSurname}</option>
                            ))
                          }
                        </Form.Select>
                        {formik.errors.rd ? (
                          <span className='text-danger'>{formik.errors.rd}</span>
                        ) : null}
                      </Form.Group>
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
                              <Form.Group className="col-md-6 mb-4">
                                <Form.Select name="prog" onChange={formik.handleChange} value={formik.values.prog}>
                                  <option value="">Seleccione una opción</option>
                                  {
                                    personal.map((res) =>
                                      <option key={res.id} value={res.id} >{res.name + " " + res.surname + " " + res.secondSurname}</option>)
                                  }
                                </Form.Select>
                              </Form.Group>
                              <Form.Group className="col-md-6 mb-4 text-end">
                                <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }}
                                  onClick={() => {
                                    setId(formik.values.prog)
                                    addProgramador()
                                  }}>
                                  <FeatherIcon icon="plus" color="white" />Añadir
                                </Button>
                              </Form.Group>
                              <Form.Group>
                                <DataTable
                                  columns={columnsProg}
                                  data={programmers}
                                  noDataComponent={<AlertData title={"No hay programadores seleccionados"} />}
                                  pagination
                                  progressPending={isLoading}
                                  progressComponent={<CustomLoader />}
                                />
                              </Form.Group>
                            </div>
                          </Card.Body>
                        </div>
                      </Collapse>
                    </Card>
                  </Card.Body>
                </div>
              </Collapse>
            </Card>
            <Form.Group className="mb-4 mt-3">
              <Row>
                <Col className="text-end">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCloseForm}
                  >
                    Cerrar
                  </Button>
                  <Button
                    style={{ background: "#042B61", borderColor: "#042B61" }}
                    className="ms-3"
                    type="submit" disabled={!(formik.isValid && formik.dirty)}
                  >
                    Iniciar
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