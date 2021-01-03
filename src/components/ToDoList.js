import React, { Component } from 'react';
import style from '../components/toDo.module.css';
import { Container, Row, Col } from 'react-bootstrap';

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

        let arr = [...this.state.tasks];
        arr.push(inputValue);

        this.setState({
            tasks: arr,
            inputValue: ''
        })


    }

    toggleSelect = () => {

    }

    delete = (id) => {
        // let arr = this.state.tasks.splice(id, 1);
        // arr = [...this.state.tasks]
        this.state.tasks.splice(id, 1);

        this.setState({
            tasks: [...this.state.tasks],
        });
    }

    render() {

        const { tasks, inputValue } = this.state;

        const taskComponents = tasks.map((elem, index) => {
            return (<Col
                key={index}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={2}
            >
                <div className={style.box}><input type="checkbox" onClick={this.toggleSelect} />
                    <li>
                        {elem}
                    </li>
                    <button onClick={() => { this.delete(index) }}>Delete</button>
                </div>
            </Col>
            )

        })

        return (
            <div className={style.toDo}>

                <h1>To Do List</h1>
                <input
                    value={inputValue}
                    type="text"
                    onChange={this.handleChange}
                />

                <button onClick={this.handleClick}>New Task</button>


                {/* <ol>
                    {taskComponents}
                </ol>
               */}
                <Container>
                    <Row>
                        {taskComponents}
                    </Row>
                </Container>



            </div>

        )
    }
}

export default ToDo;