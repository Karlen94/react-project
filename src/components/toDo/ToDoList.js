import React, { Component } from 'react';
import style from '../toDo/toDo.module.css';
import { Container, Row, Col, Card, Button, InputGroup, FormControl, FormCheck } from 'react-bootstrap';
import idGenerator from '../../helpersFunctions/idGenerator';

class ToDo extends Component {


    state = {
        tasks: [],
        inputValue: '',
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

    render() {

        const { tasks, inputValue } = this.state;

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
                    <FormCheck />
                    <Card.Body>
                        <Card.Title>{elem.title}</Card.Title>
                        <Card.Text>
                            Some quick example text
                        </Card.Text>
                        <Button
                            variant="danger"
                            onClick={() => this.delete(elem._id)}
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
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.handleClick}
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
                </Container>



            </div>

        )
    }
}

export default ToDo;