import React, { Component, createRef } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './NewTask/newTaskStyle.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../helpersFunctions/utils';
import { editTask } from '../store/actions';
import { connect } from 'react-redux';

class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        const { date } = props.data;
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        }

        this.formControlRef = createRef();
    }

    componentDidMount() {
        this.formControlRef.current.focus();
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

        const editedTask = {
            _id: this.state._id,
            title,
            description,
            date: formatDate(this.state.date.toISOString())
        }

        this.props.editTask(editedTask, this.props.from);
        
        if(this.props.from==='single'){
            this.props.onClose()
        }

    }

    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        });
    }

    render() {

        const { onClose } = this.props;
        const { title, description } = this.state;

        return (
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
                        Edit Task
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        name='title'
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyDown}
                        value={title}
                        className='mb-3'
                        ref={this.formControlRef}
                    />

                    <FormControl
                        placeholder="Description"
                        name='description'
                        as='textarea'
                        rows={3}
                        onChange={this.handleChange}
                        value={description}
                    />
                    <DatePicker
                        className={styles.dateRow}
                        minDate={new Date()}
                        selected={this.state.date}
                        onChange={this.handleChangeDate}
                    />

                </Modal.Body>
                <Modal.Footer>
                    <Button
                        onClick={this.handleSubmit}
                        variant='success'
                    >
                        Save
                        </Button>
                    <Button
                        onClick={onClose}
                        variant='secondary'
                    >
                        Cancel</Button>
                </Modal.Footer>
            </Modal>
        )
    }




}

EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    editTask
};

export default connect(null, mapDispatchToProps)(EditTaskModal);