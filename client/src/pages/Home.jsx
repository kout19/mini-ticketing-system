import React from "react";
import Header from "../components/Header/Header";
import Modal from  '../components/AughModal/AuthModal';
import LandingPage from './LandingPage';
const Home = () => (
  <div>
    <Header />
    <Modal/>
    <LandingPage/>
  </div>
);

export default Home;