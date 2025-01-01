"use client"
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import clsx from "clsx";
import { AlertCircle, AlertOctagon, AlertTriangle, Briefcase, ChevronDown, ChevronUp, Home, Layers3, LockIcon, LucideIcon, Search, Settings, ShieldAlert, TvIcon, User, Users, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navbarLinks = [
  {
    href: '/',
    icon: Home,
    label: 'Home'
  },
  {
    href: '/timeline',
    icon: Briefcase,
    label: 'Timeline'
  },
  {
    href: '/search',
    icon: Search,
    label: 'Search'
  },
  {
    href: '/setting',
    icon: Settings,
    label: 'Settings'
  },
  {
    href: '/users',
    icon: User,
    label: 'Users'
  },
  {
    href: '/teams',
    icon: Users,
    label: 'Teams'
  },

];

const priorityLinks = [
  {
    icon: AlertCircle,
    label: 'Urgent',
    href: '/priority/urgent'
  },
  {
    icon: ShieldAlert,
    label: 'High',
    href: '/priority/high'
  },
  {
    icon: AlertTriangle,
    label: 'Medium',
    href: '/priority/medium'
  },
  {
    icon: AlertOctagon,
    label: 'Low',
    href: '/priority/low'
  },
  {
    icon: Layers3,
    label: 'Backlog',
    href: '/priority/backlog'
  },
]

const Sidebar = () => {
  const { data: projects } = useGetProjectsQuery()
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state: any) => state.global.isSidebarCollapsed);

  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);



  return (
    <div className={clsx(`fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 z-40 bg-white dark:bg-black overflow-y-auto`, isSidebarCollapsed ? 'w-0 hidden' : 'w-64 md:w-64')}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* //? logo n closing btn */}
        <div className="flex items-center justify-between z-50 min-h-[56px] w-64 bg-white p-3 dark:bg-black">
          {/* logo  */}
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Workflow<span className="text-2xl font-extrabold text-gray-600 dark:text-gray-500">X</span>
          </h1>
          {/* closing btn */}
          <button
            className="py-3"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <X className="w-6 h-6 text-gray-800 hover:text-gray-500 dark:text-white" />
          </button>
        </div>

        {/* //? Team part */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 dark:border-gray-700 py-4 px-8">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          <div>
            <h3 className="text-lg font-bold tracking-wide dark:text-gray-200">Team Leon</h3>
            <div className="mt-1 flex items-center gap-1">
              <LockIcon className="h-3 w-3 text-gray-500 dark:text-gray-300" />
              <p className="text-xs text-gray-500 dark:text-gray-300">private</p>
            </div>
          </div>
        </div>

        {/* //? Navbar links  */}
        <nav className="z-10 w-full">
          {
            navbarLinks.map((link, index) => (
              <SidebarLink key={index} {...link} />
            ))
          }
          {/* show Project btn  */}
          <button
            onClick={() => setShowProjects(!showProjects)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-900 dark:text-white">
            <span className={clsx('', showProjects && 'text-gray-500 dark:text-gray-300')}>Projects</span>
            {showProjects ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </button>
          {/* project list if btn is clicked  */}
          {showProjects ? (
            <>
              {
                projects && projects.map((project, index) => (
                  <SidebarLink key={project.id} icon={Briefcase} label={project.name} href={`/projects/${project.id}`} />
                ))
              }
            </>
          ) : null}

          {/* show Priority btn  */}
          <button
            onClick={() => setShowPriority(!showPriority)}
            className="flex w-full items-center justify-between px-8 py-3 text-gray-900 dark:text-white">
            <span className={clsx('', showPriority && 'text-gray-500 dark:text-gray-300')}>Priorities</span>
            {showPriority ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
          </button>
          {/* Priority list if btn is clicked  */}
          {showPriority ? (
            <>
              {
                priorityLinks.map((link, index) => (
                  <SidebarLink key={index} {...link} />
                ))
              }
            </>
          ) : null}
        </nav>
      </div>
    </div>
  )
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label
}: SidebarLinkProps) => {
  const pathName = usePathname();
  const isActive = pathName === href || (pathName === '/' && href === '/dashboard');

  return (
    <Link href={href} className="w-full">
      <div className={clsx(`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 justify-start px-8 py-3`, isActive ? 'bg-gray-100 dark:bg-gray-600' : '')}>
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        <span className="font-medium text-gray-800 dark:text-gray-100">{label}</span>
      </div>
    </Link>
  )
}

export default Sidebar;