import { Fragment, useContext, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineSearch } from 'react-icons/ai';
import { UserContext } from '../UserContx/UserContext';

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Campaigns', href: '/campaigns', current: false },
  { name: 'Log-in', href: '/login', current: false },
  { name: 'Sign-up', href: '/signup', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header() {

  const {setuserInfo,userInfo} = useContext(UserContext);
  const navigate = useNavigate();
  //*loading user
  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          withCredentials: true,
        };
        console.log("before loading user");
        const response = await axios.get("http://localhost:4000/user/details",config);
        
        // if(response.data.message==="foundUser"){
        //   console.log("In if condition");
        //   setuserInfo(response.data.message);
        // }
        setuserInfo(response.data.message);
        //setuserMessage(response.data.message); 
        //console.log("this is sent",userMessage);
        console.log("value of usercontext",response.data.message);
      } catch (error) {
        console.error("Error fetching user details:", error);
        // Handle the error, e.g., show an error message to the user
      }
    };

    fetchData(); // Call the fetchData function when the component mounts
  }, [userInfo]);

  // useEffect(() => {
  //   console.log("this is sent",userMessage);
  // }, [userMessage]);
  //* logout
  const logoutHandler = async ()=> {
    const config = {
      withCredentials: true,
    };
    try {
      const response = await axios.get("http://localhost:4000/registration/logout",config);
      console.log(response.data.message);
      setuserInfo(null);
      alert(response.data.message);
      //window.location.reload();
  }
  catch(error){
    console.log("error",error.response.data.message); 
    alert(error.response.data.message);
  }
  }
    



  const searchHandler = ()=>{
    navigate("/search");
    console.log("clicked");
  }




  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://cdn.icon-icons.com/icons2/2351/PNG/512/logo_github_icon_143196.png"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      (item.name === 'Log-in' || item.name === 'Sign-up') && (userInfo === 'foundUser' || userInfo==="logged in successfully") ? (
                        null // Don't render the link if condition is true
                      ) : (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>)
                    ))}
                  </div>
                  
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-900 hover:text-gray-400 focus:outline-none "
                  onClick={searchHandler}>
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <div className="flex items-center bg-gray-200 rounded-md px-2 py-2"


                  >
                  <AiOutlineSearch className="mr-5" size={30} />
                  <div className="mr-4">Search</div>
                  </div>
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://icons.iconarchive.com/icons/dtafalonso/android-l/512/Settings-L-icon.png"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/user/profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/favourites"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Favourites
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={logoutHandler}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}



