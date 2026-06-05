import { useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";

ReactGA.initialize("G-VZ4Z26L5L0");

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: location.pathname + location.search,
    });
  }, [location]);

  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-302H8BY6RY"
      ></script>
      <script>
        {`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
 
  gtag('config', 'G-302H8BY6RY');
`}
      </script>
    </>
  );
}

export default AnalyticsTracker;
