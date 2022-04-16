import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FeatherIcon from "feather-icons-react";
import Alert, { msjConfirmacion, titleConfirmacion, titleError, msjError, msjExito, titleExito } from "../../../shared/plugins/alert";
import axios from "../../../shared/plugins/axios";

export const UserEdit = ({
    isOpenUpdate,
    handleClose,
    setUsers,
    name,
    surname,
    lastname,
    status
}) => {

    const [values, setValues] = useState({ name: name, surname: surname, lastname: lastname });

    const handleCloseForm = () => {
        handleClose();
        setValues({});
    };

    useEffect(() => {
        setValues({
            name: name,
            surname: surname,
            lastname: lastname
        });
    }, [name, surname, lastname]);

    return (
        <>
            <Modal show={isOpenUpdate} onHide={handleCloseForm}>
                <Modal.Header closeButton className="backgroundHeadModal" closeVariant="white">
                    <Modal.Title>Modificar Usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="col-md-12" >
                            <Form.Label>Rol</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option value="1">Directivo</option>
                                <option value="1">Coordinador</option>
                                <option value="2">Responsable de proyecto</option>
                                <option value="3">Responsable de desarrollo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-4 topBottom">
                            <Row>
                                <Col className="text-end">
                                    <Button variant="secondary" type="button" onClick={handleCloseForm}>
                                        Cerrar
                                    </Button>
                                    <Button
                                        style={{ background: "#042B61", borderColor: "#042B61" }}
                                        className="ms-3"
                                        type="submit"
                                        disabled={false}
                                    >
                                        Guardar
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