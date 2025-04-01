import React from 'react'


const Navbar = () => {
  return (
    <nav className='bg-violet-400 flex justify-between p-3'>
        <div className='font-bold'>iTodo</div>
        <ul className='flex gap-9 font-bold'>
            <li>Home</li>
            <li>Contact</li>
        </ul>
    </nav>
  )
}

export default Navbar
