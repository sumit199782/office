/*!
 * PowerReviews, Copyright 2020
 * 956fe54ce | 2020-10-16
 */
(window.pwrJsonp=window.pwrJsonp||[]).push([[16],{171:function(e,t,a){"use strict";var r=a(106),i=a.n(r),n=a(109),l=a.n(n),s=(a(107),a(211),a(136)),c=a(116),o=a.n(c);function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),a.push.apply(a,r)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach(function(t){l()(e,t,a[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))})}return e}var f=function(e){var t=e.size,a=e.msqData,r=a.display_values.map(function(e,t){var r=a.values.filter(function(t){return t.label===e})[0];return r?p(p({},r),{},{position:t}):{label:e,count:0,position:t}}),n=[0,0,0,0,0].slice(0,t).map(function(e,t){var a=o()("pr-size-fit_slider_node",{"pr-size-fit_slider_node--active":Math.round(Object(s.b)(r))===t});return i.a.createElement("div",{key:t,className:a})});return i.a.createElement("div",{className:"pr-size-fit_slider",role:"img","aria-label":Object(s.a)(r)},i.a.createElement("div",{className:"pr-size-fit_slider_node-group"},n),i.a.createElement("div",{className:"pr-size-fit_slider_line"}))};a(212);function d(e){var t,a=e.labelPosition,r=e.msqData,n=e.msqData.display_values;return t="sides"===a?b:"top"===a?m:v,i.a.createElement(t,{labels:[n[0],n[n.length-1]]},i.a.createElement(f,{msqData:r}))}function m(e){var t=e.labels,a=e.children;return i.a.createElement("div",{className:"pr-size-fit pr-size-fit--labels-top"},i.a.createElement("div",{className:"pr-size-fit_labels","aria-hidden":"true"},i.a.createElement("div",{className:"pr-size-fit_label"},t[0]),i.a.createElement("div",{className:"pr-size-fit_label"},t[1])),a)}function v(e){var t=e.labels,a=e.children;return i.a.createElement("div",{className:"pr-size-fit pr-size-fit--labels-bottom"},a,i.a.createElement("div",{className:"pr-size-fit_labels","aria-hidden":"true"},i.a.createElement("div",{className:"pr-size-fit_label"},t[0]),i.a.createElement("div",{className:"pr-size-fit_label"},t[1])))}function b(e){var t=e.labels,a=e.children;return i.a.createElement("div",{className:"pr-size-fit pr-size-fit--labels-sides"},i.a.createElement("div",{className:"pr-size-fit_label","aria-hidden":"true"},t[0]),i.a.createElement("div",{className:"pr-size-fit_slider-container"},a),i.a.createElement("div",{className:"pr-size-fit_label","aria-hidden":"true"},t[1]))}function z(e,t){return{display_values:e.display_values,values:e.values.map(function(e){return{label:e.label,count:e.label===t?1:0}})}}a.d(t,"a",function(){return d}),a.d(t,"b",function(){return z})},392:function(e,t,a){"use strict";a.r(t),a.d(t,"SizeFitContainer",function(){return u});var r=a(106),i=a.n(r),n=(a(107),a(171)),l=a(125),s=a(113),c=a(156);var o={getReviews:c.p},u=Object(l.b)(function(e,t){var a=Object(s.r)(t.config);if(e.Reviews[a]){var r=e.Reviews[a];return{isLoading:r.isLoading,rollup:r.rollup}}return{}},o)(function(e){var t=e.config,a=e.isLoading,l=e.rollup,s=(l=void 0===l?{}:l).properties,o=void 0===s?[]:s;if(Object(r.useEffect)(function(){"boolean"!=typeof a&&Object(c.p)(t)}),!Array.isArray(o))return null;var u=o.find(function(e){var t=e.display_type,a=e.key;return"histogram"===t&&("sizing"===a||"size"===a||"fit"===a)});return u?i.a.createElement("div",{"data-testid":"size-fit-snippet"},i.a.createElement(n.a,{msqData:u,labelPosition:"bottom"})):null});t.default=u}}]);