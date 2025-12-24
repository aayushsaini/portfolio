import { Metadata } from 'next'
import { AboutClient } from '@/components/about-client'

export const metadata: Metadata = {
    title: 'About',
    description:
        'Software Engineer at BCG and 2x Azure Certified professional specializing in building well-engineered consumer products.',
    openGraph: {
        title: 'About | Aayush Saini',
        description:
            'Software Engineer at BCG and 2x Azure Certified professional specializing in building well-engineered consumer products.',
    },
}

export default function AboutPage() {
    return <AboutClient />
}
