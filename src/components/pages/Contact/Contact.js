import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styles from './contactStyle.module.css';

export default function Contact() {
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

        if (!value) {
            setErrors({
                ...errors,
                [name]: "Filed is required"
            })
        }
        else {
            setErrors({
                ...errors,
                [name]: null
            })
        }

        if (name === 'email' && value) {
            const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            if (!emailReg.test(value)) {
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

    }

    return (
        <div>
            <Container>
                <Row className='justify-content-center'>
                    <Col xs={7}>
                        <Form className='mt-5'>
                            <h2 className='text-center'>Contact us</h2>
                            <Form.Group>
                                <Form.Control
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
                                    Submit
                                </Button>
                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>


        </div>
    );
}