import React from "react";
import { Col, FormControl, InputGroup, Form } from "react-bootstrap";
import "../../../src/assets/css/main.css";
import "../../../src/assets/css/util.css";
import "../../../src/assets/css/Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const FilterComponent = ({ filterText, onFilter, onSearch }) => (
  <>
    <Col md={{ span: 4}}>
      <InputGroup className="mb-3">
        <Form.Label>Buscar:</Form.Label>
        <FormControl
        className="ms-3"
          id="search"
          type="text"
          placeholder="Buscar"
          aria-label="Buscar..."
          value={filterText}
          onChange={onFilter}
          style={{height: "40px"}}
        />
      </InputGroup>
    </Col>
  </>
);
