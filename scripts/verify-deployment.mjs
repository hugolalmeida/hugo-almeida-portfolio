import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base=process.env.SITE_URL?.replace(/\/?$/, '/');
if(!base)throw new Error('Informe SITE_URL para verificar a publicacao.');
const publishedFiles=['index.html',...['horizontal.css','depth.css','horizontal.js','depth.js','english.js','preferences.js','project-media.js','showcase.js','redirect.js','index.html'].map(file=>'horizontal/'+file),...['index.html','styles.css','dark.css','theme.js','app.js','i18n.js'].map(file=>'anterior/'+file)];
const contentHash=value=>createHash('sha256').update(value.toString('utf8').replace(/\r\n/g,'\n')).digest('hex');
const expectedHashes=new Map(await Promise.all(publishedFiles.map(async file=>[file,contentHash(await readFile(new URL('../dist/'+file,import.meta.url)))])));
const attempts=Number(process.env.DEPLOYMENT_CHECK_ATTEMPTS||12);
let lastError;
for(let attempt=1;attempt<=attempts;attempt++){
 try{
  const url=new URL(base);
  url.searchParams.set('verify',process.env.GITHUB_SHA||String(Date.now()));
  const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('Pagina inicial respondeu HTTP '+response.status);
  const html=await response.text();
  if(!/id=["']intro-title["']/.test(html)||!html.includes('horizontal/horizontal.js')||html.includes('content="noindex"')){
   throw new Error('A pagina principal ainda nao e a versao horizontal esperada.');
  }
  const results=await Promise.allSettled(publishedFiles.map(async file=>{
   const url=new URL(file==='index.html'?'':file,base);
   url.searchParams.set('verify',process.env.GITHUB_SHA||String(Date.now()));
   const asset=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});
   if(!asset.ok)throw new Error(file+' respondeu HTTP '+asset.status);
   const hash=contentHash(Buffer.from(await asset.arrayBuffer()));
   if(hash!==expectedHashes.get(file))throw new Error(file+' ainda nao corresponde a revisao publicada.');
  }));
  for(const result of results)if(result.status==='rejected')throw result.reason;
  console.log('Publicacao verificada: versão horizontal principal, redirecionamento e arquivo anterior atualizados em '+base);
  process.exit(0);
 }catch(error){
  lastError=error;
  console.log('Verificacao '+attempt+'/'+attempts+': '+error.message);
  if(attempt<attempts)await new Promise(resolve=>setTimeout(resolve,5000));
 }
}
throw lastError;
