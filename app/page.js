/* eslint-disable react/no-unescaped-entities */
"use client"
import Image from "next/image";
import { TickMark } from "@/components/Icon";
import Link from 'next/link'
import {Github, Linkdin, Mail} from "../components/Icon"
import { SiReact, SiPrometheus,SiAmazonwebservices,SiKubernetes, SiGrafana, SiNodedotjs, SiPostgresql, SiGooglecloud, SiTensorflow, SiPytorch, SiPython} from '@icons-pack/react-simple-icons';

const ExpCard = ({ props }) => {
  const { name, company, description } = props
  return (
    <div className="card bg-primary shadow-3xl rounded-2xl max-w-2xl">
      <div className="card-body">
        <h2 className="card-title text-2xl">{name}</h2>
        <p className="text-left">{company}</p>
        <p className="text-left">{description}</p>
      </div>
    </div>
  )
}


export default function Home() {
  return (
    <div className="flex flex-1 flex-col overflow-x-hidden">
      <div className="hero  min-h-screen max-w-full">
        <div className="hero-content flex-col lg:flex-row">
          <Image src={"/haas.png"} unoptimized width={500} height={500} alt="me" />
          <div>
            <h1 className="text-4xl font-bold">Hello, I'm Chandrahaas <span className="wave">👋</span> </h1>
            <h1 className="animate-typing overflow-hidden text-3xl  sm:text-6xl font-bold whitespace-nowrap text-green-500 pt-5 pb-5">Full Stack Engineer</h1>
            <div className="flex flex-row gap-10 text-2xl">
              Amateur philosopher. My life choices are a mystery even to me
            </div>
            <div className="flex w-full sm:hidden">
          <div className="pt-5 pr-5"><Link href="https://github.com/chandrahaas02" target="_blank"><Github /></Link></div>
          <div className="p-5"><Link href="https://www.linkedin.com/in/chandrahaas-vakkalagadda-05b909188/" target="_blank"><Linkdin /></Link></div>
          <div className="p-5"><Link href="mailto:chandrahaas02@gmail.com" target="_blank"><Mail /></Link></div>
        </div>
          </div>
        </div>
      </div>
      <div className="flex pb-5 flex-col justify-center items-center">
        <div className="text-3xl m-5">
          Skills
        </div>
        <div className="w-screen sm:w-3/4 flex overflow-x-hidden py-7">
        <ul className="flex animate-infinite-scroll gap-10">
          <li><SiReact color="default" size={100}/></li>
          <li><SiPrometheus color="default" size={100}/></li>
          <li><SiAmazonwebservices color="default" size={100}/></li>
          <li><SiGrafana color="default" size={100}/></li>
          <li><SiPostgresql color="default" size={100}/></li>
          <li><SiNodedotjs color="default" size={100}/></li>
          <li><SiKubernetes color="default" size={100}/></li>
          <li><SiGooglecloud color="default" size={100}/></li>
          <li><SiTensorflow color="default" size={100}/></li>
          <li><SiPytorch color="default" size={100}/></li>
          <li><SiPython color="default" size={100}/></li>
          <li><SiReact color="default" size={100}/></li>
          <li><SiPrometheus color="default" size={100}/></li>
          <li><SiAmazonwebservices color="default" size={100}/></li>
          <li><SiGrafana color="default" size={100}/></li>
          <li><SiPostgresql color="default" size={100}/></li>
          <li><SiNodedotjs color="default" size={100}/></li>
          <li><SiKubernetes color="default" size={100}/></li>
          <li><SiGooglecloud color="default" size={100}/></li>
          <li><SiTensorflow color="default" size={100}/></li>
          <li><SiPytorch color="default" size={100}/></li>
          <li><SiPython color="default" size={100}/></li>
        </ul>
        </div>
      </div>
      <div id="exp" className="flex flex-col justify-center items-center  min-h-screen">
        <h2 className="text-3xl self-center p-6">Work Experience</h2>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li>
            <TickMark />
            <div className="timeline-start mb-10 md:text-end" data-aos="fade-right">
              <ExpCard props={{ name: "Devops Engineer", company: "StoryXpress", description: "Optimized infrastructure and deployment through Kubernetes migration, GitOps Stratergy, and continuous monitoring. Led development of AI tools for image recognition, text transcription, and product content generation." }} />
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <TickMark />
            <div className="timeline-end mb-10" data-aos="fade-left">
              <ExpCard props={{ name: "Data Science Intern", company: "I'm beside You", description: "Designed a Recomendation System using collabrative filters and explored several DL based approaches" }} />
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <TickMark />
            <div className="timeline-start mb-10 md:text-end" data-aos="fade-right">
              <ExpCard props={{ name: "Service Provider", company: "Willings", description: "Created a one-stop destination for Japanese wall art by crawling across brochures of major wallpaper companies. Designed user and admin portals and implemented a database to store and manage data." }} />
            </div>
            <hr />
          </li>
        </ul>
      </div>
    </div>
  );
}
