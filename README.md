# مشكاة — Mishkat

## تشغيل محلي (Termux)
    pkg install python
    python -m http.server 8080      # ثم افتح localhost:8080 في كروم

## بناء APK (سحابيًا عبر GitHub Actions)
البناء يجلب الخطوط وحصن المسلم تلقائيًا، ويضغط الكود (esbuild) ليعمل على الأجهزة القديمة. لو فتح التطبيق على شاشة «تعذّر تشغيل مشكاة» فهي تعرض سبب الخطأ، أرسله للمطوّر.
1. ارفع المشروع على مستودع GitHub جديد (فرع main).
2. من تبويب Actions شغّل "Build Android APK" (يعمل تلقائيًا مع كل push).
3. بعد 6–10 دقائق ادخل على التشغيل ونزّل Artifact باسم mishkat-apk (ملف app-debug.apk) وثبّته.

## محتوى الأذكار للعمل بدون إنترنت (مهم)
الأذكار والأدعية (حصن المسلم) تُجلب من الإنترنت. لتضمينها داخل التطبيق نفسه شغّل مرة واحدة (في تريمكس أو على جهازك):
    python3 tools/fetch_adhkar.py
فيُنشأ الملف data/adhkar.json (132 بابًا). ارفعه مع المشروع، وبناء الـ APK على GitHub يجلبه تلقائيًا.

## نسخة موقّعة للنشر (اختياري)
1. أنشئ مفتاحًا مرة واحدة (احتفظ به وبكلمة سره للأبد):
       pkg install openjdk-17
       keytool -genkeypair -v -keystore mishkat.jks -alias mishkat -keyalg RSA -keysize 2048 -validity 10000
       base64 -w0 mishkat.jks      # انسخ الناتج
2. في GitHub: Settings → Secrets and variables → Actions، أضف: KEYSTORE_BASE64 (الناتج) و KEYSTORE_PASSWORD و KEY_ALIAS (=mishkat).
3. شغّل Build مرة أخرى، فيظهر Artifact باسم mishkat-release-apk.

## تنبيهات الصلاة
تعمل داخل تطبيق أندرويد فقط: من قسم Prayer فعّل التنبيهات، وتُجدول لـ 7 أيام قادمة وتتجدد كلما فتحت التطبيق.

## الأقسام
كل ميزة شاشة مستقلة في js/screens: home, library, read, audio, tafsir, search, hifz, recite, prayer(=times), azkar, ramadan, qibla, bookmarks, downloads, profile, about.

## إضافة ميزة جديدة
1. أنشئ js/screens/x.js: export default async function(el,arg){ el.innerHTML='...' }
2. سجّلها في ROUTES و TITLE داخل js/app.js، وأضف بلاطة لها في js/screens/home.js.
مصدر البيانات: js/api.js • التخزين أوفلاين: js/offline.js • اسم التطبيق والإصدار: js/config.js
