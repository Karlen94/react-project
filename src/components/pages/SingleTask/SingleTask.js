import React, { Component } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './singleTaskStyle.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpersFunctions/utils';
import EditTaskModal from '../../EditTaskModal';
import { getTask, deleteTask, editTask } from '../../../store/actions';
import { connect } from 'react-redux';


class SingleTask extends Component {

    state = {
        openEditModal: false
    };

    componentDidMount() {
        const taskId = this.props.match.params.taskId;
        this.props.getTask(taskId);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openEditModal: false
            });
            return;
        }
    }

    deleteTask = () => {
        const taskId = this.props.match.params.taskId;
        this.props.deleteTask(taskId, 'single');
        // fetch(`http://localhost:3001/task/${taskId}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-type': 'application/json'
        //     }
        // })
        //     .then(async (response) => {
        //         const res = await response.json();

        //         if (response.status >= 400 && response.status < 600) {
        //             if (res.error) {
        //                 throw res.error;
        //             } else {
        //                 throw new Error('Big error!');
        //             }
        //         }

        //         this.props.history.push('/');

        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }



    toggleEditModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        })
    }

    render() {
        const { openEditModal } = this.state;
        const { task, editTask } = this.props;
        return (
            <div className={styles.singleTask}>
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
                                                Status: {task.status}
                                            </Card.Text>
                                            <Card.Text>
                                                Created at: {formatDate(task.created_at)}
                                            </Card.Text>
                                            <Card.Text>
                                                Date: {formatDate(task.date)}
                                            </Card.Text>
                                            {task.status === 'active' ?
                                                <Button
                                                    // className={styles.buttonCheckTask}
                                                    variant="success"
                                                    onClick={() => editTask({
                                                        status: 'done',
                                                        _id: task._id
                                                    }, 'single')}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} />
                                                </Button> :
                                                <Button
                                                    // className={styles.buttonRedoTask}
                                                    variant="secondary"
                                                    onClick={() => editTask({
                                                        status: 'active',
                                                        _id: task._id
                                                    }, 'single')}
                                                >
                                                    <FontAwesomeIcon icon={faRedo} />
                                                </Button>

                                            }
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
                        from='single'
                    />
                }
            </div>

        );
    };
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess,
    }
};

const mapDispatchToProps = {
    getTask,
    deleteTask,
    editTask
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask);