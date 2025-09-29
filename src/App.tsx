import { useEffect, useState } from "react";
import "./App.css";
import AllRoutes from "./routes/allRoutes";
import { Providers } from "./data/Provider";
import "react-datepicker/dist/react-datepicker.css";
import NetworkStatusBar from "./components/NetworkStatus";
import ErrorBoundary from "./components/ErrorBoundary";

// import TawkTo from "./components/TawkTo/TawkTo";
// import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
// "@tawk.to/tawk-messenger-react": "^2.0.2",

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <ErrorBoundary>
      <Providers>
        <AllRoutes />
        <NetworkStatusBar />
        {/* <TawkMessengerReact
        propertyId="66ad19831601a2195ba01fda"
        widgetId="1i4a2nafr"
        /> */}
      </Providers>
    </ErrorBoundary>
  );
}

export default App;
