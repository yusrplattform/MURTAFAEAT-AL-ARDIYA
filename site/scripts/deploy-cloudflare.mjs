import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const cli=fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url));
if(!existsSync(new URL('../dist/server/index.js',import.meta.url)))throw new Error('Build the site first with npm run build:cloudflare.');
function run(args){const result=spawnSync(process.execPath,[cli,...args],{stdio:'inherit'});if(result.error)throw result.error;if(result.status!==0)process.exit(result.status??1);}
// Schema changes are a separate admin operation; the automatic build token does
// not need direct database edit permission to publish a bound Worker.
if(process.env.CLOUDFLARE_APPLY_MIGRATIONS==='1')run(['d1','migrations','apply','DB','--remote','--config','wrangler.cloudflare.json']);
run(['deploy','--config','dist/server/wrangler.json']);
