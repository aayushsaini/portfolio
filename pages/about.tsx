import React from 'react'
import { motion } from 'framer-motion'
import { Code, Cpu, Award, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

export const About: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="pt-32 pb-20 px-6 max-w-5xl mx-auto min-h-screen"
        >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">About Me.</h2>
            <div className="prose prose-invert prose-lg text-zinc-300">
                <p className="text-xl leading-relaxed mb-8">
                    I am Aayush Saini, a Software Engineer at <strong>Boston Consulting Group (BCG)</strong> and a 2x Azure Certified professional.
                    I specialize in building well-engineered consumer products that solve real-world problems.
                </p>
                <p className="text-lg leading-relaxed mb-12">
                    With a Masters from Thapar Institute of Engineering & Technology, I have contributed to developing new features and optimizing cloud-based applications using
                    JavaScript, React, Redux, and Azure Cloud. I am currently part of the feature development team for advanced Agentic applications and audit platforms serving multiple clients.
                </p>

                <h3 className="text-2xl font-bold text-white mb-6">Experience & Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {[
                        { icon: Code, title: 'Technical Stack', desc: 'React, Redux, JavaScript, Python, LangChain, LangGraph, Django REST, HTML/SCSS.', color: 'text-blue-400' },
                        { icon: Award, title: 'Certifications', list: ['Microsoft Certified: Azure AI Engineer Associate (AI-102)', 'Microsoft Certified: Azure Fundamentals (AZ-900)', 'AWS Fundamentals: Building Serverless Applications'], color: 'text-purple-400' },
                        { icon: Cpu, title: 'Domain Expertise', desc: 'Agentic AI, Cloud-Native App Dev, Real-time Collaboration (WebSockets), Performance Optimization.', color: 'text-emerald-400' },
                        { icon: BookOpen, title: 'Education', content: <><p className="font-medium text-white">Thapar Institute of Engineering & Technology</p><p className="mb-2">Master of Computer Applications (2020 - 2022)</p><p className="font-medium text-white">DIT University</p><p>Bachelor of Computer Applications (2017 - 2020)</p></>, color: 'text-orange-400' }
                    ].map((item, i) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl"
                        >
                            <item.icon className={cn("w-8 h-8 mb-4", item.color)} />
                            <h4 className="font-semibold text-white mb-2">{item.title}</h4>
                            {item.list ? (
                                <ul className="text-sm text-zinc-400 space-y-1">
                                    {item.list.map(l => <li key={l}>• {l}</li>)}
                                </ul>
                            ) : item.content ? (
                                <div className="text-sm text-zinc-400">{item.content}</div>
                            ) : (
                                <p className="text-sm text-zinc-400">{item.desc}</p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}
