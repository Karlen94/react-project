import React, { Component } from 'react';

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


    render() {

        const { tasks, inputValue } = this.state;

        return (
            <div>

                <input
                    value={inputValue}
                    type="text"
                    onChange={this.handleChange}
                />

                <button onClick={this.handleClick}>New Task</button>


                <ol>
                    {tasks.map((elem, index) => {
                        return <li key={index}>
                            {elem}
                        </li>

                    })}
                </ol>



            </div>

        )
    }
}

export default ToDo;