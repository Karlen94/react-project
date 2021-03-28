import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { contactForm } from '../../../store/actions';
import styles from './contactStyle.module.css';

const requiredErrorMessage = "Filed is required";

function Contact(props) {
    const [values, setValues] = useState({
        name: '',
        email: '',
        massage: ''
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        massage: null
    });

    const handleChange = ({ target: { name, value } }) => {

        const valueTrim = value.trim();


        if (!valueTrim) {
            setErrors({
                ...errors,
                [name]: requiredErrorMessage
            })
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            })
        }


        if (name === 'email' && value) {
            const emailReg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

            if (!emailReg.test(valueTrim)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email'
                })
            }
        }

        setValues({
            ...values,
            [name]: value
        })
    };


    const handleSubmit = () => {
        const errorsArr = Object.values(errors);
        const errorsExist = !errorsArr.every(el => el === null);
        const valuesArr = Object.values(values);
        const valuesExist = !valuesArr.some(el => el === '');

        if (valuesExist && !errorsExist) {

            // fetch('http://localhost:3001/form', {
            //     method: 'POST',
            //     body: JSON.stringify(values),
            //     headers: {
            //         'Content-type': 'application/json'
            //     }
            // })
            //     .then(async (response) => {
            //         const res = await response.json();

            //         if (response.status >= 400 && response.status < 600) {
            //             if (res.error) {
            //                 throw res.error;
            //             } else {
            //                 throw new Error('Big error!');
            //             }
            //         }

            //         setValues({
            //             name: '',
            //             email: '',
            //             massage: ''
            //         })
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     })
            props.contactForm(values);

            //     return;
        }

        if (!valuesExist && !errorsExist) {
            setErrors({
                name: requiredErrorMessage,
                email: requiredErrorMessage,
                massage: requiredErrorMessage
            })
        }
        console.log(values);

    }

    // const { sendFormSucces } = this.props;

    /*useEffect(() => {
        if (sendFormSucces) {
            setValues({
                name: '',
                email: '',
                massage: ''
            })
        }
    }, [sendFormSucces]);*/

    return (
        <div className={styles.contactUs}>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={7}>
                        <Form className='mt-5'>
                            <h2 className='text-center'>Contact us</h2>
                            <Form.Group>
                                <Form.Control
                                    className={errors.name ? styles.invalid : ''}
                                    type="text"
                                    placeholder="Enter your name"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.name}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.email ? styles.invalid : ''}
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.email}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group>
                                <Form.Control
                                    className={errors.massage ? styles.invalid : ''}
                                    as="textarea"
                                    placeholder="Enter your massage"
                                    rows={5}
                                    name="massage"
                                    value={values.massage}
                                    onChange={handleChange}
                                />
                                <Form.Text className="text-danger">
                                    {errors.massage}
                                </Form.Text>
                            </Form.Group>
                            <div className="text-center">
                                <Button
                                    variant="primary"
                                    onClick={handleSubmit}
                                    className={styles.buttonSubmit}
                                >
                                    Send
                                </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>


        </div>
    );
}

const mapDispatchToProps = {
    contactForm
};

export default connect(null, mapDispatchToProps)(Contact);

