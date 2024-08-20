"use client"
import "./globals.css";

import { Home, Blog, Tools, Games, Github, Linkdin, Mail, Phil } from "../components/Icon"
import { usePathname } from 'next/navigation'
import Link from 'next/link'


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
      <div className="flex-none flex flex-row sm:flex-col sm:min-h-screen border-r border-neutral-700 overflow-hidden">
        <div className="sm:flex-1 flex sm:flex-col max-sm:w-full max-sm:justify-between">
          <NavbarItem link={"/"} active={pathname === '/' ? 'active' : ''}><Home /></NavbarItem>
          <NavbarItem link={"/blog"} active={pathname.split("/")[1] == 'blog' ? 'active' : ''}><Blog /></NavbarItem>
          <NavbarItem link={"/tools"} active={pathname.split("/")[1] === 'tools' ? 'active' : ''}><Tools /></NavbarItem>
          <NavbarItem link={"/games"} active={pathname.split("/")[1] === 'games' ? 'active' : ''}><Games /></NavbarItem>
          <NavbarItem link={"/phil"} active={pathname.split("/")[1] === 'phil' ? 'active' : ''}><Phil /></NavbarItem>
        </div>
        <div className="hidden sm:flex sm:flex-col flex-none">
          <div className="p-5"><Link href="https://github.com/chandrahaas02"><Github /></Link></div>
          <div className="p-5"><Link href="https://www.linkedin.com/in/chandrahaas-vakkalagadda-05b909188/"><Linkdin /></Link></div>
          <div className="p-5"><Link href="mailto:chandrahaas02@gmail.com"><Mail /></Link></div>
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
      </head>
      <body className="relative flex flex-col sm:flex-row h-full min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1 w-full overflow-y-auto max-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
