// app/[lang]/page.tsx
import { redirect } from 'next/navigation'
import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

interface Props {
    params: Promise<{
        lang: string
    }>
}

export default async function HomePage({ params }: Props) {
    const { lang } = await params

    // ФИЛЬТРУЕМ посты по языку
    const postsForCurrentLang = allBlogs.filter(post => post.language === lang)
    const sortedPosts = sortPosts(postsForCurrentLang)
    const posts = allCoreContent(sortedPosts)

    return (
        <div>
            <h1>Welcome to {lang} version</h1>
            <Main posts={posts} />
        </div>
    )
}