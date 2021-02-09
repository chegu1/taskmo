import React, { useEffect } from "react";
import JobsList from "../components/JobsList";
import { useDispatch, useSelector } from "react-redux";
import { listJobs } from "../actions/jobActions";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobList);
  console.log(jobList, "liss");
  const { loading, error, jobs: alljobs } = jobList;
  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Jobs</h1>

      <Row>
        {alljobs &&
          alljobs.map((job) => (
            <Col key={job._id} sm={12} md={6} lg={4} xl={3}>
              <JobsList jobs={job} />
            </Col>
          ))}
      </Row>
      {/* {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )} */}
    </>
  );
};

export default HomeScreen;
