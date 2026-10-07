# النشر على حساب Cloudflare المستقل

في Workers Builds، اختر الفرع `main` واضبط:

| الإعداد | القيمة |
| --- | --- |
| Root directory | `site` |
| Build command | `npm run build:cloudflare` |
| Deploy command | `npm run deploy:cloudflare` |
| Node.js | 22.13 أو أحدث |

أُنشئت قاعدة D1 باسم `murtafaeat-al-ardiya-requests` في حساب الشركة، وربطها `DB` موجود في `wrangler.cloudflare.json`. أُنشئت الجداول الأساسية عبر Console وسُجلت الهجرة الأولى. لا يحتوي الإعداد على مفاتيح أو رموز وصول.

يبني الأمر الأول نسخة Worker وملفات الواجهة في `dist/server` و`dist/client`. ينشر الأمر الثاني الإعداد الناتج في `dist/server/wrangler.json`، بدل محاولة نشر المجلد الرئيسي كملفات ثابتة.

النشر التلقائي لا يغيّر مخطط قاعدة البيانات. لتطبيق هجرات جديدة، استخدم رمزًا مخولًا بصلاحية D1 Edit ثم:

```sh
npx wrangler d1 migrations apply DB --remote --config wrangler.cloudflare.json
```

يمكن كذلك تفعيل `CLOUDFLARE_APPLY_MIGRATIONS=1` عند استخدام رمز بناء لديه تلك الصلاحية. تُطبق الهجرات قبل نشر الموقع، لذا تُراجع أي تغييرات للمخطط قبل تفعيلها.

الطلبات متاحة لمالك الحساب داخل D1؛ لا توجد واجهة عامة لقراءة الطلبات، ولا إشعارات بريدية تلقائية. عند تغيير النطاق، حدّث عنوان Cloudflare في `vite.config.ts` ليطابق روابط SEO وخريطة الموقع.

لا تزال أوامر التطوير المحلي ونسخة Sites تستخدم إعدادها السابق. تُفعّل إعدادات الحساب المستقل فقط عند `build:cloudflare`.
