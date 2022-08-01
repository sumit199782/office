/*!
 * PowerReviews, Copyright 2020
 * 956fe54ce | 2020-10-16
 */
(window.pwrJsonp=window.pwrJsonp||[]).push([[2],{127:function(e,t,r){"use strict";r.d(t,"a",function(){return i});var n=r(106),o=r.n(n),i=(r(107),r(178),function(e){var t=e.filledPercent,r=e.size,n=t?function(e){return[0,25,50,75,100].reduce(function(t,r){return Math.abs(r-e)<Math.abs(t-e)?r:t})}(t)+"-percent":"0-percent";return o.a.createElement("svg",{className:"pr-star-icon",viewBox:"0 0 30 30",width:r,height:r,"data-size":r},o.a.createElement("defs",null,o.a.createElement("linearGradient",{id:"0-percent"},o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"100%"}))),o.a.createElement("defs",null,o.a.createElement("linearGradient",{id:"25-percent"},o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"0%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"20%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"50%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"75%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"100%"}))),o.a.createElement("defs",null,o.a.createElement("linearGradient",{id:"50-percent"},o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"50%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"50%"}))),o.a.createElement("defs",null,o.a.createElement("linearGradient",{id:"75-percent"},o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"0%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"20%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"50%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"75%"}),o.a.createElement("stop",{className:"pr-star-icon__fill--empty",offset:"100%"}))),o.a.createElement("defs",null,o.a.createElement("linearGradient",{id:"100-percent"},o.a.createElement("stop",{className:"pr-star-icon__fill--full",offset:"100%"}))),o.a.createElement("g",{className:"pr-star-icon__group pr-star-icon__group--outline",fill:"url(#"+n+")",transform:"translate(-42.000000, -48.000000)"},o.a.createElement("polygon",{points:"56.0384615 70.165 47.7868609 76.0397634 50.2973723 65.5595983 42.6870912 58.7102366 52.4902733 58.1079017 56.0384615 48 59.5866498 58.1079017 69.3898319 58.7102366 61.7795508 65.5595983 64.2900622 76.0397634 "})))});i.defaultProps={size:18}},132:function(e,t,r){"use strict";var n=r(111),o=r.n(n),i=r(112),a=r.n(i),s=r(108),p=r.n(s),c=r(109),l=r.n(c),u=r(106),d=r.n(u),h=(r(107),r(115)),m=r(127),f=r(120),y=r.n(f);function g(e){var t=d.a.useRef(Object(h.h)()),r=e.iconInputId,n=e.onClickRating,o=e.onIconKeyDown,i=e.isRequired,a=e.onMouseEnter,s=e.filledPercent,p=e.label,c=(e.children,y()(e,["iconInputId","onClickRating","onIconKeyDown","isRequired","onMouseEnter","filledPercent","label","children"]));return d.a.createElement("span",null,d.a.createElement("input",{id:t.current,name:r,className:"sr-only",onClick:n,onKeyDown:o,"aria-describedby":c["aria-describedby"],required:!!i||void 0,type:"radio"}),d.a.createElement("label",{htmlFor:t.current,onMouseMove:a,className:"pr-interactive-star-icon"},d.a.createElement(m.a,{size:50,filledPercent:s}),d.a.createElement("span",{className:"pr-accessible-text"},p)))}function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function O(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var v=function(e,t){return t>=2?e+"s":e},w=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t=e.call.apply(e,[this].concat(n))||this,l()(a()(t),"radioBtnId",Object(h.h)()),t}return p()(t,e),t.prototype.render=function(){var e=O({},this.props.style);this.props.isInteractive&&(e.cursor="pointer");var t="pr-star-v4";"ORANGE_ACCESSIBILITY_COMPLIANT"===this.props.starStyles&&(t="pr-star-accessible"),this.props.filledPercent?t+=" "+t+"-"+this.props.filledPercent+"-filled":t+=this.props.toggled?" "+t+"-100-filled":" "+t+"-0-filled",this.props.isValid||1!==this.props.starNumber||(t+=" pr-invalid-field");var r=this.props.imageAlt+" "+(this.props.label?this.props.label+" ":"")+this.props.starNumber+" "+v("star",this.props.starNumber);return this.props.isInteractive?d.a.createElement("span",null,d.a.createElement("input",{id:this.radioBtnId,name:this.props.iconInputId,className:"sr-only",onClick:this.props.onClickRating,onKeyDown:this.props.onIconKeyDown,"aria-describedby":this.props["aria-describedby"],required:!!this.props.isRequired||void 0,type:"radio"}),d.a.createElement("label",{htmlFor:this.radioBtnId,className:t,style:e,onMouseMove:this.props.onMouseEnter},this.props.isInteractive&&d.a.createElement("span",{className:"pr-accessible-text"},r))):d.a.createElement("div",{className:t,style:e})},t}(d.a.Component);l()(w,"defaultProps",{isInteractive:!0,isRequired:!1,isValid:!0,starStyles:"GOLD_NON_ACCESSIBILITY_COMPLIANT"});var P=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t=e.call.apply(e,[this].concat(n))||this,l()(a()(t),"radioBtnId",Object(h.h)()),t}return p()(t,e),t.prototype.render=function(){var e=O({},this.props.style);this.props.isInteractive&&(e.cursor="pointer");var t=this.props.toggled?this.props.toggledClassName:this.props.untoggledClassName;this.props.isValid||1!==this.props.starNumber||(t+=" pr-invalid-field");var r,n=this.props.imageAlt+" "+(this.props.label?this.props.label+" ":"")+this.props.starNumber+" "+v("star",this.props.starNumber);this.props.customStarImageUrl||this.props.customStarImageHoverUrl?(t+=" pr-custom-image",r=this.props.toggled?this.props.customStarImageHoverUrl:this.props.customStarImageUrl):r="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAACACAMAAAAYuTaqAAAAmVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8JA+lgAAAAMnRSTlMAB8m4/AIB4fkMzkW+Wnr1lB4Z8mA+FaOqdC0zKLEkf5A4UlWIbdbrEGbu3Zlq5UyMnnY191AAAAN3SURBVBgZ7cGHVupKAAXQk56QYgqE3puA9fz/xz3LU0STSGbIsO5a7o0//4o2riRxE1zHiitchbblVsM1tEm2cQ0tkjquYM5Xc6jX5asulMtdvnJzqBbxXQTFLIfvHAtqLfhhAbUCfgig1IhHI6gU8yiGQl7Go8yDOmt+dQ9l7A2/2kAZn6d8qDLmqR4USUyeMhOoseJ3KyihbfndVoMKbf4UQgWdP+lQYM4iQzSvyyLPaFzusoibo2kRi/XRMMthsYOFZi1Y5hHNCljGQKNGLDdBk2KWm6E5tpexXOahOWtW2aE5G1bZoDE+q3XQlDGr9dCQxGQ1M8WleZP54y4y+Bsj2j3OJx7kWOnAD/ur57Hu3LCeG0cfP6/6oT9ILZzpdtRZ3E/jXrDZ8zL2m6AXT+8XncktvtOS4WO7/9Q1Wg8um+Q+tIzuU7/9OEw0AFHGa8giYMprmOJF26Vqbhtv/D3Vynz8b+BQJWeAT2mL6rRSHNmeQVUMDyesO6pxZ+GUjYgqRCgQumyaG6KI3dmzWfsOSowcNukwQqm0xeboOSp4Bpsy9lDJumMzYgu/idiEPs4Qurw0d4mzdPa8rO0cZxodeEmHCc6W67wcPUcN3piXMtZQixXzMmYW6urzAsw1BCxdyrpZQMh8SznbOcTYkwNlHCYQlusUZuo5JGhjiuppkGLNKObJhqSEYlLICilmCVkxxcwgq0UxOiR5JsWYHuT4FNWBnClFRZATUJQBKVZGUXsbMoYUN4CMNcXtIKNHcV3IcCjuAAkJZaQQF1LGEuJiyphBXIsydAjzTMowPYjyKacDUVPKiSAqYCXDD1jJgCArY4WHJYDlAytkFsQMWc588vDKm5ksN4CYNUsFA3wY6Cy1g5geS2zbNr5ob1miCzEOC5l3tzh1e2ey0AFCEhbSh/hp3mKhFCJCFtjfWyhi3e9ZYAkRMX/q5iiTd/nTDCJa/G7TQZXOht/pEOCZPJX1LVTT+hlPmR7q83mql+J3SY+nOqhvyq8OPs7jH/hVhPoCHrlTDefSpi6PDNRmZfw0nqCOicFPmYW6hvzgLFDXwuGHAepa85278lCft3L5boe6enwTjCDEHgV800VdDl88hBAXbvnigJoSkubMg4zb2CSZop6Q1AewIWeok0vUE2/bNuTZu/0M9axzXEa+xp8/f/405T/VfiCDRYkxmAAAAABJRU5ErkJggg==";var i={};return this.props.isInteractive&&(i.role="button"),this.props.isInteractive?d.a.createElement("span",null,d.a.createElement("input",{id:this.radioBtnId,name:this.props.iconInputId,className:"sr-only",onClick:this.props.onClickRating,onKeyDown:this.props.onIconKeyDown,"aria-describedby":this.props["aria-describedby"],required:!!this.props.isRequired||void 0,type:"radio"}),d.a.createElement("label",{htmlFor:this.radioBtnId,className:t,style:e,onMouseMove:this.props.onMouseEnter},d.a.createElement("span",{"aria-hidden":"true",className:"pr-accessible-text"},n),d.a.createElement("img",{className:"pr-rating-star",src:r,alt:n}))):d.a.createElement("div",o()({},i,{role:"radio",className:t,onMouseMove:this.props.onMouseEnter,style:e,"aria-checked":this.props.toggled,onClick:this.props.onClickRating,onKeyDown:this.props.onIconKeyDown,tabIndex:this.props.isInteractive?"0":"-1"}),d.a.createElement("span",{"aria-hidden":"true",className:"pr-accessible-text"},n),d.a.createElement("img",{className:"pr-rating-star",src:r,alt:n}))},t}(d.a.Component);l()(P,"defaultProps",{isInteractive:!0,isRequired:!1,isValid:!0});var j=function(e){function t(t){var r;return(r=e.call(this,t)||this).state={currentRating:t.currentRating||t.preset||0,currentRating_hover:0,hovering:!1,customStarUrl:null,customStarHoverUrl:null,max:5},r}p()(t,e);var r=t.prototype;return r.componentDidMount=function(){var e=document.getElementsByClassName("pr-custom-star-image")[0];if(e){var t=window.getComputedStyle(e).getPropertyValue("background-image"),r=document.getElementsByClassName("pr-custom-star-image-hover")[0],n=window.getComputedStyle(r).getPropertyValue("background-image"),o=/\((")?(.+)\1\)/,i=o.exec(t),a=o.exec(n),s=i&&i[2]||void 0,p=a&&a[2]||void 0;this.setState({customStarUrl:s,customStarHoverUrl:p})}},r.componentDidUpdate=function(e){this.props.isInteractive||e.currentRating===this.props.currentRating&&e.preset===this.props.preset||this.setState({currentRating:this.props.currentRating||this.props.preset})},r.onMouseEnter=function(e,t){if(this.props.isInteractive){var r=e;t.nativeEvent.clientX<t.target.offsetLeft+t.target.offsetWidth/2&&(r-=.5),this.setState({currentRating_hover:r,hovering:!0}),this.props.setValue(r,!1)}},r.onMouseLeave=function(){this.props.isInteractive&&(this.setState({hovering:!1}),this.props.setValue(this.state.currentRating,!1))},r.onClickRating=function(e,t){t.stopPropagation(),this.props.isInteractive&&(this.setState({currentRating:e}),this.props.setValue(e,!0),this.props.onChange&&this.props.onChange(e))},r.onIconKeyDown=function(e,t,r){13!==t.keyCode&&32!==t.keyCode||this.onClickRating(e,t,r)},r.onKeyDown=function(e){if(this.props.isInteractive){var t=this.state.currentRating;switch(e.keyCode){case 39:this.setState({currentRating:t+1}),this.props.setValue(t+1,!0);break;case 37:this.setState({currentRating:t-1}),this.props.setValue(t-1,!0)}}},r._renderStars=function(){for(var e,t=[],r=!1,n=1;n<=this.state.max;++n){e=this.state["currentRating"+(this.state.hovering?"_hover":"")],r=n<=Math.round(e);var i=(Math.round(4*e)/4).toFixed(2),a=this.props.useQuarterStars&&Math.floor(i)+1===n?i%1*100:0;a=0===a&&!0===r?100:a;var s=this.props.imageAlt+" "+(this.props.label?this.props.label+" ":"")+n+" "+v("star",n),p="ORANGE_ACCESSIBILITY_COMPLIANT"===this.props.starStyles,c=this.props.isInteractive,l=void 0;l=p?c?d.a.createElement(g,{key:n,iconInputId:this.props.iconInputId,onMouseEnter:this.onMouseEnter.bind(this,n),onClickRating:this.onClickRating.bind(this,n),onIconKeyDown:this.onIconKeyDown.bind(this,n),filledPercent:a,isInteractive:this.props.isInteractive,isRequired:this.props.isRequired,"aria-describedby":this.props["aria-describedby"],label:s}):d.a.createElement(m.a,{key:n,filledPercent:a,size:this.props.starSize}):d.a.createElement(w,{key:n,starNumber:n,filledPercent:a,label:this.props.label,iconInputId:this.props.iconInputId,onMouseEnter:this.onMouseEnter.bind(this,n),onClickRating:this.onClickRating.bind(this,n),onIconKeyDown:this.onIconKeyDown.bind(this,n),toggled:r,customStarImageUrl:this.state.customStarUrl,customStarImageHoverUrl:this.state.customStarHoverUrl,isInteractive:this.props.isInteractive,isRequired:this.props.isRequired,isValid:this.props.isValid,starStyles:this.props.starStyles,"aria-describedby":this.props["aria-describedby"],imageAlt:this.props.imageAlt}),t.push(l)}var u={};return this.props.isInteractive&&(u={"aria-hidden":!1,role:"radiogroup",onMouseLeave:this.onMouseLeave.bind(this)}),d.a.createElement("div",o()({"aria-hidden":"true",className:"pr-rating-stars"},u),t)},r._renderLegacyStars=function(){for(var e,t=[],r=!1,n=1;n<=this.state.max;++n){e=this.state["currentRating"+(this.state.hovering?"_hover":"")],r=n<=Math.round(e);var i=(Math.round(4*e)/4).toFixed(2),a=this.props.useQuarterStars&&Math.floor(i)+1===n?i%1*100:0,s=void 0;if(this.props.useQuarterStars&&Math.floor(i)+1===n){var p=void 0;document.getElementsByClassName("pr-star-mock").length>0&&(p=window.getComputedStyle(document.getElementsByClassName("pr-star-mock")[0]).getPropertyValue("background-color")),s="-webkit-gradient(linear, left top, right top, color-stop("+a+"%, "+p+"), color-stop("+i%1*100+"%, #DDDDDD))"}t.push(d.a.createElement(P,{key:n,starNumber:n,label:this.props.label,iconInputId:this.props.iconInputId,style:this.props.useQuarterStars?{background:s}:{},toggledClassName:this.props.toggledClassName,untoggledClassName:this.props.untoggledClassName,onMouseEnter:this.onMouseEnter.bind(this,n),onClickRating:this.onClickRating.bind(this,n),onIconKeyDown:this.onIconKeyDown.bind(this,n),toggled:r,customStarImageUrl:this.state.customStarUrl,customStarImageHoverUrl:this.state.customStarHoverUrl,isInteractive:this.props.isInteractive,isRequired:this.props.isRequired,isValid:this.props.isValid,"aria-describedby":this.props["aria-describedby"],imageAlt:this.props.imageAlt}))}var c={};return c=this.props.isInteractive?{role:"radiogroup"}:{"aria-hidden":!0},d.a.createElement("div",o()({},c,{className:"pr-rating-stars",onMouseLeave:this.onMouseLeave.bind(this)}),d.a.createElement("div",{className:"pr-star-mock pr-star-selected pr-hide"}),d.a.createElement("div",{className:"pr-custom-star-image"}),d.a.createElement("div",{className:"pr-custom-star-image-hover"}),t)},r.render=function(){return window.POWERREVIEWS&&"4.0"!==window.POWERREVIEWS.UI_VERSION?this._renderLegacyStars():this._renderStars()},t}(d.a.Component);l()(j,"defaultProps",{isInteractive:!0,useQuarterStars:!1,isRequired:!1,isValid:!0,starStyles:"GOLD_NON_ACCESSIBILITY_COMPLIANT"});t.a=j},142:function(e,t,r){"use strict";var n=r(108),o=r.n(n),i=r(106),a=r.n(i),s=r(132),p=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.roundedRating=function(){return this.props.ratingValue},t}(a.a.Component);p.defaultProps={ratingValue:0,ratingMaxValue:5};var c=function(e){function t(){return e.apply(this,arguments)||this}return o()(t,e),t.prototype.render=function(){var e="0.0";return this.props.ratingValue&&(e=Math.round(10*this.props.ratingValue)/10),a.a.createElement("div",{className:"pr-snippet-stars pr-snippet-stars-png "+("SMALL"===this.props.starSize?"pr-snippet-stars-png-small":"")},a.a.createElement(s.a,{isInteractive:!1,untoggledClassName:this.props.untoggledClassName,toggledClassName:this.props.toggledClassName,useQuarterStars:this.props.useQuarterStars,starSize:this.props.starSize,starStyles:this.props.starStyles,preset:this.roundedRating()}),a.a.createElement("div",{"aria-hidden":"true",className:"pr-snippet-rating-decimal"},e))},t}(p);c.defaultProps={className:"pr-snippet-star-rating",untoggledClassName:"pr-star",toggledClassName:"pr-star-selected",useQuarterStars:!1,starStyles:"GOLD_NON_ACCESSIBILITY_COMPLIANT"};t.a=c},170:function(e,t,r){"use strict";r.d(t,"c",function(){return n}),r.d(t,"a",function(){return o}),r.d(t,"b",function(){return i});var n=function(e,t,r){return{empty:{root:{},ratingValue:{},reviewCount:{}},root:{itemScope:!0,itemType:"http://schema.org/AggregateRating",itemRef:"pr-"+r},ratingValue:{itemProp:"ratingValue",content:e},reviewCount:{itemProp:"reviewCount",content:t}}},o=function(e){return{empty:{root:{},text:{},dateCreated:{},answerCount:{},answer:{root:{},text:{},author:{},name:{}}},root:{itemScope:!0,itemType:"http://schema.org/Question"},text:{itemProp:"text"},dateCreated:{itemProp:"dateCreated"},answerCount:{itemProp:"answerCount",content:e},answer:{root:{itemScope:!0,itemType:"http://schema.org/Answer",itemProp:"suggestedAnswer"},text:{itemProp:"text"},author:{itemScope:!0,itemType:"http://schema.org/Person",itemProp:"author"},name:{itemProp:"name"}}}},i=function(e,t){return{empty:{root:{},title:{},body:{},datePublished:{},authorRoot:{},authorName:{},locationRoot:{},locationName:{},ratingRoot:{},ratingValue:{}},root:{itemScope:!0,itemType:"http://schema.org/Review",itemRef:"pr-"+t},title:{itemProp:"name"},body:{itemProp:"reviewBody"},datePublished:{itemProp:"datePublished"},authorRoot:{itemScope:!0,itemType:"http://schema.org/Person",itemProp:"author"},authorName:{itemProp:"name"},locationRoot:{itemScope:!0,itemType:"http://schema.org/AdministrativeArea",itemProp:"locationCreated"},locationName:{itemProp:"name"},ratingRoot:{itemScope:!0,itemType:"http://schema.org/Rating",itemProp:"reviewRating"},ratingValue:{itemProp:"ratingValue",content:e.metrics.rating}}}},190:function(e,t,r){"use strict";var n=r(120),o=r.n(n),i=r(108),a=r.n(i),s=r(106),p=r.n(s),c=(r(107),r(109)),l=r.n(c),u=r(121),d=r.n(u);function h(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?h(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):h(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var f=function(e){function t(){return e.apply(this,arguments)||this}a()(t,e);var r=t.prototype;return r.getChildJSON=function(e,t){var r,n=e.type,i=e.props,a=(i.children,i.type),s=i.id,p=i.parentID,c=o()(i,["children","type","id","parentID"]);p&&(c={"@id":p}),s&&(c=m(m({},c),{},{"@id":s}));var l=new n(e.props).getJSON(!!a||t,c);return a?d()(((r={})[a]=l,r)):l},r.parseChildren=function(e){var t=this;return void 0===e&&(e=!1),this.props.children?this.props.children.length>0?this.props.children.map(function(r){return t.getChildJSON(r,e)}):[this.getChildJSON(this.props.children,e)]:{}},r.render=function(){return null},t}(p.a.Component);function y(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var g=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?y(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):y(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"AggregateRating"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{aggregateRating:o}].concat(n))},t}(f);function b(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var O=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?b(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):b(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"Person"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{author:o}].concat(n))},t}(f),v=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(){if(this.props.children)return e.prototype.parseChildren.call(this,!0)},t}(f);function w(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var P=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?w(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):w(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"AdministrativeArea"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{locationCreated:o}].concat(n))},t}(f);function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var E=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"Product"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{product:o}].concat(n))},t}(f);function S(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var C=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?S(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):S(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"Rating"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{reviewRating:o}].concat(n))},t}(f);function N(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var I=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?N(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):N(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"Review"},r);return d.a.apply(void 0,[o].concat(n))},t}(f);function D(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function A(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?D(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):D(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var _=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this,!0);if(n.length>1)throw new Error("The <ItemReviewed /> component can only contain a single child.");var o=A(A({},n[0]),r);return t?d()(o):d()({itemReviewed:o})},t}(f);function R(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var M=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?R(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):R(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"Question"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{question:o}].concat(n))},t}(f);function k(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}var V=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this),o=function(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?k(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):k(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}({"@type":"Answer"},r);return t?d.a.apply(void 0,[o].concat(n)):d.a.apply(void 0,[{suggestedAnswer:o}].concat(n))},t}(f),L=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.getJSON=function(t,r){void 0===t&&(t=!1);var n=e.prototype.parseChildren.call(this,!0);return d()({"@graph":n})},t}(f),T=r(181);r.d(t,"g",function(){return x}),r.d(t,"a",function(){return g}),r.d(t,"c",function(){return O}),r.d(t,"d",function(){return v}),r.d(t,"h",function(){return P}),r.d(t,"i",function(){return E}),r.d(t,"k",function(){return C}),r.d(t,"l",function(){return I}),r.d(t,"f",function(){return _}),r.d(t,"j",function(){return M}),r.d(t,"b",function(){return V}),r.d(t,"e",function(){return L});var x=function(e){function t(){return e.apply(this,arguments)||this}return a()(t,e),t.prototype.render=function(){var e=null;if(this.props.children){var t,r=this.props.children.type,n=this.props.children.props,i=(n.children,n.type),a=o()(n,["children","type"]),s=new r(this.props.children.props).getJSON(!0,a);e="JSONLDNodeCollection"===r.name?d()({"@context":"http://schema.org/"},((t={})[i]=s,t)):d()({"@context":"http://schema.org/"},s)}return p.a.createElement("script",{type:"application/ld+json",dangerouslySetInnerHTML:{__html:T.a.stringify(e)}})},t}(p.a.Component)},391:function(e,t,r){"use strict";r.r(t);var n=r(111),o=r.n(n),i=r(112),a=r.n(i),s=r(108),p=r.n(s),c=r(109),l=r.n(c),u=r(106),d=r.n(u),h=(r(107),r(125)),m=r(156),f=r(113),y=r(110),g=r(114),b=r(136),O=r(170),v=r(142),w=r(190),P=r(115);function j(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function E(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?j(Object(r),!0).forEach(function(t){l()(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):j(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}var S=function(e){function t(){for(var t,r=arguments.length,n=new Array(r),o=0;o<r;o++)n[o]=arguments[o];return t=e.call.apply(e,[this].concat(n))||this,l()(a()(t),"ratedLabelTextId",Object(P.h)()),t}p()(t,e);var r=t.prototype;return r.componentDidMount=function(){var e=this.props,t=e.isLoading,r=e.config,n=e.getSnippets,o=e.getReviews;"boolean"!=typeof t&&(r.batched_page_ids?n(r):o(r))},r.render=function(){var e=this.props,t=e.config,r=e.localizations,n=e.merchantProperties,i=e.productKey,a=e.rollup,s=(a=void 0===a?{}:a).review_count,p=void 0===s?0:s,c=a.average_rating,l=void 0===c?0:c,u=a.productName;if(!r)return d.a.createElement("div",null);var h=Object(b.h)(t,n),m=h.showJSONLD,f=h.showMicrodata,P=h.useNestedJSONLD,j=Object(O.c)(l,p,t.structured_data_product_id||i);j=f&&p?j:j.empty;var S=Object(g.b)(E(E({},n),t)).STAR_STYLES,C=Object(y.a)("review_display.4.0.no_reviews",r);1===p?C=Object(y.a)("review_display.4.0.common.review_count_singular",r):p>1&&(C=Object(y.a)("review_display.4.0.common.review_count_plural",r).replace("{0}",p));var N=Object(y.a)("review_display.4.0.common.rated_x_out_of_y",r).replace("{0}",l),I=m&&0!==p?!0===P?d.a.createElement(w.g,null,d.a.createElement(w.i,{name:u||i,id:t.structured_data_product_id||i},d.a.createElement(w.a,{ratingValue:l,reviewCount:p}))):d.a.createElement(w.g,null,d.a.createElement(w.a,{ratingValue:l,reviewCount:p},d.a.createElement(w.f,null,d.a.createElement(w.i,{name:u,parentID:t.structured_data_product_id||i})))):null;return d.a.createElement("section",{id:"pr-category-snippets-"+t.page_id,className:p?"":"pr-no-reviews","aria-labelledby":this.ratedLabelTextId,"data-testid":"category-snippet"},d.a.createElement("div",o()({},j.root,{className:"pr-snippet pr-category-snippet"}),d.a.createElement("div",o()({},j.ratingValue,{className:"pr-category-snippet__rating pr-category-snippet__item"}),d.a.createElement(v.a,{isInteractive:!1,preset:l,ratingValue:l,useQuarterStars:!0,starStyles:S}),d.a.createElement("span",{id:this.ratedLabelTextId,className:"pr-accessible-text"},N)),d.a.createElement("div",o()({},j.reviewCount,{className:"pr-category-snippet__total pr-category-snippet__item"}),C),I))},t}(u.Component),C={getSnippets:m.r,getReviews:m.p};t.default=Object(h.b)(function(e,t){var r=Object(f.r)(t.config);return E(E({},e.Reviews[r]||{}),{},{productKey:r})},C)(S)}}]);