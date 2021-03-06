import React, { PureComponent } from 'react';
import style from './toDo.module.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Task from '../Task/Task';
import NewTask from '../NewTask/NewTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal';
import Search from '../Search/Search';
import { connect } from 'react-redux';
import { getTasks, deleteTask, deleteTasks } from '../../store/actions';

class ToDo extends PureComponent {

    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        openNewTaskModal: false,
        editTask: null,
    };


    componentDidMount() {

        this.props.getTasks();


    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.setState({
                openNewTaskModal: false
            });
            return;
        }
        if (!prevProps.deleteTasksSuccess && this.props.deleteTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
            return;
        }
        if (!prevProps.editTasksSuccess && this.props.editTasksSuccess) {
            this.setState({
                editTask: null
            });
            return;
        }

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
        const { selectedTasks } = this.state;

        this.props.deleteTasks(selectedTasks);

    }

    toggleConfirm = () => {

        this.setState({
            showConfirm: !this.state.showConfirm
        })
    }

    selectAll = () => {
        const taskIds = this.props.tasks.map((task) => task._id);

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
        this.setState({ editTask })
    }




    render() {
        const { selectedTasks, showConfirm, openNewTaskModal, editTask } = this.state;
        const { tasks } = this.props;

        const taskComponents = tasks.map((elem) => {
            return (<Col
                key={elem._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
                className={style.task}
            >

                <Task
                    data={elem}
                    onToggle={this.toggleTask}
                    disabled={!!selectedTasks.size}
                    onDelete={this.props.deleteTask}
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
                        <Col xs={10}>
                            <Search />
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
                                Add New Task
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
                        onClose={this.toggleNewTaskModal}
                    />
                }

                {editTask &&
                    <EditTaskModal
                        data={editTask}
                        onClose={() => this.handleEdit()}
                    />}
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        deleteTasksSuccess: state.deleteTasksSuccess,
        editTasksSuccess: state.editTasksSuccess
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getTasks: () => {
//             request('http://localhost:3001/task')
//                 .then((tasks) => {
//                     dispatch({ type: 'GET_TASKS', tasks: tasks })
//                 })
//         }
//     }
// };


const mapDispatchToProps = {
    getTasks,
    deleteTask,
    deleteTasks
};

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);