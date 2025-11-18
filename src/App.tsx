import { useEffect } from "react";
import "./App.css";
import AllRoutes from "./routes/allRoutes";
import { Providers } from "./data/Provider";
import "react-datepicker/dist/react-datepicker.css";
import NetworkStatusBar from "./components/NetworkStatus";
import ErrorBoundary from "./components/ErrorBoundary";
function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    // interswitch
    const interswitchScript = document.createElement("script");
    interswitchScript.src =
      "https://newwebpay.interswitchng.com/inline-checkout.js";
    interswitchScript.async = true;
    document.body.appendChild(interswitchScript);
  }, []);

  return (
    <ErrorBoundary>
      <Providers>
        <AllRoutes />
        <NetworkStatusBar />
      </Providers>
    </ErrorBoundary>
  );
}

export default App;
