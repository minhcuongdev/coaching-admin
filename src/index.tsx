import { store } from './app/store'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { Windmill } from '@windmill/react-ui'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import ThemedSuspense from 'components/ThemedSuspense'
import { Suspense } from 'react'
import { SidebarProvider } from 'context/SidebarContext'
import 'tw-elements'

const rootElement = document.querySelector('#root')
if (!rootElement) {
  throw new Error('Root element not found')
}
const root = ReactDOM.createRoot(rootElement)

root.render(
  <Provider store={store}>
    <SidebarProvider>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <App />
          <ToastContainer />
        </Windmill>
      </Suspense>
    </SidebarProvider>
  </Provider>
)
