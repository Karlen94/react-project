import React, { Component } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpersFunctions/utils';
import EditTaskModal from '../../EditTaskModal';

export default class SingleTask extends Component {

    state = {
        task: null,
        openEditModal: false
    };

    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Big error!');
                    }
                }


                this.setState({
                    task: res
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteTask = () => {
        const taskId = this.state.task._id;

        fetch(`http://localhost:3001/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Big error!');
                    }
                }

                this.props.history.push('/');

            })
            .catch((error) => {
                console.log(error);
            })
    }

    handleSaveTask = (editedTask) => {
        fetch(`http://localhost:3001/task/${editedTask._id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(editedTask)
        })
            .then(async (response) => {
                const res = await response.json();

                if (response.status >= 400 && response.status < 600) {
                    if (res.error) {
                        throw res.error;
                    } else {
                        throw new Error('Big error!');
                    }
                }

                this.setState({
                    task: res,
                    openEditModal: false
                })

            })
            .catch((error) => {
                console.log(error);
            })
    }

    toggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }

    render() {
        const { task, openEditModal } = this.state;
        return (
            <div className='mt-5'>
                <Container>
                    <Row>
                        <Col xs={12}>
                            {

                                task ?
                                    <Card className='text-center'>
                                        <Card.Body>


                                            <Card.Title>{task.title}</Card.Title>

                                            <Card.Text>
                                                Description: {task.description}
                                            </Card.Text>
                                            <Card.Text>
                                                Date: {formatDate(task.date)}
                                            </Card.Text>
                                            <Button
                                                className='m-1'
                                                // className={styles.buttonEditTask}
                                                variant="warning"
                                                onClick={this.toggleEditModal}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </Button>

                                            <Button
                                                className='m-1'
                                                // className={styles.buttonDangerTask}
                                                variant="danger"
                                                onClick={this.deleteTask}
                                            >
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>


                                        </Card.Body>

                                    </Card>
                                    :
                                    <p>No task!</p>
                            }
                        </Col>
                    </Row>
                </Container>

                {
                    openEditModal &&
                    <EditTaskModal
                        data={task}
                        onClose={this.toggleEditModal}
                        onSave={this.handleSaveTask}
                    />
                }
            </div>

        );
    };
}