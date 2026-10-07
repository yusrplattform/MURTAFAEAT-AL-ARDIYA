import {notFound} from 'next/navigation';
import {SitePage} from '../site';
import {pages} from '../../lib/content';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=pages[slug];return p?{title:p.title,description:p.description,alternates:{canonical:`/${slug}`}}:{};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(!pages[slug])notFound();return <SitePage page={slug}/>}
