import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Api from '../functions/Api';

export default function UpdateTask(props) {
    const [nome, setNome] = useState()
    const [data, setData] = useState()
    const [status, setStatus] = useState()

    async function updateTask() {
        return new Promise(async (resolve, reject) => {
            const params = {
                "key": "key123",
                "id": id,
                "nome": nome,
                "data": data,
                "status": status
            }

            await Api.post("/update", params).then((res) => {
                resolve(res);
                props.onHide();
            }).catch(err => {
                reject(err)
                props.onHide();
            })
        })
    }

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
                            value={nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <Form.Label htmlFor="data">Data</Form.Label>
                        <Form.Control
                            type="date"
                            id="data"
                            value={data}
                            onChange={e => setData(e.target.value)}
                        />
                        <Form.Label htmlFor="select">Status</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            id='select'
                            value={status}
                            onChange={e => setStatus(e.target.value)}>
                            <option>Pendente</option>
                            <option>Concluído</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => updateTask()} variant="success">Adicionar</Button>
            </Modal.Footer>
        </Modal >
    );
}
