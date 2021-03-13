import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../Task/taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit, faCheck, faRedo } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../helpersFunctions/utils';
import { Link } from 'react-router-dom';
import { textTruncate } from '../../helpersFunctions/utils';
import { editTask } from '../../store/actions';
import { connect } from 'react-redux';

class Task extends PureComponent {

    // static propTypes = {
    //     data: PropTypes.object.isRequired,
    //     onToggle: PropTypes.func.isRequired,
    //     disabled: PropTypes.bool.isRequired,
    //     onDelete: PropTypes.func.isRequired,
    // };



    handleChange = () => {
        const { data, onToggle } = this.props;
        onToggle(data._id);

    }

    render() {

        const elem = this.props.data;
        const { disabled, onDelete, selected, onEdit, editTask } = this.props;

        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={selected}
                    />
                    <Link to={`/task/${elem._id}`}>
                        <Card.Title>{textTruncate(elem.title, 25)}</Card.Title>
                    </Link>
                    <Card.Text>
                        Description: {textTruncate(elem.description, 60)}
                    </Card.Text>
                    <Card.Text>
                        Status: {elem.status}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(elem.date)}
                    </Card.Text>

                    {elem.status === 'active' ?
                        <Button
                            className={styles.buttonCheckTask}
                            variant="success"
                            disabled={disabled}
                            onClick={() => editTask({
                                status: 'done',
                                _id: elem._id
                            })}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </Button> :
                        <Button
                            className={styles.buttonRedoTask}
                            variant="secondary"
                            disabled={disabled}
                            onClick={() => editTask({
                                status: 'active',
                                _id: elem._id
                            })}
                        >
                            <FontAwesomeIcon icon={faRedo} />
                        </Button>

                    }




                    <Button
                        className={styles.buttonEditTask}
                        variant="warning"
                        disabled={disabled}
                        onClick={() => onEdit(elem)}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>

                    <Button
                        className={styles.buttonDangerTask}
                        variant="danger"
                        onClick={() => onDelete(elem._id)}
                        disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>


                </Card.Body>

            </Card>

        )
    }


}

Task.propTypes = {
    data: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    selected: PropTypes.bool.isRequired,
};

const mapDispatchToProps = {
    editTask,
};

export default connect(null, mapDispatchToProps)(Task);