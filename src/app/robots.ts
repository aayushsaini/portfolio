import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.SITE_URL || 'https://aayushsaini.com'

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/api/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
