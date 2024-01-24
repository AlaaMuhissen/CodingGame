import React from 'react';
import { BiCloset, BiHomeAlt } from 'react-icons/bi';
import { FiPlusCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
// import CreateDropdown from './CreateDropdown';

export default function NavBar() {
  return (
    <footer className="fixed bottom-0 w-full bg-[#FF4CB7] rounded-t-lg mt-10 p-4 md:p-8">
    <nav className="flex justify-between items-center">
      <ul className="flex justify-between items-center w-full">
        <li className="flex-none">
          <Link to="/dashboard">
            <BiHomeAlt color="#fff" size="2rem" />
          </Link>
        </li>
        <li className="flex-none md:flex">
          {/* <CreateDropdown
            title={<FiPlusCircle color="#fff" size="2rem" />}
            item1="add clothe"
            item2="add outfit"
          /> */}
        </li>
        <li className="flex-none">
          <Link to="/outfits">
            <BiCloset color="#fff" size="2rem" />
          </Link>
        </li>
      </ul>
    </nav>
  </footer>
  
  );
}
