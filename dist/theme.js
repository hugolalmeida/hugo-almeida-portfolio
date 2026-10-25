// Runs before styles so the saved/system preference applies on the first paint.
(()=>{
 const system=window.matchMedia('(prefers-color-scheme: dark)');
 let preference=null;
 try{const saved=localStorage.getItem('portfolio-theme');if(saved==='dark'||saved==='light')preference=saved;}catch{}
 function apply(theme,persist=false){
  const value=theme==='dark'?'dark':'light';
  document.documentElement.dataset.theme=value;
  document.documentElement.style.colorScheme=value;
  document.querySelector('meta[name="theme-color"]').setAttribute('content',value==='dark'?'#111915':'#f7f7f2');
  if(persist){preference=value;try{localStorage.setItem('portfolio-theme',value);}catch{}}
  window.dispatchEvent(new Event('portfolio-theme-change'));
 }
 window.portfolioTheme={toggle(){apply(document.documentElement.dataset.theme==='dark'?'light':'dark',true);}};
 apply(preference||(system.matches?'dark':'light'));
 system.addEventListener('change',event=>{if(preference===null)apply(event.matches?'dark':'light');});
})();
