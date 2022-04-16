import React, { useState, useEffect } from "react";
import { Button, Row, Col, Container, Form, Card, Badge, InputGroup, FormControl, Collapse, ProgressBar } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import DataTable from "react-data-table-component";
import { ProjectEdit } from './ProjectEdit'
import { ProjectDetails } from './ProjectDetails'
import { ProjectDetailsProspect } from "./ProjectDetailsProspect";
import { ProjectEditProspect } from "./ProjectEditProspect";
import { ProjectStart } from "./ProjectStart";
import { CustomLoader } from "../../../../shared/components/CustomLoader";
import { FilterComponent } from "../../../../shared/components/FilterComponent";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../../shared/plugins/alert";
import { Link, useNavigate } from 'react-router-dom';
import "../../../../assets/css/main.css";
import "../../../../assets/css/util.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as yup from "yup";
import axios from "../../../../shared/plugins/axios";
import { useFormik } from "formik";

export const ProjectList = () => {
    let value = "";
    const navigation = useNavigate();

    const handleReport = () => {
        navigation('/report', { state: { id: value } });
    }

    const setValue = (id) => {
        value = id;
    }

    const [filterText, setFilterText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingProspect, setIsLoadingProspect] = useState(false);

    const [projects, setProjects] = useState([]);
    const [projectsProspect, setProjectsProspect] = useState([]);
    const [clients, setClients] = useState([]);
    const [selectProjects, setSelectProjects] = useState([]);
    const [values, setValues] = useState({});

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const [isOpenDetails, setIsOpenDetails] = useState(false);
    const [isOpenReports, setIsOpenReports] = useState(false);

    const [isOpenProspect, setIsOpenProspect] = useState(false);
    const [isOpenData, setIsOpenData] = useState(false);
    const [isOpenClient, setIsOpenClient] = useState(false);
    const [isOpenQuote, setIsOpenQuote] = useState(false);
    const [isOpenUpdateP, setIsOpenUpdateP] = useState(false);
    const [isOpenDetailsP, setIsOpenDetailsP] = useState(false);
    const [isOpenStart, setIsOpenStart] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getProjects();
        getProspectProject();
        getSelectProjects();
        getClients();
        document.title = "PANAPO | Proyectos";
    }, []);

    const getClients = () => {
        axios({ url: "/client/", method: "GET" })
            .then((response) => {
                setClients(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProspectProject = () => {
        axios({ url: "/project/", method: "GET" })
            .then((response) => {
                let data = response.data;
                console.log(data)
                let prospectTemp = data.filter(item => item.statusProject.description === "Prospecto")
                setProjectsProspect(prospectTemp);
                setIsLoading(false);
                console.log(prospectTemp)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getProjects = () => {
        axios({ url: "/project/", method: "GET" })
            .then((response) => {
                let data = response.data;
                let projectTemp = data.filter(item => item.statusProject.description != "Prospecto")
                setProjects(projectTemp);
                setIsLoading(false);
                console.log(projectTemp)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSelectProjects = () => {
        axios({ url: "/project/", method: "GET" })
            .then((response) => {
                let data = response.data;
                let selectTemp = data.filter(item => item.statusProject.description === "Cerrado" || item.statusProject.description === "Cancelado")
                setSelectProjects(selectTemp);
                setIsLoading(false);
                console.log(selectTemp)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const filteredItems = projects.filter(
        (item) => item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
    );

    const columns = [
        {
            name: <h6>#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            center: true,
            width: "6%"
        },
        {
            name: <h6 className="text-center">Identificador</h6>,
            cell: (row) => <div className="txt4">{row.acronym}</div>,
            width: "15%"
        },
        {
            name: <h6>Avance real del proyecto</h6>,
            cell: (row) => <div className="txt4">
                <ProgressBar now={row.progress} variant="success" />
                <small>{row.progress}% completado</small>
            </div>,
            width:"25%"
        },
        {
            name: <h6>Estado</h6>,
            cell: (row) =>
                <>
                    {
                        row.statusProject.description === "Activo" ? (
                            <h6>
                                <Badge bg="success">
                                    <div>{row.statusProject.description}</div>
                                </Badge>
                            </h6>
                        ) : (row.statusProject.description === "Cancelado" ?
                            <h6>
                                <Badge bg="danger">
                                    <div>{row.statusProject.description}</div>
                                </Badge>
                            </h6> : (row.statusProject.description === "Pausado" ?
                                <h6>
                                    <Badge bg="warning">
                                        <div>{row.statusProject.description}</div>
                                    </Badge>
                                </h6> :
                                <h6>
                                    <Badge bg="primary">
                                        <div>{row.statusProject.description}</div>
                                    </Badge>
                                </h6>
                            )
                        )
                    }
                </>
        },
        {
            name: <h6>Prioridad</h6>,
            cell: (row) =>
                <>
                    {
                        row.priority === "Baja" ? (
                            <h6>
                                <Badge bg="success">
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
                                <Badge bg="danger">
                                    <div>{row.priority}</div>
                                </Badge>
                            </h6>
                        )
                    }
                </>
        },
        {
            name: <div><h6>Detalles</h6></div>,
            cell: (row) => <div>
                <Button variant="primary" size="md"
                    onClick={() => {
                        setValues(row)
                        console.log(row)
                        setIsOpenDetails(true)
                    }}>
                    <FeatherIcon icon="info" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Modificar</h6></div>,
            cell: (row) => <div>
                <Button variant="warning" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenUpdate(true)
                    }}>
                    <FeatherIcon icon="edit" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Reportes</h6></div>,
            cell: (row) => <div>
                <Button variant="success" size="md" onClick={() => {
                    setValue(row.id)
                    handleReport()
                }}
                >
                    <FeatherIcon icon="file" />
                </Button>
            </div>
        },
    ];

    const columnsP = [
        {
            name: <h6>#</h6>,
            cell: (row, index) => <div><h6>{index + 1}</h6></div>,
            width: "6%"
        },
        {
            name: <h6 className="text-center">Nombre</h6>,
            cell: (row) => <div className="txt4">{row.name}</div>,
            width: "25%"
        },
        {
            name: <h6>Cliente</h6>,
            cell: (row) => <div className="txt4">{row.client.name}</div>,
        },
        {
            name: <h6>Tiempo estimado</h6>,
            cell: (row) => <div className="txt4">{row.months} meses</div>,
        },
        {
            name: <h6>Cantidad de becarios</h6>,
            cell: (row) => <div className="txt4">{row.numberBeca}</div>,
        },
        {
            name: <h6>Estado</h6>,
            cell: (row) =>
                <h6>
                    <Badge bg="secondary">
                        <div>{row.statusProject.description}</div>
                    </Badge>
                </h6>
        },
        {
            name: <div><h6>Detalles</h6></div>,
            cell: (row) => <div>
                <Button variant="primary" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenDetailsP(true)
                        console.log(row)
                    }}>
                    <FeatherIcon icon="info" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Modificar</h6></div>,
            cell: (row) => <div>
                <Button variant="warning" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenUpdateP(true)
                    }}>
                    <FeatherIcon icon="edit" />
                </Button>
            </div>
        },
        {
            name: <div><h6>Iniciar</h6></div>,
            cell: (row) => <div>
                <Button variant="success" size="md"
                    onClick={() => {
                        setValues(row)
                        setIsOpenStart(true)
                    }}>
                    <FeatherIcon icon="play" />
                </Button>
            </div>
        },
    ];

    //registrar prospecto
    const formik = useFormik({
        initialValues: {
            project: 1,
            name: "",
            statusProject: {
                id: 1,
                description: "Prospecto"
            },
            description: "",
            client: "",
            cotizacion: "",
            priceClient: "",
            months: "",
            numberBeca: ""
        },
        validationSchema: yup.object().shape({
            name: yup.string().required("Campo obligatorio"),
            description: yup.string().required("Campo obligatorio"),
            client: yup.string().required("Campo obligatorio"),
            cotizacion: yup.number().required("Campo obligatorio"),
            priceClient: yup.number().required("Campo obligatorio"),
            months: yup.number().required("Campo obligatorio"),
            numberBeca: yup.number().required("Campo obligatorio"),
            project: yup.number()
        }),
        onSubmit: (values) => {
            let project = {...values}; 
            if(values.project === ""){
                project = {
                    ...values,
                    project: {
                        id: null
                    },
                    client: {
                        id: parseInt(values.client)
                    },
                };
            }else{
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
            console.log(project);
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
                            console.log(response);
                            if (!response.error) {
                                getProjects();
                                getClients();
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

    const handleCloseForm = () => {
        formik.resetForm();
        setIsOpen(false);
    };

    const paginationOptions = {
        rowsPerPageText: "Filas por página",
        rangeSeparatorText: "de",
    };

    const searchComponent = React.useMemo(() => {
        const search = () => {
            if (filterText) {
                setFilterText("");
            }
        }
        return <FilterComponent filterText={filterText} onFilter={e => setFilterText(e.target.value)} onSearch={search} />
    }, [filterText]);

    return (
        <div className="content-wrapper screenHeight">
            <Container fluid>
                <section class="content-header">
                    <div class="container-fluid">
                        <div class="row mb-2">
                            <div class="col-sm-6">
                                <h1 class="font-weight-bold">Gestión de proyectos</h1>
                            </div>
                        </div>
                    </div>
                </section>
                <Row>
                    <Col>
                        <Card className="mb-0">
                            <Card.Header onClick={() => setIsOpen(!isOpen)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpen}
                                className="backgroundHeadCard"
                                type="button">
                                <Row>
                                    <Col as="h6">Registrar proyecto</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpen ? (
                                                <FeatherIcon icon="minus" />
                                            ) : (
                                                <FeatherIcon icon="plus" />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpen}>
                                <div id="example-collapse-text">
                                    <Container fluid>
                                        <Form className="row" onSubmit={formik.handleSubmit}>
                                            <Card.Body>
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
                                                                        <Form.Label className="font-weight-normal">Proyecto anterior</Form.Label>
                                                                        <Form.Select aria-label="Default select example" name="project" value={formik.values.project}
                                                                            onChange={formik.handleChange}>
                                                                            <option value="">No aplica</option>
                                                                            {
                                                                                selectProjects.map((select) => (
                                                                                    <option key={select.id} value={select.id} >{select.acronym}</option>
                                                                                ))
                                                                            }
                                                                        </Form.Select>
                                                                        <Form.Text muted>
                                                                            Solo seleccionar un proyecto si se requiere
                                                                            un nuevo ciclo del mismo
                                                                        </Form.Text>
                                                                        <small></small>
                                                                    </Form.Group>
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Nombre del proyecto<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control type="text" placeholder="Ejemplo: SIGEH" name="name" value={formik.values.name}
                                                                            onChange={formik.handleChange} />
                                                                        {formik.errors.name ? (
                                                                            <span className='text-danger'>{formik.errors.name}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Estado<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control readOnly placeholder="Prospecto" />
                                                                    </Form.Group>
                                                                    <Form.Group className="col-md-12 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Descripción del proyecto<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control
                                                                            placeholder="Ejemplo: Sirve para hacer compras"
                                                                            as="textarea"
                                                                            style={{ height: '100px' }} name="description" value={formik.values.description}
                                                                            onChange={formik.handleChange}
                                                                        />
                                                                        {formik.errors.description ? (
                                                                            <span className='text-danger'>{formik.errors.description}</span>
                                                                        ) : null}
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
                                                        aria-expanded={isOpenClient}
                                                        type="button">
                                                        <Row>
                                                            <Col as="h6" className="text-bold">Cliente del proyecto</Col>
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
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Seleccionar un cliente<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Select name="client"
                                                                            value={formik.values.client}
                                                                            onChange={formik.handleChange}>
                                                                            <option value="">Selecciona una opción</option>
                                                                            {
                                                                                clients.map((clientS) => (
                                                                                    <option key={clientS.id} value={clientS.id} >{clientS.name + " " + clientS.surname + " " + clientS.secondSurname}</option>
                                                                                ))
                                                                            }
                                                                        </Form.Select>
                                                                        {formik.errors.client ? (
                                                                            <span className='text-danger'>{formik.errors.client}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                </div>
                                                            </Card.Body>
                                                        </div>
                                                    </Collapse>
                                                </Card>
                                                {/* DATOS DE LA COTIZACIÓN */}
                                                <Card className="mb-3" bg="white">
                                                    <Card.Header onClick={() => setIsOpenQuote(!isOpenQuote)}
                                                        aria-controls="example-collapse-text"
                                                        aria-expanded={isOpenQuote}
                                                        type="button">
                                                        <Row>
                                                            <Col as="h6" className="text-bold">Cotización del proyecto</Col>
                                                            <Col className="text-end">
                                                                <Col>
                                                                    {isOpenQuote ? (
                                                                        <FeatherIcon icon="minus" color="grey" />
                                                                    ) : (
                                                                        <FeatherIcon icon="plus" color="grey" />
                                                                    )}
                                                                </Col>
                                                            </Col>
                                                        </Row>
                                                    </Card.Header>
                                                    <Collapse in={isOpenQuote}>
                                                        <div id="example-collapse-text">
                                                            <Card.Body>
                                                                <div className="row">
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Presupuesto<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control type="number" placeholder="Ejemplo: 5000" name="cotizacion" value={formik.values.cotizacion}
                                                                            onChange={formik.handleChange} />
                                                                        {formik.errors.cotizacion ? (
                                                                            <span className='text-danger'>{formik.errors.cotizacion}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Precio al cliente<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control type="number" placeholder="Ejemplo: 50000" name="priceClient" value={formik.values.priceClient}
                                                                            onChange={formik.handleChange} />
                                                                        {formik.errors.priceClient ? (
                                                                            <span className='text-danger'>{formik.errors.priceClient}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Tiempo estimado (meses)<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control type="number" placeholder="Ejemplo: 12" name="months" value={formik.values.months}
                                                                            onChange={formik.handleChange} />
                                                                        {formik.errors.months ? (
                                                                            <span className='text-danger'>{formik.errors.months}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                    <Form.Group className="col-md-6 mb-4" >
                                                                        <Form.Label className="font-weight-normal">Cantidad de becarios<span className="text-danger">*</span></Form.Label>
                                                                        <Form.Control type="number" placeholder="Ejemplo: 2" name="numberBeca" value={formik.values.numberBeca}
                                                                            onChange={formik.handleChange} />
                                                                        {formik.errors.numberBeca ? (
                                                                            <span className='text-danger'>{formik.errors.numberBeca}</span>
                                                                        ) : null}
                                                                    </Form.Group>
                                                                </div>
                                                            </Card.Body>
                                                        </div>
                                                    </Collapse>
                                                </Card>
                                                <div className="d-grid gap-2">
                                                    <Button type="submit" style={{ background: "#042B61", borderColor: "#042B61" }} 
                                                        disabled={!(formik.isValid && formik.dirty)}>
                                                        Registrar
                                                    </Button>
                                                    {/* <Button type="submit" className="button-style" size="lg">Registrar</Button> */}
                                                </div>
                                            </Card.Body>
                                        </Form>
                                    </Container>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Card>
                            <Card.Header
                                onClick={() => setIsOpenProspect(!isOpenProspect)}
                                aria-controls="example-collapse-text"
                                aria-expanded={isOpenProspect}
                                type="button"
                                className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Proyectos prospecto</Col>
                                    <Col className="text-end">
                                        <Col>
                                            {isOpenProspect ? (
                                                <FeatherIcon icon="minus" />
                                            ) : (
                                                <FeatherIcon icon="plus" />
                                            )}
                                        </Col>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Collapse in={isOpenProspect}>
                                <div id="example-collapse-text">
                                    <Card.Body>
                                        <DataTable
                                            columns={columnsP}
                                            data={projectsProspect}
                                            noDataComponent="No hay registros"
                                            pagination
                                            paginationComponentOptions={paginationOptions}
                                            progressPending={isLoadingProspect}
                                            progressComponent={<CustomLoader />}
                                        />
                                        <ProjectEditProspect
                                            isOpenUpdateP={isOpenUpdateP}
                                            handleClose={setIsOpenUpdateP}
                                            getProspectProject={getProspectProject}
                                            getProyectos={getProjects}
                                            {...values}
                                        />
                                        <ProjectDetailsProspect
                                            isOpenDetailsP={isOpenDetailsP}
                                            handleClose={setIsOpenDetailsP}
                                            {...values}
                                        />
                                        <ProjectStart
                                            isOpenStart={isOpenStart}
                                            handleClose={setIsOpenStart}
                                            setProjectsProspect={setProjectsProspect}
                                            getProspectProject={getProspectProject}
                                            getProyectos={getProjects}
                                            {...values}
                                        />
                                    </Card.Body>
                                </div>
                            </Collapse>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card>
                            <Card.Header
                                className="backgroundHeadCard">
                                <Row>
                                    <Col as="h6">Proyectos</Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <DataTable
                                    columns={columns}
                                    data={filteredItems}
                                    noDataComponent="No hay registros"
                                    pagination
                                    paginationComponentOptions={paginationOptions}
                                    progressPending={isLoading}
                                    progressComponent={<CustomLoader />}
                                    subHeader
                                    subHeaderComponent={searchComponent}
                                />
                                <ProjectEdit
                                    isOpenUpdate={isOpenUpdate}
                                    handleClose={setIsOpenUpdate}
                                    setProjects={setProjects}
                                    {...values}
                                />
                                <ProjectDetails
                                    isOpenDetails={isOpenDetails}
                                    handleClose={setIsOpenDetails}
                                    {...values}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}