import { useEffect } from "react";

const FacebookMetaScript = () => {
  useEffect(() => {
    // Meta (Facebook) Pixel Code
    const metaScript = document.createElement("script");
    metaScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            
            fbq('init', '1052724756281725');
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
      "https://www.facebook.com/tr?id=1052724756281725&ev=PageView&noscript=1";
    metaNoscript.appendChild(metaImg);
    document.body.appendChild(metaNoscript);
  }, []);

  return null;
};

export default FacebookMetaScript;
