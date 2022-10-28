import React, { useEffect, useState } from 'react';
import { Button, Table, Row, Col, Container } from 'react-bootstrap';
import './App.css';
import Api from './functions/Api'
import { FiEdit } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { IoIosAddCircle } from 'react-icons/io'
import NewTask from './modals/NewTask';
import UpdateTask from './modals/UpdateTask';

function App() {
  //Tasks
  const [tasks, setTasks] = useState()

  //Modals Configs
  const [newTask, setNewTask] = useState(false);
  const [updateTask, setUpdateTask] = useState(false);

  //Params for Funcions
  const [updateTaskParams, setUpdateTaskParams] = useState(); //UploadTask

  useEffect(() => {
    //Updates the table
    const data = {
      key: "key123"
    }
    Api.post('/read', data)
      .then((res) => {
        setTasks(res.data)
      })
      .catch(err => console.error(err))
  }, [newTask, updateTask])



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
              setNewTask(true)
            }}>
            <IoIosAddCircle style={{ marginRight: 5 }} /> Adicionar Tarefa
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Data</th>
                <th width={130}>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map((task, index) => {
                return (
                  <tr key={task.id}>
                    <td>{index + 1}</td>
                    <td>{task.nome}</td>
                    <td>{task.data}</td>
                    <td className='d-flex align-items-center justify-content-center' width={130}>
                      <div className={`task-${task.status}`}>{task.status}</div>
                    </td>
                    <td style={{ width: 120 }}>

                      <Container className="d-flex flex-row justify-content-around">
                        <Button variant="warning" size='sm' onClick={() => { setUpdateTask(true); setUpdateTaskParams(task) }}>
                          <FiEdit />
                        </Button>
                        <Button variant="danger" size='sm'>
                          <AiFillDelete />
                        </Button>
                      </Container>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
      </Row>

      <NewTask
        show={newTask}
        onHide={() => setNewTask(false)}
      />
      <UpdateTask
        show={updateTask}
        params={updateTaskParams}
        onHide={() => setUpdateTask(false)}
      />

    </Container>

  );
}

export default App;
