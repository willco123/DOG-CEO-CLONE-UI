import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const Home = (currentLocation: string) => (
  <>
    <h1>This is the Home page</h1>
    <div data-testid="location-display">{currentLocation}</div>
  </>
);
const AllRatings = (currentLocation: string) => (
  <>
    <h1>This is the All Ratings page</h1>
    <div data-testid="location-display">{currentLocation}</div>
  </>
);
const MyRatings = (currentLocation: string) => (
  <>
    <h1>This is the My Ratings page</h1>
    <div data-testid="location-display">{currentLocation}</div>
  </>
);
const Login = (currentLocation: string) => (
  <>
    <h1>This is the Login page</h1>
    <div data-testid="location-display">{currentLocation}</div>
  </>
);
const Register = (currentLocation: string) => (
  <>
    <h1>This is the Register page</h1>
    <div data-testid="location-display">{currentLocation}</div>
  </>
);

const BasicApp = () => {
  const location = useLocation();
  return (
    <>
      <Routes location={location}>
        <Route path="/" element={Home(location.pathname)} />
        <Route path="/dogs" element={AllRatings(location.pathname)} />
        <Route path="/favourites" element={MyRatings(location.pathname)} />
        <Route path="/login" element={Login(location.pathname)} />
        <Route path="/register" element={Register(location.pathname)} />
      </Routes>
    </>
  );
  // return <div data-testid="location-display">{location.pathname}</div>;
};

export default BasicApp;
