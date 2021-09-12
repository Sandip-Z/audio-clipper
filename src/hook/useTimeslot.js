import { useRef, useState, useEffect } from "react";
import { TimeSlotService } from "Services/TimeSlotService";

const useTimeslot = () => {
  const audioRef = useRef(null);
  const [sourceDuration, setSourceDuration] = useState(0);
  const [timeSlots, setTimeSlots] = useState(undefined);
  const [audioSource, setAudioSource] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(undefined);

  const { GenerateIdForTimeSlot } = TimeSlotService;

  useEffect(() => {
    var defaultTimeSlot = {
      id: GenerateIdForTimeSlot(),
      startTime: 0,
      endTime: 0,
      selected: true,
    };
    if (audioSource) {
      var loadedMetaDataEvent = audioRef?.current?.addEventListener(
        "loadedmetadata",
        () => {
          const duration = Math.trunc(audioRef?.current?.duration);
          defaultTimeSlot.endTime = duration;
          setSelectedTimeSlot(defaultTimeSlot);
          setTimeSlots([defaultTimeSlot]);
          setSourceDuration(duration);
        }
      );
    }
    return () =>
      loadedMetaDataEvent?.removeEventListener("loadedmetadata", () => {});
  }, [audioSource]);

  const handleSelectedTimeSlotTimeChanged = (id, type, time) => {
    const newTime = {
      ...selectedTimeSlot,
      [type]: time,
    };
    const timeSlotIndex = timeSlots?.findIndex((each) => each.id === id);
    const newTimeSlot = [...timeSlots];
    newTimeSlot[timeSlotIndex] = {
      ...newTimeSlot[timeSlotIndex],
      [type]: time,
    };
    if (id === selectedTimeSlot?.id) {
      setSelectedTimeSlot(newTime);
    }
    setTimeSlots(newTimeSlot);
  };

  const handleSelectedTimeSlotChanged = (id) => {
    const matchedIndex = timeSlots.findIndex((each) => each.id === id);
    const newSelectedTimeSlot = { ...timeSlots[matchedIndex], selected: true };
    const updatedTimeSlot = timeSlots.map((slot) => {
      if (slot.id === id) {
        return {
          ...slot,
          selected: true,
        };
      }
      return {
        ...slot,
        selected: false,
      };
    });
    setSelectedTimeSlot(newSelectedTimeSlot);
    setTimeSlots(updatedTimeSlot);
  };

  const handleAddTimeSlot = () => {
    const newId = GenerateIdForTimeSlot();
    const newTimeSlot = [
      ...timeSlots,
      {
        id: newId,
        startTime: 0,
        endTime: sourceDuration,
        selected: false,
      },
    ];
    setTimeSlots(newTimeSlot);
  };

  const deleteTimeSlot = (id) => {
    const newTimeSlot = timeSlots.filter((each) => each.id !== id);
    setTimeSlots(newTimeSlot);
  };

  const handlePlaySelectedTimeSlot = (id) => {
    const selectedIndex = timeSlots.findIndex((each) => each.id === id);
    setSelectedTimeSlot(timeSlots[selectedIndex]);
  };

  const handleFileUpload = (e) => {
    const source = URL.createObjectURL(e.target.files[0]);
    console.log(source);
    setAudioSource(source);
  };

  const removeSource = () => {
    setAudioSource(null);
  };

  return {
    removeSource,
    handleFileUpload,
    handlePlaySelectedTimeSlot,
    deleteTimeSlot,
    handleAddTimeSlot,
    handleSelectedTimeSlotChanged,
    handleSelectedTimeSlotTimeChanged,
    audioRef,
    sourceDuration,
    timeSlots,
    audioSource,
    selectedTimeSlot,
    setAudioSource,
  };
};

export { useTimeslot };
