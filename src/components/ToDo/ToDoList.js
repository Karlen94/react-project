import React, { PureComponent } from 'react';
import style from './toDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';

// problem ToDo folder

class ToDo extends PureComponent {

    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null,
    };




    handleClick = (newTask) => {

        this.setState({
            tasks: [...this.state.tasks, newTask],
            openNewTaskModal: false
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

    selectAll = () => {
        const taskIds = this.state.tasks.map((task) => task._id);

        this.setState({
            selectedTasks: new Set(taskIds)
        })
    }

    deSelectAll = () => {
        this.setState({
            selectedTasks: new Set()
        })
    }

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }

    handleEdit = (editTask) => {
        this.setState({
            editTask
        })
    }

    handleSaveTask = (editTask) => {
        const tasks = [...this.state.tasks];
        const foundIndex = tasks.findIndex((task) => task._id === editTask._id);
        tasks[foundIndex] = editTask;
        this.setState({
            tasks,
            editTask: null
        })

    }


    render() {

        const { tasks, selectedTasks, showConfirm, openNewTaskModal, editTask } = this.state;

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
                    selected={selectedTasks.has(elem._id)}
                    onEdit={this.handleEdit}
                />

            </Col>
            )

        })

        return (
            <div className={style.toDoDiv}>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <h1 className={style.h1}>To Do List</h1>

                        </Col>
                    </Row>


                    <Row className="justify-content-center">

                        <Col>
                            <Button
                                xs={3}
                                className={style.addNewTaskButton}
                                variant='success'
                                onClick={this.toggleNewTaskModal}
                            >
                                +Add New Task
                        </Button>
                        </Col>
                        <Col>
                            <Button
                                xs={3}
                                className={style.selectAll}
                                variant="warning"
                                onClick={this.selectAll}
                                disabled={tasks.length === 0}
                            >
                                Select All
                        </Button>
                        </Col>
                        <Col>
                            <Button
                                xs={3}
                                className={style.deselectTask}
                                variant="warning"
                                onClick={this.deSelectAll}
                                disabled={tasks.length === 0}
                            >
                                Deselect tasks
                    </Button>
                        </Col>
                        <Col>
                            <Button
                                xs={3}
                                className={style.deleteTask}
                                variant="danger"
                                onClick={this.toggleConfirm}
                                disabled={!selectedTasks.size}
                            >
                                Delete tasks
                        </Button>
                        </Col>

                    </Row>

                    <Row>
                        {taskComponents}
                    </Row>


                </Container>

                {showConfirm &&
                    <Confirm
                        onClose={this.toggleConfirm}
                        onConfirm={this.removeSelected}
                        count={selectedTasks.size}
                    />
                }

                {openNewTaskModal &&
                    <NewTask
                        onAdd={this.handleClick}
                        onClose={this.toggleNewTaskModal}
                    />
                }

                {editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={() => this.handleEdit(null)}
                        onSave={this.handleSaveTask}
                    />}
            </div>

        )
    }
}

export default ToDo;