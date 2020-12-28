import React, { Component } from 'react';
import style from '../components/toDo.module.css';

class ToDo extends Component {


    state = {
        tasks: [],
        inputValue: '',
    }


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

        return (
            <div className={style.toDo}>
                <h1>To Do List</h1>
                <input
                    value={inputValue}
                    type="text"
                    onChange={this.handleChange}
                />

                <button onClick={this.handleClick}>New Task</button>

                <div>
                    <ol>
                        {tasks.map((elem, index) => {
                            return <div key={index} className={style.box}>
                                <li key={index}>
                                    {elem} <input type="checkbox" onClick={this.toggleSelect} />
                                    <button onClick={() => { this.delete(index) }}>Delete</button>
                                </li>

                            </div>

                        })}

                    </ol>

                </div>



            </div>

        )
    }
}

export default ToDo;