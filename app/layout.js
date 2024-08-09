"use client"
import "./globals.css";

import { Home, Blog, Tools, Games, Github, Linkdin, Mail } from "../components/Icon"
import { usePathname } from 'next/navigation'
import Link from 'next/link'


function NavbarItem({children,link,active}){
  return (
    <div className="p-5 relative flex items-center">
      {active && (<div className="absolute left-0 w-1 h-5 bg-white"/>)}
      <Link href={link}>{children}</Link>
    </div>
  )
}


function Navbar() {
  const pathname = usePathname()
  return (
    <>
      <div className="hidden flex-none sm:flex flex-col sm:min-h-screen bg-neutral-900 border-r border-neutral-700 overflow-hidden">
        <div className="flex-1">
          <NavbarItem link={"/"} active={pathname === '/' ? 'active' : ''}><Home/></NavbarItem>
          <NavbarItem link={"/blog"} active={pathname == '/blog/.*' ? 'active' : ''}><Blog /></NavbarItem>
          <NavbarItem link={"/tools"}active={pathname === '/tools' ? 'active' : ''}><Tools /></NavbarItem>
          <NavbarItem link={"/games"}active={pathname === '/games' ? 'active' : ''}><Games /></NavbarItem>

        </div>
        <div className="flex-none">
          <div className="p-5"><Link href="https://github.com/chandrahaas02"><Github/></Link></div>
          <div className="p-5"><Link href="https://www.linkedin.com/in/chandrahaas-vakkalagadda-05b909188/"><Linkdin/></Link></div>
          <div className="p-5"><Link href="mailto:chandrahaas02@gmail.com"><Mail/></Link></div>
        </div>
      </div>
    </>
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative flex h-full min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1 w-full">
          {children}
        </div>
      </body>
    </html>
  );
}
