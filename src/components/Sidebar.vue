<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    id="docs-sidebar"
    class="
      hs-overlay
      hs-overlay-open:translate-x-0
      -translate-x-full
      transition-all
      duration-300
      transform
      hidden
      fixed
      top-0
      left-0
      bottom-0
      z-[60]
      w-80
      bg-white
      border-r border-gray-200
      pt-7
      pb-10
      overflow-y-auto
      scrollbar-y
      lg:block lg:translate-x-0 lg:right-auto lg:bottom-0
      dark:scrollbar-y
    "
  >
    <div class="px-6">
      <img src="@/assets/logo_white.png" class="h-8" />
      <div
        class="
          border border-black/50
          text-gray-800
          rounded
          mt-4
          py-2
          text-xs
          font-bold
          inline-block
          px-4
        "
      >
        ADMINISTRATOR
      </div>
    </div>

    <div class="mt-5 flex flex-grow flex-col">
      <nav class="flex-1 space-y-1 bg-white px-2" aria-label="Sidebar">
        <template v-for="item in navigation" :key="item.name">
          <div v-if="!item.children">
            <a
              v-if="!item.href"
              href="#"
              :class="[
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </a>
            <router-link
              v-else
              :class="[
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group w-full flex items-center pl-2 py-2 text-sm font-medium rounded-md',
              ]"
              :to="{ name: item.href }"
            >
              <component
                :is="item.icon"
                :class="[
                  item.current
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'mr-3 flex-shrink-0 h-6 w-6',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </div>
          <Disclosure v-else v-slot="{ open }" as="div" class="space-y-1">
            <DisclosureButton
              :class="[
                item.current
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                'group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500',
              ]"
            >
              <component
                :is="item.icon"
                class="
                  mr-3
                  h-6
                  w-6
                  flex-shrink-0
                  text-gray-400
                  group-hover:text-gray-500
                "
                aria-hidden="true"
              />
              <span class="flex-1">{{ item.name }}</span>
              <svg
                :class="[
                  open ? 'text-gray-400 rotate-90' : 'text-gray-300',
                  'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400',
                ]"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
              </svg>
            </DisclosureButton>
            <DisclosurePanel class="space-y-1">
              <router-link
                v-for="subItem in item.children"
                :key="subItem.name"
                class="
                  group
                  flex
                  w-full
                  items-center
                  rounded-md
                  py-2
                  pl-6
                  pr-2
                  text-sm
                  font-medium
                  text-gray-600
                  hover:bg-gray-50 hover:text-gray-900
                "
                :to="{ name: subItem.href }"
              >
                {{ subItem.name }}
              </router-link>
            </DisclosurePanel>
          </Disclosure>
        </template>
      </nav>
      <div
        class="
          flex
          absolute
          bottom-0
          px-6
          py-4
          text-black
          border-t
          bg-blue-50
          items-center
          w-full
        "
      >
        <router-link class="flex items-center" :to="{ name: 'Logout' }"
          >Logout
          <span
            class="iconify ml-2 w-5 h-5"
            data-icon="heroicons-outline:logout"
          ></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import {
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  IdentificationIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
  InboxIcon,
  PlayCircleIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

const navigation = [
  { name: "Dashboard", icon: HomeIcon, current: true, href: "dashboard" },
  {
    name: "Users",
    icon: UsersIcon,
    current: false,
    href: "users",
  },
  {
    name: "Organizations",
    icon: BuildingOffice2Icon,
    current: false,
    children: [
      { name: "All Organizations", href: "organizations" },
      { name: "New Organization", href: "new_organization" },
    ],
  },
  {
    name: "Programmes",
    icon: FolderIcon,
    current: false,
    children: [
      { name: "All Programmes", href: "programmes" },
      { name: "New Programme", href: "new_programme" },
    ],
  },
  {
    name: "Projects",
    icon: WrenchScrewdriverIcon,
    current: false,
    href: "projects",
  },
  {
    name: "Contacts",
    icon: IdentificationIcon,
    current: false,
    href: "contacts_page",
  },
  {
    name: "Documents",
    icon: InboxIcon,
    current: false,
  },
  {
    name: "Media",
    icon: PlayCircleIcon,
    current: false,
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    current: false,
  },
  {
    name: "Reports",
    icon: ChartBarIcon,
    current: false,
  },
];
</script>
<style scoped>
a {
  background: none;
  border: none;
}
button {
  border: none;
  border-bottom: 1px solid #f3f3f3;
  border-radius: 0;
  background: none !important;
}
a.router-link-active {
  background: rgb(211, 234, 255);
}
</style>
