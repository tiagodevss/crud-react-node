import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function NewTask(props) {
    const [nome, setNome] = useState()
    const [data, setData] = useState()
    const [status, setStatus] = useState("Pendente")

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Adicionar nova tarefa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className='d-flex justify-content-center'>
                    <Col md={8}>
                        <Form.Label htmlFor="nome">Nome</Form.Label>
                        <Form.Control
                            type="text"
                            id="nome"
                        />
                        <Form.Label htmlFor="data">Data</Form.Label>
                        <Form.Control
                            type="date"
                            id="data"
                        />
                        <Form.Label htmlFor="select">Nome</Form.Label>
                        <Form.Select aria-label="Default select example" id='select'>
                            <option>Pendente</option>
                            <option>Concluída</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => {
                    props.addTask({nome, data, status});
                    props.onHide()
                }} variant="success">Adicionar</Button>
            </Modal.Footer>
        </Modal >
    );
}
