// middleware.js
import { NextResponse } from 'next/server'

// Поддерживаемые языки
const locales = ['en', 'ru']
const defaultLocale = 'ru'

// Получаем предпочтительный язык из заголовков
function getLocale(request) {
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
        const preferredLang = acceptLanguage.split(',')[0].split('-')[0]
        if (locales.includes(preferredLang)) {
            return preferredLang
        }
    }
    return defaultLocale
}

export function middleware(request) {
    const { pathname } = request.nextUrl

    // Пропускаем статические файлы
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/static') ||
        pathname.includes('.')
    ) {
        return
    }

    // Проверяем есть ли локаль в пути
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Добавляем локаль в путь
    const locale = getLocale(request)
    request.nextUrl.pathname = `/${locale}${pathname}`

    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Пропускаем все внутренние пути и API
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}