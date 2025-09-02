import React from 'react';
import { Menu as MenuIcon, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

const Topbar: React.FC<{ onMenuClick: () => void; }> = ({ onMenuClick }) => {
  const { admin, logout } = useAuth();
  
  return (
    <header className="h-16 bg-brand-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0">
      <button onClick={onMenuClick} className="p-2 -ml-2 rounded-full hover:bg-gray-100">
        <MenuIcon className="h-6 w-6 text-gray-600" />
      </button>
      
      <div className="flex items-center">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100">
            <img 
              src={admin?.avatar || `https://i.pravatar.cc/150?u=${admin?._id}`} 
              alt={admin?.name} 
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="hidden md:block font-medium text-sm">{admin?.name}</span>
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <Link to="/admin/profile" className={`${active ? 'bg-gray-100' : ''} group flex rounded-md items-center w-full px-2 py-2 text-sm`}>
                      <User className="mr-2 h-5 w-5" aria-hidden="true" />
                      Profile
                    </Link>
                  )}
                </Menu.Item>
              </div>
               <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={logout} className={`${active ? 'bg-red-50' : ''} group flex rounded-md items-center w-full px-2 py-2 text-sm text-red-600`}>
                      <LogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                      Logout
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
};

export default Topbar;
