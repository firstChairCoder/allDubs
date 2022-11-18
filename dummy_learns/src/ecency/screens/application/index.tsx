import React from "react";

import ApplicationContainer from "./container/applicationContainer";

interface ApplicationProps {}

const Application = () => {
  //New hook to handle all custom app inits
  // it'll help clean index.tsx to stay clean and completely discard AppContainer moving forward
  useInitApplication();

  return <ApplicationContainer />;
};

export default Application;
