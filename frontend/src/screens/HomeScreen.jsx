import React, { useEffect, useState } from "react";
import JobsList from "../components/JobsList";
import { useDispatch, useSelector } from "react-redux";
import { listJobs } from "../actions/jobActions";
// import Message from "../components/Message";
// import Loader from "../components/Loader";
import { Row, Col } from "react-bootstrap";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const jobList = useSelector((state) => state.jobList);
  const [location, setLocation] = useState("");

  const { loading, error, jobs: alljobs } = jobList;
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      getUserAddressBy(position.coords.latitude, position.coords.longitude);
    });
  }, []);

  const getUserAddressBy = (lat, long) => {
    console.log(lat, long);
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=google_api_key`
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
  const filterJobsOnLocation = alljobs.filter(
    (job) => job.location === location
  );
  console.log(alljobs, location, filterJobsOnLocation);

  useEffect(() => {
    dispatch(listJobs());
  }, [dispatch]);

  return (
    <>
      <h5>
        Latest Jobs, based on your location:<h1>{location}</h1>
      </h5>

      <Row>
        {filterJobsOnLocation &&
          filterJobsOnLocation.map((job) => (
            <Col key={job._id} sm={12} md={6} lg={4} xl={3}>
              <JobsList jobs={job} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default HomeScreen;
