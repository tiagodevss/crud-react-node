import { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Api from '../Api';

export default function NewTask(props) {
    const [nome, setNome] = useState()
    const [data, setData] = useState()
    const [status, setStatus] = useState("Pendente")

    async function addTask() {
        return new Promise(async (resolve, reject) => {
            const params = {
                "key": "key123",
                "nome": nome,
                "data": data,
                "status": status
            }

            await Api.post("/create", params).then((res) => {
                resolve(res);
                props.onHide();
            }).catch(err => {
                console.log(err)
                reject(err)
                props.onHide();
            })
        })
    }

    return (


        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar tarefa</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Row className='d-flex justify-content-center'>
                    <Col md={8}>
                        <Form.Label htmlFor="nome">Nome</Form.Label>
                        <Form.Control
                            type="text"
                            id="nome"
                            onChange={e => setNome(e.target.value)}
                        />
                        <Form.Label htmlFor="data">Data</Form.Label>
                        <Form.Control
                            type="date"
                            id="data"
                            onChange={e => {
                                const splited = e.target.value.split("-")
                                setData(`${splited[2]}/${splited[1]}/${splited[0]}`)
                            }}
                        />
                        <Form.Label htmlFor="select">Status</Form.Label>
                        <Form.Select
                            id='select'
                            onChange={e => setStatus(e.target.value)}>
                            <option>Pendente</option>
                            <option>Concluído</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => addTask()} variant="success">Adicionar</Button>
            </Modal.Footer>
        </Modal>

    );
}
