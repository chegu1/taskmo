import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { createJob } from "../actions/jobActions";

const JobCreateScreen = () => {
  const [jobtitle, setJobName] = useState("");
  const [description, setJobDescription] = useState("");
  const [location, setLocation] = useState("");
  const [expires, setExpires] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      getUserAddressBy(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  const getUserAddressBy = (lat, long) => {
    console.log(lat, long);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBYseoHPQjdpX4O669e3PcvTOZCVC_2Rr4`
    )
      .then((resp) => resp.json())
      .then((data) =>
        data.results[0].address_components.map((city) => {
          if (city.types[0] === "administrative_area_level_1") {
            console.log(city);
            setLocation(city.long_name);
          }
        })
      );
  };

  const dispatch = useDispatch();

  const createJobs = useSelector((state) => state.jobCreate);

  const { loading, jobStatus, error } = createJobs;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createJob(jobtitle, description, location, expires));
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h1>Create Job Post</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="jobtitle">
              <Form.Label>Job Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter name"
                value={jobtitle}
                onChange={(e) => setJobName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>JOb Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter description"
                value={description}
                onChange={(e) => setJobDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="location">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter locartion"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="expires">
              <Form.Label>Expires in</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter expires in"
                value={expires}
                onChange={(e) => setExpires(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Create Job
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JobCreateScreen;
