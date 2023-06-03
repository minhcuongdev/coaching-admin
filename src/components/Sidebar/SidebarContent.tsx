import Logo from 'assets/img/logo.png'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { Icons } from '../../icons'
import routes from '../../routes/sidebar'
import SidebarSubmenu from './SidebarSubmenu'

function Icon({ icon, ...props }: { icon: string; [key: string]: any }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400 text-center">
      <Link to="/dashboard">
        <img src={Logo} alt="logo" className="ml-8 h-8" />
      </Link>

      <ul className="mt-6">
        {routes.map((route: any) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  `${
                    isActive ? 'text-gray-800 dark:text-gray-100' : ''
                  } inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200`
                }
              >
                <Routes>
                  <Route
                    path={route.path}
                    element={
                      <span
                        className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                        aria-hidden="true"
                      ></span>
                    }
                  ></Route>
                </Routes>
                <Icon
                  className="w-5 h-5"
                  aria-hidden="true"
                  icon={route.icon}
                />
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
    </div>
  )
}

export default SidebarContent
