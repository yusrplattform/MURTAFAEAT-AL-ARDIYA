import {spawn,spawnSync} from 'node:child_process';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';

const project=join(dirname(fileURLToPath(import.meta.url)),'site');
const url='http://127.0.0.1:5173/';
const [major,minor]=process.versions.node.split('.').map(Number);
if(major<22||(major===22&&minor<13))throw new Error('Node.js 22.13 or newer is required.');
if(!existsSync(join(project,'package.json')))throw new Error('The site folder is missing. Keep START.cmd and launch.mjs beside the site folder.');
function run(args){const result=spawnSync(process.execPath,args,{cwd:project,stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)throw new Error('Setup failed. See the message above.');}
function openBrowser(){const child=spawn('cmd.exe',['/c','start','',url],{windowsHide:true,stdio:'ignore'});child.on('error',()=>console.log(`Open your browser at ${url}`));child.unref();}
async function ready(){try{const response=await fetch(url,{signal:AbortSignal.timeout(2500)});return response.ok&&(await response.text()).includes('مرتفعات العارضية');}catch{return false}}
if(await ready()){console.log(`The website is already running: ${url}`);openBrowser();process.exit(0);}
if(!existsSync(join(project,'node_modules','vinext','dist','cli.js'))){
  console.log('Installing requirements for the first run...');
  const npmCli=join(dirname(process.execPath),'node_modules','npm','bin','npm-cli.js');
  if(!existsSync(npmCli))throw new Error('npm is missing. Reinstall Node.js with npm included.');
  run([npmCli,'install','--ignore-scripts']);
}
// Prepare only the local database. Hosted data is never touched by this launcher.
const runtime=join(project,'.sites-runtime');mkdirSync(runtime,{recursive:true});
const config=join(runtime,'launcher-wrangler.json');
writeFileSync(config,JSON.stringify({name:'murtafaat-local',compatibility_date:'2026-05-15',d1_databases:[{binding:'DB',database_name:'site-creator-d1',database_id:'00000000-0000-4000-8000-000000000000'}]}));
const sql=join(runtime,'launcher-schema.sql');
const baseline=readFileSync(join(project,'drizzle','0000_eager_sleepwalker.sql'),'utf8');
writeFileSync(sql,baseline.replaceAll('CREATE TABLE ','CREATE TABLE IF NOT EXISTS '));
console.log('Preparing the local request database...');
run(['node_modules/wrangler/bin/wrangler.js','d1','execute','site-creator-d1','--local','--config',config,'--persist-to',join(project,'.wrangler','state'),'--file',sql]);
console.log('Starting Murtafaat Al Ardiya...');
console.log(`Website: ${url}`);
console.log('Keep this window open. Press Ctrl+C to stop the website.');
const server=spawn(process.execPath,['scripts/run-framework.mjs','dev','--strictPort'],{cwd:project,stdio:'inherit',windowsHide:true});
let finished=false;
server.on('error',error=>{console.error(error.message);finished=true;process.exitCode=1;});
server.on('exit',code=>{finished=true;process.exitCode=code??0;});
process.on('SIGINT',()=>{finished=true;server.kill('SIGINT');});
const deadline=Date.now()+120000;
while(!finished&&Date.now()<deadline){if(await ready()){openBrowser();break;}await new Promise(resolve=>setTimeout(resolve,1000));}
if(!finished&&Date.now()>=deadline)console.log(`Browser opening timed out. When the server is ready, open ${url}`);
