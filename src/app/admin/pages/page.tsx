'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

interface PageData {
    home: {
        heroTitle: string
        heroSubtitle: string
    }
    about: {
        title: string
        intro: string
        description: string
    }
    contact: {
        title: string
        description: string
        email: string
        linkedin: string
    }
}

const defaultData: PageData = {
    home: {
        heroTitle: 'Engineering Intelligence.',
        heroSubtitle: 'Software Engineer at BCG. Specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
    },
    about: {
        title: 'About Me.',
        intro: 'I am Aayush Saini, a Software Engineer at Boston Consulting Group (BCG) and a 2x Azure Certified professional.',
        description: 'With a Masters from Thapar Institute of Engineering & Technology...',
    },
    contact: {
        title: "Let's Connect.",
        description: 'Based in Hyderabad, India. Open to discussing engineering challenges, AI innovations, and new opportunities.',
        email: 'aayush.r98@gmail.com',
        linkedin: 'https://www.linkedin.com/in/aayush-saini',
    },
}

export default function AdminPagesPage() {
    const [activeTab, setActiveTab] = useState<'home' | 'about' | 'contact'>('home')
    const [data, setData] = useState<PageData>(defaultData)
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await fetch(`/api/pages/${activeTab}`)
                if (res.ok) {
                    const page = await res.json()
                    if (page.content) {
                        setData(prev => ({
                            ...prev,
                            [activeTab]: JSON.parse(page.content)
                        }))
                    }
                }
            } catch (error) {
                console.error('Failed to fetch page:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [activeTab])

    const handleSave = async () => {
        setSaving(true)
        try {
            await fetch(`/api/pages/${activeTab}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: data[activeTab] }),
            })
        } catch (error) {
            console.error('Failed to save:', error)
        } finally {
            setSaving(false)
        }
    }

    const updateField = (field: string, value: string) => {
        setData(prev => ({
            ...prev,
            [activeTab]: {
                ...prev[activeTab],
                [field]: value
            }
        }))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
                        Page Content
                    </h1>
                    <p className="text-zinc-600 dark:text-zinc-400 mt-2">
                        Edit static page content
                    </p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-xl font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
                {(['home', 'about', 'contact'] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
                                ? 'bg-zinc-900 dark:bg-white text-white dark:text-black'
                                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                            }`}
                    >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-12 text-center">
                    <p className="text-zinc-500">Loading...</p>
                </div>
            ) : (
                <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10 p-8 space-y-6">
                    {activeTab === 'home' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Hero Title
                                </label>
                                <input
                                    type="text"
                                    value={data.home.heroTitle}
                                    onChange={(e) => updateField('heroTitle', e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Hero Subtitle
                                </label>
                                <textarea
                                    value={data.home.heroSubtitle}
                                    onChange={(e) => updateField('heroSubtitle', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </>
                    )}

                    {activeTab === 'about' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={data.about.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Intro Paragraph
                                </label>
                                <textarea
                                    value={data.about.intro}
                                    onChange={(e) => updateField('intro', e.target.value)}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.about.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                        </>
                    )}

                    {activeTab === 'contact' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={data.contact.title}
                                    onChange={(e) => updateField('title', e.target.value)}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={data.contact.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    rows={2}
                                    className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={data.contact.email}
                                        onChange={(e) => updateField('email', e.target.value)}
                                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                                        LinkedIn URL
                                    </label>
                                    <input
                                        type="url"
                                        value={data.contact.linkedin}
                                        onChange={(e) => updateField('linkedin', e.target.value)}
                                        className="w-full px-4 py-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
