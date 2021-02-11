import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { login } from "../actions/authActions";

const UserSignup = ({ history }) => {
    const [email, setEmail] = useState("");
    const [userTypeJobSeeker, setJobSeeker] = useState(false)

    const dispatch = useDispatch();

    const userLoginMail = useSelector((state) => state.userLogin);
    const { loading, message, error, userInfo } = userLoginMail;
    console.log(userTypeJobSeeker, "userTypeJobSeeker")

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, userTypeJobSeeker));
        setEmail("");
        // history.push('/')
    };
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>Login</h1>
                    {/* <p>{userLoginMail}</p> */}
                    {
                        <p>{userInfo && userInfo.message}</p>
                        // userInfo && <p>{userInfo}</p>
                    }
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
                        <Form.Group controlId="userTypeJobSeeker">
                            <Form.Check type="checkbox"
                                vale={userTypeJobSeeker}
                                label="Job Seeker"
                                checked={userTypeJobSeeker}
                                onChange={(e) => setJobSeeker(e.target.checked)} />

                        </Form.Group>
                        <Button type="submit" variant="primary">
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UserSignup;
