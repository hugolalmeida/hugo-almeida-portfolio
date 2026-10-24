import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const base=new URL('../',import.meta.url);
const html=await readFile(new URL('dist/index.html',base),'utf8');
for(const file of ['dist/styles.css','dist/app.js','dist/i18n.js','dist/favicon.svg'])await access(new URL(file,base));
for(const match of html.matchAll(/(?:src|href)="(assets\/[^"?#]+)"/g))await access(new URL('dist/'+match[1],base));
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
if(new Set(ids).size!==ids.length)throw new Error('IDs duplicados no HTML');
for(const match of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(match[1]))throw new Error('Âncora ausente: '+match[1]);
for(const file of ['dist/app.js','dist/i18n.js']){
 const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL(file,base))],{encoding:'utf8'});
 if(check.error)throw check.error;
 if(check.status!==0)throw new Error(check.stderr);
}
console.log('Verificado: arquivos estáticos, âncoras, IDs e sintaxe JavaScript. dist/ pronto para publicação.');
