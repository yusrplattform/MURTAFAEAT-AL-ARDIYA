import {env} from 'cloudflare:workers';
export function getRawDb(){if(!env.DB)throw new Error('Request database unavailable');return env.DB;}
