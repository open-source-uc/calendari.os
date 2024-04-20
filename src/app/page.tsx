'use client'

import React from 'react'
import Calendar from './components/Calendar'

export default function Home() {
  const handleMenu = () => {
    const sidebar = document.querySelector('#sidebar')
    sidebar?.classList.toggle('show')
  }

  return (
    <main className="min-h-[100vh] flex flex-col items-center justify-center lg:flex-row">
      <div
        id="sidebar"
        className="sidebar fixed z-10 bg-white flex flex-col gap-4 min-h-[100vh] min-w-[75%] lg:relative lg:min-w-64 lg:left-0 lg:gap-0"
      >
        <div onClick={handleMenu} className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-600 hover:text-[#0176DE]"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M5 12l14 0" />
            <path d="M5 12l6 6" />
            <path d="M5 12l6 -6" />
          </svg>
        </div>
        <div className='flex justify-center items-center p-6 lg:h-[67px] lg:border-b'>
          <h1 className="text-xl text-center">📆 Calendari.os</h1>
        </div>
        <div className='p-6 border-b'>
          <p>Minimap view</p>
        </div>
        <div className='p-6'>
          <p>Filtros</p>
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center gap-4 px-2 py-2 border-b border-zinc-300 lg:hidden">
        <div className="absolute left-4" onClick={handleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-600"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 6l16 0" />
            <path d="M4 12l16 0" />
            <path d="M4 18l16 0" />
          </svg>
        </div>
        <p className="text-[40px]">📆</p>
        <div>
          <h1 className="text-xl text-left text-zinc-950">Calendari.os</h1>
          <p className="text-sm text-left text-zinc-500">By OSUC</p>
        </div>
      </div>
      <section className="w-full h-full">
        <Calendar />
      </section>
    </main>
  )
}
