import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import axios from "axios";

const JobsList = ({ jobs, history }) => {
  // console.log(jobs, "compo");
  const userStatus = useSelector((state) => state.userActivate);
  const { loading, userInfo } = userStatus;
  const {
    user: { _id },
    token,
  } = userInfo;
  // console.log(token);
  const [appliedlist, setAppliedList] = useState([]);
  console.log(appliedlist, "applied");
  const submitHandler = (id, e) => {
    e.preventDefault();
    console.log(id);
    axios({
      method: "GET",
      url: `http://localhost:5000/api/getbyid/${id}`,
    })
      .then((res) => {
        setAppliedList([...appliedlist, res.data.getJobById]);
        // console.log("account activation", res.data.getJobById);
      })
      .catch((error) => {
        // console.log(error.response.data, "signup");
      });

    axios({
      method: "POST",
      url: `http://localhost:5000/api/apply`,
      data: { appliedlist, id, _id },
    })
      .then((res) => {
        console.log(res);
        // setAppliedList([...appliedlist, res.data.getJobById]);
        // console.log("account activation", res.data.getJobById);
      })
      .catch((error) => {
        // console.log(error.response.data, "signup");
      });
  };
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Title as="h4">
          <strong>{jobs.jobtitle}</strong>
        </Card.Title>
        <Card.Text as="p">{jobs.description}</Card.Text>
        <Card.Text as="p">{jobs.location}</Card.Text>
        <Card.Text as="p">{jobs.expirydate}</Card.Text>

        <Button
          disabled={
            !(
              new Date(jobs.expirydate).getTime() / 1000 >
              new Date().getTime() / 1000
            )
          }
          onClick={(e) => {
            submitHandler(jobs._id, e);
          }}
        >
          Apply
        </Button>
      </Card.Body>
    </Card>
  );
};

export default JobsList;
