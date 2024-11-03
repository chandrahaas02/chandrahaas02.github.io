"use client"
import "./globals.css";

import { House, NotebookPen, Wrench, Github, Linkedin, Mail, FileDown } from "lucide-react"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GoogleAnalytics } from '@next/third-parties/google'


function NavbarItem({ children, link, active }) {
  return (
    <div className="p-5 relative flex items-center">
      {active && (<div className="absolute max-sm:top-0 sm:left-0 sm:top-relative w-5 h-1 sm:w-1 sm:h-5 bg-white" />)}
      <Link href={link}>{children}</Link>
    </div>
  )
}


function Navbar() {
  const pathname = usePathname()
  return (
    <>
      <div className="fixed z-10 bottom-0 min-w-full sm:min-w-0 sm:static flex-none flex flex-row sm:flex-col sm:min-h-screen border-r border-r-neutral-900 overflow-hidden">
        <div className="sm:flex-1 flex sm:flex-col max-sm:w-full max-sm:justify-between">
          <NavbarItem link={"/"} active={pathname === '/' ? 'active' : ''}><House /></NavbarItem>
          <NavbarItem link={"/blog"} active={pathname.split("/")[1] == 'blog' ? 'active' : ''}><NotebookPen /></NavbarItem>
          <NavbarItem link={"/tools"} active={pathname.split("/")[1] === 'tools' ? 'active' : ''}><Wrench /></NavbarItem>
        </div>
        <div className="hidden sm:flex sm:flex-col flex-none">
          <div className="p-5"><Link href="https://drive.google.com/file/d/12jfa58MFEqhVukJlXorwHZW_ExfGh2ks/view?usp=sharing" target="_blank"><FileDown/></Link></div>
          <div className="p-5"><Link href="https://github.com/chandrahaas02" target="_blank"><Github /></Link></div>
          <div className="p-5"><Link href="https://www.linkedin.com/in/chandrahaas-vakkalagadda-05b909188/" target="_blank"><Linkedin /></Link></div>
          <div className="p-5"><Link href="mailto:chandrahaas02@gmail.com" target="_blank"><Mail /></Link></div>
        </div>
      </div>
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Chandrahaas</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <meta name="google-site-verification" content="pPVFaBYMsDHl5EBXaTbJNmdH1ng0BRBQ9fiVyG2ELC0" />
      </head>
      <body className="relative flex flex-col-reverse sm:flex-row h-full min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1 w-full overflow-y-auto max-h-screen pb-20 sm:pb-0">
          {children}
        </div>
      </body>
      <GoogleAnalytics gaId="G-MWSNV0NHZE" />
    </html>
  );
}
