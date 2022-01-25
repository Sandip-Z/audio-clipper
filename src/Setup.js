import App from "App";
import SelectAudio from "Pages/SelectAudio";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTimeslot } from "hook/useTimeslot";
import TimeSlotContext from "Context/TimeSlotContext";

const Setup = () => {
  const {
    audioRef,
    timeSlots,
    audioSource,
    selectedTimeSlot,
    handleAddTimeSlot,
    handleSelectedTimeSlotChanged,
    handleFileUpload,
    handlePlaySelectedTimeSlot,
    handleSelectedTimeSlotTimeChanged,
    deleteTimeSlot,
    removeSource,
    sourceDuration,
  } = useTimeslot();

  return (
    <>
      <TimeSlotContext
        value={{
          audioRef,
          timeSlots,
          audioSource,
          selectedTimeSlot,
          handleAddTimeSlot,
          handleSelectedTimeSlotChanged,
          handleFileUpload,
          handlePlaySelectedTimeSlot,
          handleSelectedTimeSlotTimeChanged,
          deleteTimeSlot,
          removeSource,
          sourceDuration,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route index path="/" element={<SelectAudio />} />
            <Route index path="/clip" element={<App />} />
          </Routes>
        </BrowserRouter>
      </TimeSlotContext>
    </>
  );
};

export { Setup, TimeSlotContext };
