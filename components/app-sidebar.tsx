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

    </Sidebar>
  )
}
