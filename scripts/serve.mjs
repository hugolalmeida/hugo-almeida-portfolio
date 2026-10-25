import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(fileURLToPath(new URL('../dist/',import.meta.url)));
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.pdf':'application/pdf','.mp4':'video/mp4','.webm':'video/webm'};
const port=Number(process.env.PORT||4173);
http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  const pathname=decodeURIComponent(url.pathname);
  const target=path.resolve(root,'.'+pathname);
  if(target!==root&&!target.startsWith(root+path.sep)){
   res.writeHead(403);res.end('Forbidden');return;
  }
  const info=await stat(target);
  // Relative assets require directory URLs to end with a slash.
  if(info.isDirectory()&&!url.pathname.endsWith('/')){
   res.writeHead(308,{'Location':url.pathname+'/'+url.search,'Cache-Control':'no-store'});
   res.end();return;
  }
  const file=info.isDirectory()?path.join(target,'index.html'):target;
  const data=await readFile(file);
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
  res.end(data);
 }catch{
  res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Página não encontrada');
 }
}).listen(port,'127.0.0.1',()=>console.log('Local: http://localhost:'+port));
