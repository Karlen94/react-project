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
        let arr = this.state.tasks;
        arr.push(this.state.inputValue);

        this.setState({
            tasks: arr,
        })


    }




    render() {

        return (
            <div>

                <input
                    value={this.state.inputValue}
                    type="text"
                    onChange={this.handleChange}
                />

                <button onClick={this.handleClick}>New Task</button>


                {this.state.tasks.map((elem, index) => {
                    return <ul key={index}>
                        <li>{elem}</li>
                    </ul>

                })}



            </div>

        )
    }
}

export default ToDo;