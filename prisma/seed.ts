import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const PROJECTS = [
    {
        id: '1',
        title: 'Agentic AI Suite',
        category: 'BCG • Engineering',
        image: 'https://picsum.photos/800/600?random=10',
        description: 'Developing advanced Agentic applications and high-performance enterprise products to enhance software offerings at Boston Consulting Group.',
        technologies: JSON.stringify(['LangChain', 'Python', 'React', 'AI Agents']),
        role: 'Lead Frontend Engineer',
        timeline: 'Aug 2024 - Present',
        challenge: 'Enterprises require AI solutions that go beyond simple chat interfaces. The challenge was to build a deterministic, reliable system where AI agents could plan, reason, and execute complex business workflows (like market research or financial analysis) while maintaining strict data governance and UI responsiveness.',
        solution: 'Architected a modular "Agentic" frontend using React and a Python/LangGraph backend. We implemented a streaming UI that visualizes the agent\'s "thought process" in real-time, allowing users to intervene or correct the agent\'s plan. The system uses a graph-based state machine to manage complex multi-step tasks.',
        impact: 'Significantly reduced the time required for internal research tasks. The platform is now being piloted with key enterprise clients, demonstrating a 40% reduction in manual data synthesis time.',
        order: 0,
    },
    {
        id: '2',
        title: 'Deloitte Omnia',
        category: 'Deloitte • Cloud Platform',
        image: 'https://picsum.photos/800/600?random=11',
        description: 'Award-winning audit platform featuring real-time multi-user collaboration, dynamic auto-save (100% data loss reduction), and WebSocket optimization.',
        technologies: JSON.stringify(['React', 'Redux', 'Azure', 'WebSockets']),
        role: 'Frontend Developer',
        timeline: 'Jan 2022 - Aug 2024',
        challenge: 'Audit teams frequently lost data due to connectivity issues and overwrote each other\'s work when editing large financial documents simultaneously. The existing legacy system was slow and prone to race conditions.',
        solution: 'Re-engineered the document editor using operational transformation logic and WebSockets for sub-millisecond state synchronization. Implemented a robust "smart save" mechanism that caches changes locally (IndexedDB) and syncs to Azure Blob Storage when connectivity is restored.',
        impact: 'Eliminated data loss incidents (100% reduction). Improved Lighthouse performance score by 23% through code splitting and asset optimization. Facilitated seamless collaboration for over 500+ concurrent auditors during peak season.',
        order: 1,
    },
    {
        id: '3',
        title: 'Twitter Sentiment Analysis',
        category: 'Publication • NLP',
        image: 'https://picsum.photos/800/600?random=12',
        description: 'Published research on performing sentiment analysis of Twitter accounts using Natural Language Processing techniques.',
        technologies: JSON.stringify(['Python', 'NLP', 'Machine Learning']),
        role: 'Researcher',
        timeline: '2021',
        challenge: 'Understanding public sentiment on social media is difficult due to sarcasm, slang, and context. Standard libraries often fail to capture the nuance of short-form text.',
        solution: 'Developed a custom NLP pipeline combining VADER (Valence Aware Dictionary and sEntiment Reasoner) with a trained Naive Bayes classifier. The system pre-processed tweets to handle emojis and slang before classification.',
        impact: 'Achieved 85% accuracy in sentiment classification on a test dataset of 10,000 tweets. The research paper was published in a peer-reviewed international journal.',
        order: 2,
    },
    {
        id: '4',
        title: 'Cloud FinTech Portal',
        category: 'BTA • Web App',
        image: 'https://picsum.photos/800/600?random=13',
        description: 'Cloud-native financial application development using React.js and Redux with robust Azure DevOps CI/CD pipelines.',
        technologies: JSON.stringify(['React', 'Azure DevOps', 'Redux']),
        role: 'Full Stack Developer',
        timeline: '2020 - 2021',
        challenge: 'The client needed a scalable, secure portal for managing financial portfolios. Manual deployment processes were causing downtime and introducing regression bugs.',
        solution: 'Built a responsive React dashboard with Redux for state management. Set up a complete CI/CD pipeline using Azure DevOps to automate testing and deployment, ensuring zero-downtime releases.',
        impact: 'Reduced deployment time from 2 hours to 15 minutes. The portal successfully scaled to support 5,000+ active users with 99.9% uptime.',
        order: 3,
    },
]

const BLOG_POSTS = [
    {
        id: '1',
        title: 'Optimizing for Concurrency',
        excerpt: 'Lessons learned building real-time collaboration features for enterprise audit platforms.',
        content: `Building real-time applications requires a shift in mindset from request-response to event-driven architectures. At Deloitte, working on the Omnia platform, we faced the challenge of enabling multiple auditors to work on the same document simultaneously.
    
The solution involved a mix of WebSockets for instant state propagation and optimistic UI updates to ensure the interface felt responsive. We engineered a concurrency management system that handled locking at a granular level, preventing write conflicts without blocking user productivity.

Key takeaway: Performance isn't just about code speed; it's about perceived latency. By handling state updates locally first and syncing in the background, we created a seamless collaborative experience.`,
        date: 'Aug 15, 2024',
        readTime: '6 min read',
        image: 'https://picsum.photos/800/400?random=14',
        tags: JSON.stringify(['Performance', 'WebSockets', 'React']),
        order: 0,
    },
    {
        id: '2',
        title: 'The Era of Agentic AI',
        excerpt: 'Moving beyond chatbots to autonomous agents that execute complex enterprise workflows.',
        content: `We are transitioning from "chatting with AI" to "working with AI agents". At BCG, I've been diving deep into Agentic workflows where LLMs don't just generate text—they plan, reason, and execute tasks.

Using tools like LangChain and LangGraph, we can structure applications where an "orchestrator" agent breaks down a complex business problem into sub-tasks, delegates them to specialized tools (or other agents), and synthesizes the results.

This shift requires rigorous engineering. Deterministic output is hard with probabilistic models. We need robust guardrails, evaluation frameworks, and a solid feedback loop to ensure these agents are reliable enough for enterprise use.`,
        date: 'Sep 10, 2024',
        readTime: '8 min read',
        image: 'https://picsum.photos/800/400?random=15',
        tags: JSON.stringify(['AI', 'LangChain', 'Agentic Workflows']),
        order: 1,
    },
    {
        id: '3',
        title: 'Azure for Frontend Devs',
        excerpt: 'Why earning my Azure AI Engineer Associate certification changed how I build UIs.',
        content: `Frontend development is no longer isolated from the cloud. Understanding the infrastructure—specifically Azure in my case—has allowed me to design better front-end architectures.

Being 2x Azure Certified (AI-102 & AZ-900), I can better grasp how our static assets are served, how edge caching works, and how to securely integrate with cognitive services directly.

For instance, integrating Azure OpenAI services isn't just an API call; it involves understanding quota management, latency optimization, and security policies that the frontend must respect.`,
        date: 'Oct 05, 2024',
        readTime: '5 min read',
        image: 'https://picsum.photos/800/400?random=16',
        tags: JSON.stringify(['Azure', 'Cloud', 'Certification']),
        order: 2,
    },
]

const PAGE_CONTENT = [
    {
        pageSlug: 'home',
        content: JSON.stringify({
            heroTitle: 'Engineering Intelligence.',
            heroSubtitle: 'Software Engineer at BCG. Specializing in Agentic AI, High-Performance React Architectures, and Cloud-Native Solutions.',
        }),
    },
    {
        pageSlug: 'about',
        content: JSON.stringify({
            title: 'About Me.',
            intro: 'I am Aayush Saini, a Software Engineer at Boston Consulting Group (BCG) and a 2x Azure Certified professional. I specialize in building well-engineered consumer products that solve real-world problems.',
            description: 'With a Masters from Thapar Institute of Engineering & Technology, I have contributed to developing new features and optimizing cloud-based applications using JavaScript, React, Redux, and Azure Cloud. I am currently part of the feature development team for advanced Agentic applications and audit platforms serving multiple clients.',
        }),
    },
    {
        pageSlug: 'contact',
        content: JSON.stringify({
            title: "Let's Connect.",
            description: 'Based in Hyderabad, India. Open to discussing engineering challenges, AI innovations, and new opportunities.',
            email: 'aayush.r98@gmail.com',
            linkedin: 'https://www.linkedin.com/in/aayush-saini',
        }),
    },
]

async function main() {
    console.log('Seeding database...')

    // Clear existing data
    await prisma.project.deleteMany()
    await prisma.blogPost.deleteMany()
    await prisma.pageContent.deleteMany()

    // Seed projects
    for (const project of PROJECTS) {
        await prisma.project.create({
            data: project,
        })
    }
    console.log(`Seeded ${PROJECTS.length} projects`)

    // Seed blog posts
    for (const post of BLOG_POSTS) {
        await prisma.blogPost.create({
            data: post,
        })
    }
    console.log(`Seeded ${BLOG_POSTS.length} blog posts`)

    // Seed page content
    for (const page of PAGE_CONTENT) {
        await prisma.pageContent.create({
            data: page,
        })
    }
    console.log(`Seeded ${PAGE_CONTENT.length} page content entries`)

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
