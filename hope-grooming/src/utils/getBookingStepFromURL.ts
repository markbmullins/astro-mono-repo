export const getStepFromURL = () => {
  const urlParams = new URLSearchParams(window?.location?.search);
  const stepParam = urlParams.get("step");
  return stepParam ? parseInt(stepParam) : 1;
};
