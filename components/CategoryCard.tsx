'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

interface CategoryCardProps {
  categoryName: string
  slugs: string[]
  lang: string
}

function formatSlug(slug: string) {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function CategoryCard({ categoryName, slugs, lang }: CategoryCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Карточка — теперь как кнопка для accessibility */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl border border-black/[0.05] bg-white/40 p-5 text-left transition-all duration-500 hover:border-black/10 hover:bg-white hover:shadow-xl hover:shadow-black/[0.05] dark:border-white/10 dark:bg-white/5 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:shadow-white/5"
      >
        <div>
          <h3 className="mb-1 text-lg font-bold text-black transition-colors group-hover:text-black/80 dark:text-white dark:group-hover:text-white/80">
            {categoryName}
          </h3>
          <p className="text-sm text-black/50 dark:text-white/50">
            {slugs.length} file{slugs.length > 1 ? 's' : ''}
          </p>
          <ul className="mt-3 space-y-1">
            {slugs.slice(0, 4).map((slug) => (
              <li key={slug} className="truncate text-[13px] text-black/60 dark:text-white/60">
                {formatSlug(slug)}
              </li>
            ))}
            {slugs.length > 4 && (
              <li className="text-[13px] text-black/40 dark:text-white/40">
                +{slugs.length - 4} more
              </li>
            )}
          </ul>
        </div>
        <div className="border-t border-black/[0.05] pt-4 dark:border-white/10">
          <span className="inline-flex items-center text-[11px] font-semibold tracking-[0.18em] text-black/40 uppercase dark:text-white/40">
            Browse
          </span>
        </div>
      </button>

      {/* Модальное окно */}
      {open && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => setOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4 backdrop-blur-sm dark:bg-black/50"
        >
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
            className="max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between border-b border-black/5 p-5 dark:border-white/10">
              <h2 className="text-xl font-bold text-black dark:text-white">{categoryName}</h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5 text-black dark:text-white" />
              </button>
            </div>
            <ul className="space-y-3 p-5">
              {slugs.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/${lang}/pdf/${encodeURIComponent(slug)}`}
                    target="_blank"
                    className="truncate text-sm text-blue-600 hover:underline dark:text-blue-400"
                    onClick={() => setOpen(false)}
                  >
                    {formatSlug(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
