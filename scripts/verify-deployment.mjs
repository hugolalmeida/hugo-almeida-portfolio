const base=process.env.SITE_URL;
if(!base)throw new Error('Informe SITE_URL para verificar a publicacao.');
const attempts=Number(process.env.DEPLOYMENT_CHECK_ATTEMPTS||12);
let lastError;
for(let attempt=1;attempt<=attempts;attempt++){
 try{
  const url=new URL(base);
  url.searchParams.set('verify',process.env.GITHUB_SHA||String(Date.now()));
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('Pagina inicial respondeu HTTP '+response.status);
  const html=await response.text();
  if(!/id=["']hero-title["']/.test(html)||!html.includes('theme.js')){
   throw new Error('A pagina publicada nao e o portfolio esperado (pode ser a versao antiga do README).');
  }
  for(const file of ['styles.css','dark.css','app.js','theme.js','i18n.js']){
   const asset=await fetch(new URL(file,base),{cache:'no-store',signal:AbortSignal.timeout(15000)});
   if(!asset.ok)throw new Error(file+' respondeu HTTP '+asset.status);
   await asset.body?.cancel();
  }
  console.log('Publicacao verificada: portfolio e arquivos principais acessiveis em '+base);
  process.exit(0);
 }catch(error){
  lastError=error;
  console.log('Verificacao '+attempt+'/'+attempts+': '+error.message);
  if(attempt<attempts)await new Promise(resolve=>setTimeout(resolve,5000));
 }
}
throw lastError;
