import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import path from 'path'

interface Props {
  params: Promise<{ slug: string }>
}

export async function GET(request: Request, { params }: Props) {
  const { slug } = await params

  const safeSlug = path.basename(slug)

  try {
    const filePath = path.join(process.cwd(), 'public', 'pdf', `${safeSlug}.pdf`)
    const fileBuffer = await readFile(filePath)

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${safeSlug}.pdf"`,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    notFound()
  }
}
