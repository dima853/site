// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Self University',
    description: 'Blog about self-education',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}