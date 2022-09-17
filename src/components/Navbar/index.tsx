import React from 'react'
import ThemeToggler from '@/components/ThemeToggler'

const Navbar = () => {
  return (
    <nav className="px-8 lg:px-12 pb-6  fixed w-full z-10">
      <div className="flex items-center justify-between h-24">
        <div className="w-full justify-between flex items-center">
          <div className="flex-shrink-0">
            <div className="tracking-wider font-semibold text-xl cursor-pointer">
              URL Shortening Service
            </div>
          </div>
          <div className="ml-10 flex items-end space-x-8 text-sm">
            <ThemeToggler />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar