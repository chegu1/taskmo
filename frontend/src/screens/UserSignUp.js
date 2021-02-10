import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { login } from "../actions/authActions";

const UserSignup = () => {
    const [email, setEmail] = useState("");

    const dispatch = useDispatch();

    // const createJobs = useSelector((state) => state.jobCreate);

    // const { loading, jobStatus, error } = createJobs;

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email));
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Employer Login</h1>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="jobtitle">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>


                        <Button type="submit" variant="primary">
                            Next
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UserSignup;
