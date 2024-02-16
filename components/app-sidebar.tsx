import React from 'react'
import { Sidebar } from "flowbite-react";
import { twMerge } from 'tailwind-merge';
import { useSidebarContext } from '@/context/SidebarContext';

export default function AppSidebar() {
  const { isCollapsed } = useSidebarContext()
  return (
    <Sidebar
      id="sidebar"
      collapsed={isCollapsed}
      className={twMerge(
        "fixed inset-y-0 left-0 z-20 mt-16 flex h-full shrink-0 flex-col border-r border-gray-200 duration-75 dark:border-gray-700 lg:flex",
        isCollapsed && "hidden w-16",
      )}
    >

      <Sidebar.Items>
        <Sidebar.ItemGroup>

          <Sidebar.Item>
            Graph QL
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>

      <Sidebar.CTA className={twMerge(
        "mt-10 flex flex-col gap-y-2 divide-y divide-gray-300 dark:divide-white/25",
        isCollapsed && "hidden"
      )}>
        <p className="text-xs">
          Created with ❤️ by <span className="font-bold">Kelvin Mwangi</span>
        </p>
        <div className="flex flex-col gap-y-1">
          <h4 className="text-sm font-semibold">Stack</h4>
          <p>
            React JS, NextJS, TypeScript, Tailwind CSS and GraphQL.
          </p>
        </div>
        <p className="text-sm">Hosted on Vercel</p>
      </Sidebar.CTA>

    </Sidebar>
  )
}
