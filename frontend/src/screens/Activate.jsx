import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { activate } from "../actions/authActions";
import axios from "axios";
import jwt from "jsonwebtoken";

const Activate = ({ match, history }) => {
  const [values, setValues] = useState({
    email: "",
    token: "",
    show: true,
  });
  const dispatch = useDispatch();
  const [userotp, setUserOtp] = useState("");
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("");
  const userStatus = useSelector((state) => state.userActivate);
  const { loading, userInfo } = userStatus;

  useEffect(() => {
    let token = match.params.token;
    let { email, otp, userTypeJobSeeker } = jwt.decode(token);
    console.log(userTypeJobSeeker, "job seeker", userStatus);
    if (token) {
      setValues({ ...values, token });
      setOtp(otp);
      setRole(userTypeJobSeeker);
    }
  }, [userStatus]);

  const { email, token, show } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    if (Number(userotp) === otp) {
      dispatch(activate({ token }));
      console.log(userInfo && userInfo.user && userInfo.user.userTypeJobSeeker);
    }
    console.log(loading, userInfo);
    if (role) {
      console.log("hello", role);
      history.push("/userdashboard");
    } else {
      history.push("/employerdashboard");
    }
  };

  return (
    <div className="col-md-6 offset-md-3">
      <div className="text-center">
        <h2 className="p-5">Hey, {email}, Ready to login to your account</h2>
        <Form onSubmit={clickSubmit}>
          <Form.Group controlId="location">
            <Form.Label>Enter Otp</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter locartion"
              value={userotp}
              onChange={(e) => setUserOtp(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <button className="btn btn-outline-primary">Activate Account</button>
        </Form>
        {/* {userInfo &&
        userInfo.user &&
        userInfo.user.userTypeJobSeeker === true ? (
          <Redirect to="/userdashboard" />
        ) : null} */}
      </div>
    </div>
  );
};

export default Activate;
