import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
import vm from 'node:vm';
const base=new URL('../',import.meta.url);
await access(new URL('dist/horizontal/depth.css',base));
for(const file of ['dist/horizontal/motion-ui.js','dist/horizontal/visual-effects.js','dist/horizontal/english.js','dist/horizontal/preferences.js','dist/horizontal/project-media.js','dist/horizontal/showcase.js','dist/horizontal/depth.js','dist/horizontal/redirect.js','dist/anterior/app.js','dist/anterior/theme.js','dist/anterior/i18n.js']){
 const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL(file,base))],{encoding:'utf8'});
 if(check.error)throw check.error;
 if(check.status!==0)throw new Error(check.stderr);
}
const mediaContext={window:{}};
vm.runInNewContext(await readFile(new URL('dist/horizontal/project-media.js',base),'utf8'),mediaContext);
for(const items of Object.values(mediaContext.window.horizontalProjectMedia))for(const item of items){
 if(!['image','video'].includes(item.type)||!item.label||!item.alt||!item.caption)throw new Error('Mídia de projeto incompleta');
 for(const file of [item.src,item.poster].filter(Boolean)){
  if(!file.startsWith('assets/'))throw new Error('Mídia deve usar assets locais: '+file);
  await access(new URL(file,new URL('dist/index.html',base)));
 }
}
for(const path of ['dist/index.html','dist/anterior/index.html','dist/conceito/index.html','dist/horizontal/index.html']){
 const url=new URL(path,base);
 const html=await readFile(url,'utf8');
 for(const match of html.matchAll(/(?:src|href)="((?:\.\.\/)?assets\/[^"?#]+)"/g))await access(new URL(match[1],url));
 for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)){
  if(/^(?:https?:|data:|mailto:|#|\?)/.test(match[1]))continue;
  await access(new URL(match[1],url));
 }
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
 if(new Set(ids).size!==ids.length)throw new Error('IDs duplicados: '+path);
 for(const match of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(match[1]))throw new Error('Âncora ausente: '+match[1]+' em '+path);
 const dialogs=[...html.matchAll(/<dialog\b[^>]*\bid="([^"]+)"/g)].map(match=>match[1]);
 for(const match of html.matchAll(/data-dialog="([^"]+)"/g))if(!dialogs.includes(match[1]))throw new Error('Painel de detalhes ausente: '+match[1]+' em '+path);
}
const mainHTML=await readFile(new URL('dist/index.html',base),'utf8');
if(!mainHTML.includes('id="intro-title"')||mainHTML.includes('content="noindex"'))throw new Error('A versão horizontal deve ser a página principal indexável.');
for(const file of ['dist/styles.css','dist/dark.css','dist/theme.js','dist/app.js','dist/i18n.js','dist/favicon.svg','dist/conceito/conceito.css','dist/conceito/conceito.js','dist/horizontal/horizontal.css','dist/horizontal/horizontal.js'])await access(new URL(file,base));
for(const file of ['dist/theme.js','dist/app.js','dist/i18n.js','dist/conceito/conceito.js','dist/horizontal/horizontal.js']){
 const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL(file,base))],{encoding:'utf8'});
 if(check.error)throw check.error;
 if(check.status!==0)throw new Error(check.stderr);
}
console.log('Verificado: arquivos estáticos, âncoras, IDs e sintaxe JavaScript. dist/ pronto para publicação.');
