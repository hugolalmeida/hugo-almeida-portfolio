import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {spawnSync} from 'node:child_process';
const base=new URL('../',import.meta.url);
for(const path of ['dist/index.html','dist/conceito/index.html']){
 const url=new URL(path,base);
 const html=await readFile(url,'utf8');
 for(const match of html.matchAll(/(?:src|href)="((?:\.\.\/)?assets\/[^"?#]+)"/g))await access(new URL(match[1],url));
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
 if(new Set(ids).size!==ids.length)throw new Error('IDs duplicados: '+path);
 for(const match of html.matchAll(/href="#([^"]+)"/g))if(!ids.includes(match[1]))throw new Error('Âncora ausente: '+match[1]+' em '+path);
}
for(const file of ['dist/styles.css','dist/dark.css','dist/theme.js','dist/app.js','dist/i18n.js','dist/favicon.svg','dist/conceito/conceito.css','dist/conceito/conceito.js'])await access(new URL(file,base));
for(const file of ['dist/theme.js','dist/app.js','dist/i18n.js','dist/conceito/conceito.js']){
 const check=spawnSync(process.execPath,['--check',fileURLToPath(new URL(file,base))],{encoding:'utf8'});
 if(check.error)throw check.error;
 if(check.status!==0)throw new Error(check.stderr);
}
console.log('Verificado: arquivos estáticos, âncoras, IDs e sintaxe JavaScript. dist/ pronto para publicação.');
