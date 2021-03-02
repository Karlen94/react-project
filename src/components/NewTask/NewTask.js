import React, { Component, createRef } from 'react';
import { Modal, FormControl, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from '../NewTask/newTaskStyle.module.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../../helpersFunctions/utils';
import { connect } from 'react-redux';
import { addTask } from '../../store/actions';



class NewTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date()
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

        const { date } = this.state;

        const newTask = {
            title,
            description,
            date: formatDate(date.toISOString())
        };

        this.props.addTask(newTask);

    }


    handleChangeDate = (value) => {
        this.setState({
            date: value || new Date()
        });
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
                            ref={this.formControlRef}
                        />

                        <FormControl
                            placeholder="Description"
                            name='description'
                            as='textarea'
                            rows={5}
                            onChange={this.handleChange}
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
    onClose: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    addTask
};

export default connect(null, mapDispatchToProps)(NewTask);
