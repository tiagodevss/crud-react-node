import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import './App.css';
import Api from './functions/Api'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { IoIosAddCircle } from 'react-icons/io'
import NewTask from './modal/NewTask';

function App() {
  const [tasks, setTasks] = useState()
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const data = {
      key: "key123"
    }

    Api.post('/read', data)
      .then((res) => {
        setTasks(res.data)
      })
      .catch(err => console.error(err))
  }, [])


  return (
    <Container className='page'>
      <Row>
        <Col>
          <h2>CRUD</h2>
          <p>A simple crud made with Node JS, MySQL and React JS.</p>
        </Col>
        <Col className='d-flex align-items-center justify-content-center'>
          <Button
            className="d-flex align-items-center"
            variant="primary"
            onClick={() => {
              setModalShow(true)
            }}>
            <IoIosAddCircle style={{ marginRight: 5 }} /> Adicionar Tarefa
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Nome</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => {
                return (
                  <>
                    <tr key={index + 1}>
                      <td>{index + 1}</td>
                      <td>{task.nome}</td>
                      <td>{task.data}</td>
                      <td>{task.status}</td>
                      <td style={{ width: 120 }}>
                        <Container className="d-flex flex-row justify-content-around">
                          <Button variant="warning" size='sm'>
                            <FiEdit />
                          </Button>
                          <Button variant="danger" size='sm'>
                            <AiFillDelete />
                          </Button>
                        </Container>
                      </td>
                    </tr>
                  </>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <NewTask
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

    </Container>

  );
}

export default App;
