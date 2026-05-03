import { readdir } from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import CategoryCard from '@/components/CategoryCard'

export const dynamic = 'force-dynamic'

// ---------------------------------------------------------------
// 1. Чтение и группировка по детальным категориям
// ---------------------------------------------------------------
async function getDetailedGrouping() {
  const pdfDir = path.join(process.cwd(), 'public', 'pdf')
  let files: string[] = []

  try {
    files = (await readdir(pdfDir)).filter(f => f.endsWith('.pdf'))
  } catch {
    return { categories: {}, uncategorized: [] }
  }

  const categoryKeywords: { name: string; keywords: string[] }[] = [
    { name: 'Abstract Algebra',            keywords: ['abstract_algebra'] },
    { name: 'Algorithms & Complexity',     keywords: ['algorithmic_complexity'] },
    { name: 'Anonymous Networks',          keywords: ['anonymous_networks'] },
    { name: 'Asymmetric Cryptography',     keywords: ['asymmetric_cryptography'] },
    { name: 'C Language Reference',        keywords: ['c_language_staff_reference'] },
    { name: 'Category Theory',             keywords: ['category_theory'] },
    { name: 'Classical Algorithms',        keywords: ['classical_algorithms'] },
    { name: 'Compilers & Interpreters',    keywords: ['compilers_interpreters'] },
    { name: 'Compression Algorithms',      keywords: ['compression_algorithms'] },
    { name: 'Consensus & Replication',     keywords: ['consensus_replication'] },
    { name: 'CPU Microarchitecture',       keywords: ['cpu_microarchitecture'] },
    { name: 'Cryptanalysis',               keywords: ['cryptanalysis'] },
    { name: 'Cryptography Reference',      keywords: ['cryptography_staff_reference'] },
    { name: 'Debugging & Profiling',       keywords: ['debugging_profiling'] },
    { name: 'Digital Logic',               keywords: ['digital_logic'] },
    { name: 'Discrete Mathematics',        keywords: ['discrete_mathematics'] },
    { name: 'Distributed Security',        keywords: ['distributed_security'] },
    { name: 'Distributed Storage',         keywords: ['distributed_storage'] },
    { name: 'Fault Tolerance & Reliability', keywords: ['fault_tolerance_reliability'] },
    { name: 'Filesystems',                 keywords: ['filesystems_complete_reference'] },
    { name: 'Game Theory & Decision',      keywords: ['game_theory_decision'] },
    { name: 'Graph Theory',                keywords: ['graph_theory'] },
    { name: 'Hash Functions',              keywords: ['hash_functions'] },
    { name: 'High‑Perf Packet Processing', keywords: ['high_perf_packet_processing'] },
    { name: 'In‑Memory Data Structures',   keywords: ['in_memory_data_structures'] },
    { name: 'Information Theory',          keywords: ['information_theory'] },
    { name: 'Java Backend Reference',      keywords: ['java_backend_staff_reference'] },
    { name: 'Linux Kernel x86 Reference',  keywords: ['linux_kernel_x86_reference'] },
    { name: 'Memory Management',           keywords: ['memory_management'] },
    { name: 'Memory & Storage Hierarchy',  keywords: ['memory_storage_hierarchy'] },
    { name: 'Number Theory',               keywords: ['number_theory'] },
    { name: 'ODE Dynamical Systems',       keywords: ['ode_dynamical_systems'] },
    { name: 'P2P Networks',                keywords: ['p2p_networks'] },
    { name: 'Parallel & Concurrent Algs',  keywords: ['parallel_concurrent_algorithms'] },
    { name: 'Peripherals & Buses',         keywords: ['peripherals_buses'] },
    { name: 'Probabilistic & Approx Algs', keywords: ['probabilistic_approximate_algorithms'] },
    { name: 'Probability & Statistics',    keywords: ['probability_statistics'] },
    { name: 'Programming Language Theory', keywords: ['programming_language_theory'] },
    { name: 'Protocol Stack L1‑L7',        keywords: ['protocol_stack_l1_l7'] },
    { name: 'Quantum & Post‑Quantum Crypto', keywords: ['quantum_postquantum_cryptography'] },
    { name: 'Routing L3',                  keywords: ['routing_l3_complete_reference'] },
    { name: 'Sockets Network API',         keywords: ['sockets_network_api'] },
    { name: 'Symmetric Cryptography',      keywords: ['symmetric_cryptography'] },
    { name: 'Syscall ABI Reference',       keywords: ['syscall_abi_reference'] },
    { name: 'x86 Assembly Reference',      keywords: ['x86_asm_staff_reference'] },
    { name: 'x86 Complete Reference',      keywords: ['x86_complete_reference'] },
    { name: 'x86 ISA Architecture',        keywords: ['x86_isa_architecture'] },
  ]

  const categories: Record<string, string[]> = {}
  const uncategorized: string[] = []

  for (const file of files) {
    const slug = file.replace(/\.pdf$/i, '')
    const clean = slug.toLowerCase()
    let found = false
    for (const cat of categoryKeywords) {
      if (cat.keywords.some(kw => clean.includes(kw))) {
        if (!categories[cat.name]) categories[cat.name] = []
        categories[cat.name].push(slug)
        found = true
        break
      }
    }
    if (!found) uncategorized.push(slug)
  }

  return { categories, uncategorized }
}

// ---------------------------------------------------------------
// 2. Объединение в крупные разделы (супер‑группы)
// ---------------------------------------------------------------
const superGroups: { name: string; catNames: string[] }[] = [
  {
    name: 'Mathematics',
    catNames: [
      'Abstract Algebra',
      'Category Theory',
      'Discrete Mathematics',
      'Game Theory & Decision',
      'Graph Theory',
      'Information Theory',
      'Number Theory',
      'ODE Dynamical Systems',
      'Probabilistic & Approx Algs',
      'Probability & Statistics',
    ],
  },
  {
    name: 'Programming & Software',
    catNames: [
      'C Language Reference',
      'Compilers & Interpreters',
      'Debugging & Profiling',
      'Java Backend Reference',
      'Programming Language Theory',
      'Algorithms & Complexity',
      'Classical Algorithms',
      'Parallel & Concurrent Algs',
      'Compression Algorithms',
    ],
  },
  {
    name: 'Computer Architecture & Low‑Level',
    catNames: [
      'CPU Microarchitecture',
      'Digital Logic',
      'Memory Management',
      'Memory & Storage Hierarchy',
      'Peripherals & Buses',
      'Syscall ABI Reference',
      'Linux Kernel x86 Reference',
      'x86 Assembly Reference',
      'x86 Complete Reference',
      'x86 ISA Architecture',
      'In‑Memory Data Structures',
    ],
  },
  {
    name: 'Networking & Distributed Systems',
    catNames: [
      'Anonymous Networks',
      'Consensus & Replication',
      'Distributed Security',
      'Distributed Storage',
      'Fault Tolerance & Reliability',
      'High‑Perf Packet Processing',
      'P2P Networks',
      'Protocol Stack L1‑L7',
      'Routing L3',
      'Sockets Network API',
      'Filesystems',
    ],
  },
  {
    name: 'Cryptography & Security',
    catNames: [
      'Asymmetric Cryptography',
      'Cryptanalysis',
      'Cryptography Reference',
      'Hash Functions',
      'Quantum & Post‑Quantum Crypto',
      'Symmetric Cryptography',
    ],
  },
]

// ---------------------------------------------------------------
// 3. Страница
// ---------------------------------------------------------------
function formatSlug(slug: string) {
  return slug.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
}

export default async function PdfLibraryPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const { categories, uncategorized } = await getDetailedGrouping()

  const groupedBySuper = superGroups.map(group => {
    const present: Record<string, string[]> = {}
    for (const catName of group.catNames) {
      if (categories[catName]) present[catName] = categories[catName]
    }
    return { name: group.name, categories: present }
  }).filter(g => Object.keys(g.categories).length > 0)

  const assignedCatNames = new Set(superGroups.flatMap(g => g.catNames))
  const remainingCategories = Object.entries(categories).filter(([name]) => !assignedCatNames.has(name))

  const totalFiles =
    Object.entries(categories).reduce((acc, [, slugs]) => acc + slugs.length, 0) +
    uncategorized.length

  const totalSuperFiles = groupedBySuper.reduce(
    (acc, g) => acc + Object.values(g.categories).reduce((sum, slugs) => sum + slugs.length, 0),
    0,
  )
  const remainingFiles =
    remainingCategories.reduce((acc, [, slugs]) => acc + slugs.length, 0) + uncategorized.length

  return (
    <div className="min-h-screen pt-11">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-extrabold text-black dark:text-white mb-2">PDF Library</h1>
        <p className="text-black/50 dark:text-white/50 text-sm mb-12">
          {totalFiles} documents
        </p>

        {/* Супер‑группы */}
        {groupedBySuper.map(superGroup => {
          const groupFileCount = Object.values(superGroup.categories).reduce(
            (sum, slugs) => sum + slugs.length,
            0,
          )
          return (
            <section key={superGroup.name} className="mb-16">
              <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
                {superGroup.name}
              </h2>
              <p className="text-sm text-black/50 dark:text-white/50 mb-6">
                {Object.keys(superGroup.categories).length} subcategor
                {Object.keys(superGroup.categories).length > 1 ? 'ies' : 'y'} · {groupFileCount}{' '}
                file{groupFileCount > 1 ? 's' : ''}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(superGroup.categories)
                  .sort(([a], [b]) => a.localeCompare(b))
                  .map(([catName, slugs]) => (
                    <CategoryCard key={catName} categoryName={catName} slugs={slugs} lang={lang} />
                  ))}
              </div>
            </section>
          )
        })}

        {/* Оставшиеся категории + uncategorized */}
        {(remainingCategories.length > 0 || uncategorized.length > 0) && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-black dark:text-white mb-4">
              Other Documents
            </h2>
            <p className="text-sm text-black/50 dark:text-white/50 mb-6">
              {remainingCategories.length} subcategor
              {remainingCategories.length > 1 ? 'ies' : 'y'} · {remainingFiles} file
              {remainingFiles > 1 ? 's' : ''}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {remainingCategories.map(([catName, slugs]) => (
                <CategoryCard key={catName} categoryName={catName} slugs={slugs} lang={lang} />
              ))}
              {uncategorized.length > 0 && (
                <div className="bg-white/40 dark:bg-white/5 border border-black/[0.05] dark:border-white/10 rounded-2xl p-5">
                  <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                    Uncategorized
                  </h3>
                  <p className="text-sm text-black/50 dark:text-white/50">
                    {uncategorized.length} file{uncategorized.length > 1 ? 's' : ''}
                  </p>
                  <ul className="mt-3 space-y-1">
                    {uncategorized.map(slug => (
                      <li key={slug} className="text-[13px] text-blue-600 dark:text-blue-400">
                        <Link
                          href={`/en/pdf/${encodeURIComponent(slug)}`}
                          target="_blank"
                          className="hover:underline"
                        >
                          {formatSlug(slug)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}