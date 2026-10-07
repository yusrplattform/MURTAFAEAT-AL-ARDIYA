import {company,pages} from '../lib/content';
export default function sitemap(){return ['/',...Object.keys(pages).map(s=>`/${s}`)].map(p=>({url:company.origin+p,changeFrequency:'monthly' as const,priority:p==='/'?1:.7}));}
