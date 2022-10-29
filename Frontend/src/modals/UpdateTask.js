import { useState } from 'react';
import { Col, Form, Row, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Api from '../functions/Api';

export default function UpdateTask(props) {
    const [nome, setNome] = useState()
    const [data, setData] = useState()
    const [status, setStatus] = useState()

    const id = props.params?.id

    async function updateTask() {
        return new Promise(async (resolve, reject) => {
            const params = {
                "key": "key123",
                "id": id,
                "nome": nome || props.params?.nome,
                "data": data || props.params?.data,
                "status": status || props.params?.status
            }

            await Api.put("/update", params).then((res) => {
                resolve(res);
                setNome()
                setData()
                setStatus()
                props.onSave()
                props.onHide();
            }).catch(err => {
                reject(err)
                setNome()
                setData()
                setStatus()
                props.onSave()
                props.onHide();
            })
        })
    }

    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Atualizar tarefa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className='d-flex justify-content-center'>
                    <Col md={8}>
                        <Form.Label htmlFor="nome">Nome</Form.Label>
                        <Form.Control
                            type="text"
                            id="nome"
                            value={nome || props.params?.nome}
                            onChange={e => setNome(e.target.value)}
                        />
                        <Form.Label htmlFor="data">Data</Form.Label>
                        <Form.Control
                            type="date"
                            id="data"
                            value={data || props.params?.data}
                            onChange={e => setData(e.target.value)}
                        />
                        <Form.Label htmlFor="select">Status</Form.Label>
                        <Form.Select
                            aria-label="Default select example"
                            id='select'
                            value={status || props.params?.status}
                            onChange={e => setStatus(e.target.value)}
                        >
                            <option>Pendente</option>
                            <option>Concluído</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => updateTask()} variant="success">Adicionar</Button>
            </Modal.Footer>
        </Modal>

    );
}
