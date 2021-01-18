import React, { Component } from 'react';
import style from './toDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';

// problem ToDo folder

class ToDo extends Component {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false
    };




    handleClick = (newTask) => {

        this.setState({
            tasks: [...this.state.tasks, newTask]
        })


    }


    delete = (id) => {


        this.setState({
            tasks: this.state.tasks.filter((task) => id !== task._id),
        });
    }

    toggleTask = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId);
        } else {
            selectedTasks.add(taskId);
        }

        this.setState({
            selectedTasks
        })
    }

    removeSelected = () => {
        const { selectedTasks, tasks } = this.state;
        const newTasks = tasks.filter((elem) => {
            if (selectedTasks.has(elem._id)) {
                return false;
            } else {
                return true;
            }
        });

        this.setState({
            tasks: newTasks,
            selectedTasks: new Set(),
            showConfirm: false
        })

    }

    toggleConfirm = () => {

        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }


    render() {

        const { tasks, selectedTasks, showConfirm } = this.state;

        const taskComponents = tasks.map((elem) => {
            return (<Col
                key={elem._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
            >

                <Task
                    data={elem}
                    onToggle={this.toggleTask}
                    disabled={!!selectedTasks.size}
                    onDelete={this.delete}
                />

            </Col>
            )

        })

        return (
            <div >
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <h1 className={style.h1}>To Do List</h1>
                            <NewTask
                                onAdd={this.handleClick}
                                disabled={!!selectedTasks.size}
                            />
                        </Col>
                    </Row>
                    <Row>
                        {taskComponents}
                    </Row>

                    <Row className="justify-content-center">
                        <Button
                            variant="danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                        >
                            Delete tasks
                        </Button>
                    </Row>
                </Container>

                {showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onConfirm={this.removeSelected}
                        count={selectedTasks.size}
                    />
                }

            </div>

        )
    }
}

export default ToDo;