import {
  Avatar,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from '@windmill/react-ui'
import { useAppDispatch, useAppSelector } from 'app/hook'
import DefaultAvatar from 'assets/img/unnamed.png'
import { SidebarContext } from 'context/SidebarContext'
import { selectAuth, signOut } from 'features/auth/authSlice'
import { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Icons } from '../../icons'

const { MoonIcon, SunIcon, MenuIcon, OutlinePersonIcon, OutlineLogoutIcon } =
  Icons

function Header(props: any) {
  // const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { mode, toggleMode } = useContext(WindmillContext)
  const { toggleSidebar } = useContext(SidebarContext)
  const dispatch = useAppDispatch()
  const { isSignedIn } = useAppSelector(selectAuth)

  if (!isSignedIn) {
    return <Navigate to={'/login'} replace />
  }

  // function handleNotificationsClick() {
  //   setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  // }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  function handleSignOut() {
    dispatch(signOut())
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            {/* <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Tìm kiếm"
              aria-label="Search"
              css=""
            /> */}
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === 'dark' ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}

          {/* <!-- Profile menu --> */}
          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={handleProfileClick}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={DefaultAvatar}
                alt="avatar"
                aria-hidden="true"
              />
            </button>
            <Dropdown
              align="right"
              isOpen={isProfileMenuOpen}
              onClose={() => setIsProfileMenuOpen(false)}
            >
              <Link to="/account">
                <DropdownItem>
                  <OutlinePersonIcon
                    className="w-4 h-4 mr-3"
                    aria-hidden="true"
                  />

                  <span>Tài khoản</span>
                </DropdownItem>
              </Link>
              {/* <DropdownItem>
                <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                <span>Cá</span>
              </DropdownItem> */}
              <DropdownItem onClick={handleSignOut}>
                <OutlineLogoutIcon
                  className="w-4 h-4 mr-3"
                  aria-hidden="true"
                />
                <span>Đăng xuất</span>
              </DropdownItem>
            </Dropdown>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
