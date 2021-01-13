import React, { Component } from 'react';
import style from '../toDo/toDo.module.css';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import idGenerator from '../../helpersFunctions/idGenerator';

class ToDo extends Component {


    state = {
        tasks: [],
        inputValue: '',
        selectedTasks: new Set()
    };


    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value

        })
    }

    handleClick = () => {
        const inputValue = this.state.inputValue.trim();
        if (!inputValue) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: inputValue
        };


        this.setState({
            tasks: [...this.state.tasks, newTask],
            inputValue: ''
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
            selectedTasks: new Set()
        })

    }

    handleKeyDown = (event) => {
        if(event.key === "Enter"){
             this.handleClick();
        }
    }



    render() {

        const { tasks, inputValue, selectedTasks } = this.state;

        const taskComponents = tasks.map((elem) => {
            return (<Col
                key={elem._id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
            >

                <Card className={style.task}>

                    <Card.Body>
                        <input
                            type="checkbox"
                            onChange={() => this.toggleTask(elem._id)}
                        />
                        <Card.Title>{elem.title}</Card.Title>
                        <Card.Text>
                            Some quick example text
                        </Card.Text>
                        <Button
                            variant="danger"
                            onClick={() => this.delete(elem._id)}
                            disabled={!!selectedTasks.size}
                        >
                            Delete
                        </Button>
                    </Card.Body>
                </Card>



            </Col>
            )

        })

        return (
            <div >
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10}>
                            <h1>To Do List</h1>


                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Input tasks"
                                    value={inputValue}
                                    onChange={this.handleChange}
                                    disabled={!!selectedTasks.size}
                                    onKeyDown={this.handleKeyDown}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.handleClick}
                                        disabled={!!selectedTasks.size}
                                    >
                                        New Task
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {taskComponents}
                    </Row>

                    <Row className="justify-content-center">
                        <Button
                            variant="danger"
                            onClick={this.removeSelected}
                            disabled={!selectedTasks.size}
                        >
                            Delete tasks
                        </Button>
                    </Row>
                </Container>



            </div>

        )
    }
}

export default ToDo;