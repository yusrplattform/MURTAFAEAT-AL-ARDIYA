import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://murtafaat-al-ardiya.rahaf-98.chatgpt.site'),title:{default:'مرتفعات العارضية للتجارة والمقاولات | قيمة عقارية مستدامة',template:'%s | مرتفعات العارضية'},description:'خدمات التطوير العقاري والوساطة العقارية والتثمين العقاري. حلول مدروسة واهتمام باحتياج العميل.',icons:{icon:'/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ar" dir="rtl"><body>{children}</body></html>}
