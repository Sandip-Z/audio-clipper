import App from "App";
import SelectAudio from "Pages/SelectAudio";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Setup = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route index path="/" element={<SelectAudio />} />
        <Route index path="/clip" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Setup;
