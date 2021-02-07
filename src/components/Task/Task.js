import React, { PureComponent } from 'react';
import { Card, Button } from 'react-bootstrap';
import styles from '../Task/taskStyle.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../helpersFunctions/utils';
import { Link } from 'react-router-dom';
import {textTruncate} from '../../helpersFunctions/utils';

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
        const { disabled, onDelete, selected, onEdit } = this.props;

        return (
            <Card className={`${styles.task} ${selected ? styles.selected : ""}`}>
                <Card.Body>
                    <input
                        type="checkbox"
                        onChange={this.handleChange}
                        checked={selected}
                    />
                    <Link to={`/task/${elem._id}`}>
                        <Card.Title>{elem.title}</Card.Title>
                    </Link>
                    <Card.Text>
                        Description: {textTruncate(elem.description)}
                    </Card.Text>
                    <Card.Text>
                        Date: {formatDate(elem.date)}
                    </Card.Text>
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

export default Task;