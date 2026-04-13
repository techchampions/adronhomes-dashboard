import { useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import ErrorBoundary from "./components/ErrorBoundary";
import NetworkStatusBar from "./components/NetworkStatus";
import { Providers } from "./data/Provider";
import AllRoutes from "./routes/allRoutes";

function App() {
  useEffect(() => {
    // Paystack script
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);

    // Interswitch script
    const interswitchScript = document.createElement("script");
    interswitchScript.src =
      "https://newwebpay.interswitchng.com/inline-checkout.js";
    interswitchScript.async = true;
    document.body.appendChild(interswitchScript);

    // TikTok Pixel Code
    const tiktokScript = document.createElement("script");
    tiktokScript.innerHTML = `
      !function (w, d, t) {
        w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
        var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script")
        ;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
        ttq.load('D6LBL73C77U5049K047G');
        ttq.page();
      }(window, document, 'ttq');
    `;
    document.body.appendChild(tiktokScript);

    // Meta (Facebook) Pixel Code
    const metaScript = document.createElement("script");
    metaScript.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2259472234373802');
      fbq('track', 'PageView');
    `;
    document.body.appendChild(metaScript);

    // Meta Pixel Noscript Image
    const metaNoscript = document.createElement("noscript");
    const metaImg = document.createElement("img");
    metaImg.height = 1;
    metaImg.width = 1;
    metaImg.style.display = "none";
    metaImg.src =
      "https://www.facebook.com/tr?id=2259472234373802&ev=PageView&noscript=1";
    metaNoscript.appendChild(metaImg);
    document.body.appendChild(metaNoscript);

    // X (Twitter) conversion tracking base code
    const twitterScript = document.createElement("script");
    twitterScript.innerHTML = `
      !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
      },s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='https://static.ads-twitter.com/uwt.js',
      a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
      twq('config','nvq8z');
    `;
    document.body.appendChild(twitterScript);
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