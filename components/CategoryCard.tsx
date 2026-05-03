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
  return slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default function CategoryCard({ categoryName, slugs, lang }: CategoryCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Сама карточка – клик открывает модальное окно */}
      <div
        onClick={() => setOpen(true)}
        className="group block h-full bg-white/40 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 rounded-2xl p-5 hover:bg-white dark:hover:bg-white/10 hover:border-black/10 dark:hover:border-white/20 hover:shadow-xl hover:shadow-black/[0.05] dark:hover:shadow-white/5 transition-all duration-500 flex flex-col justify-between cursor-pointer"
      >
        <div>
          <h3 className="text-lg font-bold text-black dark:text-white mb-1 group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
            {categoryName}
          </h3>
          <p className="text-sm text-black/50 dark:text-white/50">
            {slugs.length} file{slugs.length > 1 ? 's' : ''}
          </p>
          <ul className="mt-3 space-y-1">
            {slugs.slice(0, 4).map(slug => (
              <li key={slug} className="text-[13px] text-black/60 dark:text-white/60 truncate">
                {formatSlug(slug)}
              </li>
            ))}
            {slugs.length > 4 && (
              <li className="text-[13px] text-black/40 dark:text-white/40">+{slugs.length - 4} more</li>
            )}
          </ul>
        </div>
        <div className="mt-4 pt-4 border-t border-black/[0.05] dark:border-white/10">
          <span className="inline-flex items-center text-[11px] font-semibold tracking-[0.18em] text-black/40 dark:text-white/40 uppercase">
            Browse
          </span>
        </div>
      </div>

      {/* Модальное окно */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 dark:bg-black/50 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white dark:bg-gray-900 border border-black/10 dark:border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 border-b border-black/5 dark:border-white/10">
              <h2 className="text-xl font-bold text-black dark:text-white">{categoryName}</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-black dark:text-white" />
              </button>
            </div>
            <ul className="p-5 space-y-3">
              {slugs.map(slug => (
                <li key={slug}>
                  <Link
                    href={`/${lang}/pdf/${encodeURIComponent(slug)}`}
                    target="_blank"
                    className="block text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
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