import {env} from 'cloudflare:workers';
export function leadDb(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
