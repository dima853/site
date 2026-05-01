import { allBlogs } from 'contentlayer/generated'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const posts = allBlogs
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
      .map((post) => ({
        title: post.title,
        slug: post.slug,
        date: post.date,
        summary: post.summary || '',
        language: post.language || 'en',
        path: post.path || `/en/blog/${post.slug}`,
        images: post.images || [],
        tags: post.tags || [],
      }))

    return NextResponse.json(posts, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 's-maxage=3600, stale-while-revalidate',
      },
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}
