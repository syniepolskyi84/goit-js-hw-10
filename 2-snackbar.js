import"./assets/modulepreload-polyfill-B5Qt9EMX.js";import{i}from"./assets/vendor-BbbuE1sJ.js";const t=document.querySelector(".form");t.addEventListener("submit",n);function n(r){r.preventDefault();const e=t.delay.value,o=t.state.value;new Promise((s,m)=>{setTimeout(o==="fulfilled"?()=>s(o):()=>m(o),e)}).then(s=>{i.show({position:"topRight",color:"green",message:`✅ Fulfilled promise in ${e}ms`})}).catch(s=>{i.show({position:"topRight",color:"red",message:`❌ Rejected promise in ${e}ms`})}),t.reset()}
//# sourceMappingURL=2-snackbar.js.map
