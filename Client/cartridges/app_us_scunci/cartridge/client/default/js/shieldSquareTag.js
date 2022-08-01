
  (function(w, d, e, u, c, g, a, b){
    w["SSJSConnectorObj"] = w["SSJSConnectorObj"] || {ss_cid : c, domain_info: "auto"};
    w[g] = function(i, j){w["SSJSConnectorObj"][i] = j};
    a = d.createElement(e);
    a.async = true;
    a.src = u;
    b = d.getElementsByTagName(e)[0];
    b.parentNode.insertBefore(a, b);
    console.log(a+' '+b+' '+d);

  })(window,document,"script","https://cdn.perfdrive.com/aperture/aperture.js","bgtd","ssConf");

    ssConf("c1" , "https://cas.avalon.perfdrive.com");