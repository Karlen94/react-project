import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';


class NewTask extends Component {

    render() {

        const { addTask, disabled, keyDown, handleChange, value } = this.props;
        return (
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Input tasks"
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    onKeyDown={keyDown}
                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={addTask}
                        disabled={disabled}
                    >
                        New Task
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }




}

export default NewTask;