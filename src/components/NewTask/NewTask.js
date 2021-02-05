import React, { PureComponent } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from '../NewTask/newTaskStyle.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



class NewTask extends PureComponent {

    state = {
        title: '',
        description: ''
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
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
            title,
            description
        };

        this.props.onAdd(newTask);

    }

    render() {
        const { onClose } = this.props;

        return (
            <>
                <Modal
                    show={true}
                    onHide={onClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title
                            id="contained-modal-title-vcenter"
                            className={styles._modalTitle}
                        >
                            Add New Task
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl
                            placeholder="Title"
                            name='title'
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyDown}
                            className='mb-3'
                        />

                        <FormControl
                            placeholder="Description"
                            name='description'
                            as='textarea'
                            rows={5}
                            onChange={this.handleChange}
                        />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={this.handleSubmit}
                            variant='success'
                        >
                            Add
                        </Button>
                        <Button
                            onClick={onClose}
                            variant='secondary'
                        >
                            Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }




}

NewTask.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default NewTask;