import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import idGenerator from '../../helpersFunctions/idGenerator';
import PropTypes from 'prop-types';


class NewTask extends Component {

    state = {
        title: '',
        description: ''
    }

    handleChange = (event) => {
        this.setState({
            title: event.target.value

        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        const title = this.state.title.trim();
        const description = this.state.description.trim();


        if (!title) {
            return;
        }

        const newTask = {
            _id: idGenerator(),
            title: title,
            description: description
        };

        this.props.onAdd(newTask);
        this.setState({
            title: '',
            description: ''
        })
    }

    render() {
        const { title, description } = this.state;
        const { disabled } = this.props;

        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Title"
                    value={title}
                    onChange={this.handleChange}
                    disabled={disabled}
                    onKeyDown={this.handleKeyDown}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.handleSubmit}
                        disabled={disabled}
                    >
                        New Task
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }




}

NewTask.propTypes = {
    disabled: PropTypes.bool.isRequired,
    onAdd: PropTypes.func.isRequired,
};

export default NewTask;