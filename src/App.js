import React from "react";
import { Layout } from "./components/common/Layout";
import { Movies } from "./screens/Movies/Movies";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="*" element={<center>Not found page goes here!</center>} />
        </Routes>
      </Layout>
    </Router>

  );
}