import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Formulas from "./Formulas";
import FlowChart from "./FlowChart";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/formulas" element={<Formulas />} />
        <Route path="/flowchart" element={<FlowChart />} />
      </Routes>
    </Router>
  );
}

export default App;
