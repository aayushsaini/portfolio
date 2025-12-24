import { Metadata } from 'next'
import { ContactClient } from '@/components/contact-client'

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Aayush Saini. Based in Hyderabad, India. Open to discussing engineering challenges, AI innovations, and new opportunities.',
    openGraph: {
        title: 'Contact | Aayush Saini',
        description:
            'Get in touch with Aayush Saini. Based in Hyderabad, India. Open to discussing engineering challenges, AI innovations, and new opportunities.',
    },
}

export default function ContactPage() {
    return <ContactClient />
}
