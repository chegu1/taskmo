import React from "react";
import { Card } from "react-bootstrap";

const JobsList = ({ jobs }) => {
  console.log(jobs, "compo");
  return (
    <Card className="my-3 p-3 rounded">
      <Card.Body>
        <Card.Title as="h4">
          <strong>{jobs.jobtitle}</strong>
        </Card.Title>
        <Card.Text as="p">{jobs.description}</Card.Text>
        <Card.Text as="p">{jobs.location}</Card.Text>
        <Card.Text as="p">{jobs.expirydate}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default JobsList;
