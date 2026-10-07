import {company} from '../lib/content';
export default function robots(){return {rules:{userAgent:'*',allow:'/',disallow:'/api/'},sitemap:company.origin+'/sitemap.xml'};}
