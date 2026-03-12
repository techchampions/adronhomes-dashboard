import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatusBar from "./components/NetworkStatus";
import { Providers } from "./data/Provider";
import AllRoutes from "./routes/allRoutes";
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
