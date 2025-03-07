import React, { useState, useEffect, useRef } from "react";
import ServiceSelector from "./ServiceSelector";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import Confirmation from "./Confirmation";
import { services } from "../../data/services";

export interface BookingData {
  service: string;
  date: string;
  time: string;
}

const BookingForm: React.FC = () => {
  const [step, setStep] = useState<number>(1); // Initialize with default value

  const [bookingData, setBookingData] = useState<BookingData>({
    service: "",
    date: "",
    time: "",
  });

  const [loaded, setLoaded] = useState(false);
  // Tracks the very first render, so we can `replaceState` instead of `pushState`
  const isInitialRender = useRef(true);

  console.log({ bookingData });

  // **Get the step from the URL hash on component mount**
  useEffect(() => {
    if (typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);

    // Parse step from "?step=2"
    const stepParam = urlParams.get("step");
    const parsedStep = stepParam ? parseInt(stepParam) : 1;
    const initialStep = isNaN(parsedStep) || parsedStep < 1 ? 1 : parsedStep;

    // Parse service from "?service=1"
    const serviceId = urlParams.get("service") || "";
    let initialServiceName = "";
    if (serviceId) {
      // We assume `serviceId` is numeric, then find its name in `services`.
      // If you store the service *name* in the URL, you could skip the find().
      const matchedService = services.find(
        (svc) => svc.id === parseInt(serviceId, 10)
      );
      if (matchedService) {
        initialServiceName = matchedService.name;
      }
    }

    setStep(initialStep);

    setBookingData((prevData) => ({
      ...prevData,
      service: initialServiceName,
    }));

    // If we have history state from a previous pushState, restore that
    const initialState = window.history.state;
    if (initialState && initialState.bookingData) {
      setBookingData(initialState.bookingData);
      if (typeof initialState.step === "number") {
        setStep(initialState.step);
      }
    }

    setLoaded(true);
  }, []);

  // 2. Clear service when stepping back to step 1
  useEffect(() => {
    if (step === 1 && bookingData.service !== "") {
      setBookingData((prev) => ({ ...prev, service: "" }));
    }
  }, [step]);

  /**
   * 3) Whenever `step` or `bookingData` changes, push new state + query params
   *    to the browser history (no #hash).
   */
  useEffect(() => {
    if (!loaded || typeof window === "undefined") return;

    const urlParams = new URLSearchParams(window.location.search);

    // Always sync step to "?step=..."
    urlParams.set("step", step.toString());

    // Optionally sync the "service" param if we have one
    // NOTE: bookingData.service is the *name*, not the ID
    if (bookingData.service) {
      // You could find the service by name -> ID if needed
      const matched = services.find((s) => s.name === bookingData.service);
      if (matched) {
        urlParams.set("service", matched.id.toString());
      }
    } else {
      urlParams.delete("service");
    }

    // Construct the new URL, preserving pathname
    const newUrl = `${window.location.pathname}?${urlParams.toString()}`;
    const newState = { step, bookingData };

    if (isInitialRender.current) {
      // Replace the current history entry the first time
      isInitialRender.current = false;
      window.history.replaceState(newState, "", newUrl);
    } else {
      // Subsequent changes push a new entry
      window.history.pushState(newState, "", newUrl);
    }
  }, [step, bookingData]);

  /**
   * 4) Listen for forward/back navigation. If the user goes back/forward,
   *    popstate will give us the saved `step` & `bookingData`.
   */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handlePopState = (event: PopStateEvent) => {
      if (event.state) {
        setStep(event.state.step || 1);
        setBookingData(
          event.state.bookingData || { service: "", date: "", time: "" }
        );
      } else {
        // No saved state: reset
        setStep(1);
        setBookingData({ service: "", date: "", time: "" });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = (field?: keyof BookingData) => {
    if (field) {
      updateBookingData({ [field]: "" });
    }
    setStep((prevStep) => (prevStep > 1 ? prevStep - 1 : 1));
  };

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData({ ...bookingData, ...data });
  };

  if (!loaded) {
    return null; // or a "Loading..." spinner
  }

  switch (step) {
    case 1:
      return (
        <ServiceSelector
          nextStep={nextStep}
          bookingData={bookingData}
          updateBookingData={updateBookingData}
        />
      );
    case 2:
      return (
        <DatePicker
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          updateBookingData={updateBookingData}
        />
      );
    case 3:
      return (
        <TimePicker
          nextStep={nextStep}
          prevStep={prevStep}
          bookingData={bookingData}
          updateBookingData={updateBookingData}
        />
      );
    case 4:
      return <Confirmation prevStep={prevStep} bookingData={bookingData} />;
    default:
      return null;
  }
};

export default BookingForm;
