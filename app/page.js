/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from "next/image";
import { Hovertext } from "@/components/Icon";
import BackgroundGridTrail from "@/components/BackgroundGridTrail";
import ProjectCard from "@/components/ProjectCard";
import Link from 'next/link'
import { useState, useEffect } from "react"
import { Github, Linkedin, Mail } from "lucide-react"
import { SiReact, SiPrometheus, SiAmazonwebservices, SiKubernetes, SiGrafana, SiNodedotjs, SiPostgresql, SiGooglecloud, SiTensorflow, SiPytorch, SiPython, SiNextdotjs, SiTailwindcss, SiDocker } from '@icons-pack/react-simple-icons';

const ExperienceItem = ({ role, company, period, description }) => {
  return (
    <div className="group relative border-l border-white/10 pl-8 py-2 hover:border-white/30 transition-colors">
      <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-zinc-400 transition-colors"></div>
      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
        <h3 className="text-lg font-medium text-zinc-200">{company}</h3>
        <span className="text-sm font-mono text-zinc-500">{period}</span>
      </div>
      <div className="text-base text-zinc-400 font-medium mb-2">{role}</div>
      <p className="text-sm text-zinc-500 leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  )
}

const TechCategory = ({ title, children }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-wider">{title}</h3>
    <div className="flex flex-wrap gap-4">
      {children}
    </div>
  </div>
)

const TechIcon = ({ icon: Icon, name }) => (
  <div className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-all">
    <Icon size={20} className="text-zinc-400 group-hover:text-white transition-colors" />
    <span className="text-sm text-zinc-400 group-hover:text-zinc-200 transition-colors">{name}</span>
  </div>
)

export default function Home() {
  const [country, setCountry] = useState("IN")

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipinfo.io/?token=8266cf5458e902');
        if (response.ok) {
          const data = await response.json();
          setCountry(data.country)
        }
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    };
    fetchLocation();
  }, []);

  return (
    <div className="flex flex-1 flex-col overflow-x-hidden bg-black selection:bg-white/20">

      {/* Hero Section */}
      <section className="relative min-h-[60vh] w-full flex flex-col justify-center items-center text-center px-6 sm:px-12 lg:px-24 pt-20">
        <div className="z-10 max-w-3xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-zinc-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Based in India
          </div>

          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            Hey, I'm Chandrahaas.
          </h1>

          <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed mb-10">
            I build tools, write about tech, and explore the web. <br className="hidden sm:block" />
            Welcome to my <span className="text-zinc-200 font-medium">Crib</span>.
          </p>

          <div className="flex gap-6 justify-center">
            <Link href="https://github.com/chandrahaas02" target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Github size={24} /></Link>
            <Link href="https://www.linkedin.com/in/chandrahaas-vakkalagadda-05b909188/" target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={24} /></Link>
            <Link href="mailto:chandrahaas02@gmail.com" target="_blank" className="text-zinc-500 hover:text-white transition-colors"><Mail size={24} /></Link>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="px-6 sm:px-12 lg:px-24 py-24 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-mono text-zinc-500 mb-12 tracking-widest uppercase">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <TechCategory title="Frontend">
              <TechIcon icon={SiReact} name="React" />
              <TechIcon icon={SiNextdotjs} name="Next.js" />
              <TechIcon icon={SiTailwindcss} name="Tailwind" />
            </TechCategory>

            <TechCategory title="Backend">
              <TechIcon icon={SiNodedotjs} name="Node.js" />
              <TechIcon icon={SiPython} name="Python" />
              <TechIcon icon={SiPostgresql} name="PostgreSQL" />
            </TechCategory>

            <TechCategory title="DevOps & Cloud">
              <TechIcon icon={SiKubernetes} name="Kubernetes" />
              <TechIcon icon={SiDocker} name="Docker" />
              <TechIcon icon={SiAmazonwebservices} name="AWS" />
              <TechIcon icon={SiGooglecloud} name="GCP" />
              <TechIcon icon={SiPrometheus} name="Prometheus" />
              <TechIcon icon={SiGrafana} name="Grafana" />
            </TechCategory>

            <TechCategory title="AI & ML">
              <TechIcon icon={SiTensorflow} name="TensorFlow" />
              <TechIcon icon={SiPytorch} name="PyTorch" />
            </TechCategory>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="px-6 sm:px-12 lg:px-24 py-24 border-t border-white/5 bg-zinc-900/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-mono text-zinc-500 mb-12 tracking-widest uppercase">Experience</h2>
          <div className="flex flex-col gap-12">
            <ExperienceItem
              company="Komprise"
              role="Software Engineer"
              period="Present"
              description="Leading on-premises migration projects, ensuring seamless transitions and maintaining data integrity for enterprise-level clients at speed."
            />
            <ExperienceItem
              company="StoryXpress"
              role="Devops Engineer"
              period="Previous"
              description="Optimized infrastructure and deployment through Kubernetes migration, GitOps Strategy, and continuous monitoring. Led development of AI tools."
            />
            <ExperienceItem
              company="I'm beside You"
              role="Data Science Intern"
              period="Internship"
              description="Designed a Recommendation System using collaborative filters and explored several DL based approaches."
            />
            <ExperienceItem
              company="Willings"
              role="Service Provider"
              period="Contract"
              description="Created a one-stop destination for Japanese wall art. Designed user and admin portals and implemented a database."
            />
          </div>
        </div>
      </section>

      {/* Latest Activity Section */}
      <section className="px-6 sm:px-12 lg:px-24 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm font-mono text-zinc-500 mb-12 tracking-widest uppercase">Latest Activity</h2>

          <div className="relative border-l border-white/10 ml-3 space-y-12">
            {[
              {
                type: 'blog',
                title: 'Exploring Temporal.io',
                description: 'Diving deep into durable execution and reliable workflows for backend systems.',
                date: 'Nov 2024',
                link: '/blog/temporal',
                tag: 'Backend'
              },
              {
                type: 'tool',
                title: 'JSON Formatter',
                description: 'Released a new utility to validate and format JSON data.',
                date: 'Oct 2024',
                link: '/tools/json',
                tag: 'Tool'
              },
              {
                type: 'blog',
                title: 'My Obsidian Workflow',
                description: 'How I manage knowledge and notes using Obsidian and a few key plugins.',
                date: 'Sep 2024',
                link: '/blog/obsidian',
                tag: 'Productivity'
              },
              {
                type: 'tool',
                title: 'Markdown Preview',
                description: 'Built a real-time Markdown editor for content creation.',
                date: 'Aug 2024',
                link: '/tools/markdown',
                tag: 'Tool'
              },
              {
                type: 'blog',
                title: 'VS Code Setup',
                description: 'A look at my extensions, theme, and settings for 2024.',
                date: 'Jul 2024',
                link: '/blog/vscode',
                tag: 'DevEnv'
              },
              {
                type: 'tool',
                title: 'Base64 Converter',
                description: 'Simple utility for encoding and decoding Base64 strings.',
                date: 'Jun 2024',
                link: '/tools/base64',
                tag: 'Tool'
              }
            ].map((item, index) => (
              <div key={index} className="relative pl-8 group">
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-700 group-hover:border-zinc-400 transition-colors"></div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <span className="text-xs font-mono text-zinc-500 mb-1 sm:mb-0">{item.date}</span>
                  <span className="text-xs font-mono text-zinc-600 border border-zinc-800 px-2 py-0.5 rounded-full">{item.tag}</span>
                </div>
                <Link href={item.link} className="block group-hover:translate-x-1 transition-transform duration-300">
                  <h3 className="text-lg font-medium text-zinc-200 group-hover:text-white transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/blog" className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors border-b border-transparent hover:border-zinc-500 pb-0.5">
              View all archives
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 sm:px-12 lg:px-24 py-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-zinc-600 text-sm">© 2024 Chandrahaas. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <Link href="#" className="hover:text-zinc-300 transition-colors">Twitter</Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-zinc-300 transition-colors">GitHub</Link>
        </div>
      </footer>

    </div>
  );
}
