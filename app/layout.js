"use client"
import "./globals.css";

import { House, NotebookPen, Wrench, Github, Linkedin, Mail, FileDown } from "lucide-react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GoogleAnalytics } from '@next/third-parties/google'


function NavbarItem({ children, link, active }) {
  return (
    <Link href={link} className={`p-4 flex items-center justify-center transition-colors duration-200 rounded-xl ${active ? 'text-white bg-white/10' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}>
      {children}
    </Link>
  )
}


function Navbar() {
  const pathname = usePathname()
  return (
    <>
      <div className="fixed z-10 bottom-0 w-full sm:w-20 sm:static flex flex-row sm:flex-col sm:h-screen justify-between border-t sm:border-t-0 sm:border-r border-white/10 bg-black backdrop-blur-md">
        <div className="flex flex-row sm:flex-col justify-around sm:justify-start sm:gap-4 sm:p-2">
          <NavbarItem link={"/"} active={pathname === '/'}><House size={24} /></NavbarItem>
          <NavbarItem link={"/blog"} active={pathname.split("/")[1] == 'blog'}><NotebookPen size={24} /></NavbarItem>
          <NavbarItem link={"/tools"} active={pathname.split("/")[1] === 'tools'}><Wrench size={24} /></NavbarItem>
        </div>
        <div className="hidden sm:flex sm:flex-col gap-4 p-4">
          <Link href="https://drive.google.com/file/d/12jfa58MFEqhVukJlXorwHZW_ExfGh2ks/view?usp=sharing" target="_blank" className="text-zinc-500 hover:text-zinc-300 transition-colors p-2"><FileDown size={24} /></Link>
          <Link href="https://github.com/chandrahaas02" target="_blank" className="text-zinc-500 hover:text-zinc-300 transition-colors p-2"><Github size={24} /></Link>
          <Link href="https://www.linkedin.com/in/chandrahaas-vakkalagadda-05b909188/" target="_blank" className="text-zinc-500 hover:text-zinc-300 transition-colors p-2"><Linkedin size={24} /></Link>
          <Link href="mailto:chandrahaas02@gmail.com" target="_blank" className="text-zinc-500 hover:text-zinc-300 transition-colors p-2"><Mail size={24} /></Link>
        </div>
      </div>
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Chandrahaas</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="google-site-verification" content="pPVFaBYMsDHl5EBXaTbJNmdH1ng0BRBQ9fiVyG2ELC0" />
      </head>
      <body className="relative flex flex-col-reverse sm:flex-row h-full min-h-screen w-full bg-black text-zinc-200 selection:bg-white/20">
        <Navbar />
        <div className="flex flex-1 w-full overflow-y-auto max-h-screen pb-20 sm:pb-0">
          {children}
        </div>
      </body>
      <GoogleAnalytics gaId="G-MWSNV0NHZE" />
    </html>
  );
}
