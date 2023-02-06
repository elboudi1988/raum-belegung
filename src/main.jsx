import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClientProvider, QueryClient } from 'react-query'

import App from './App'
import { AppProvider, AuthProvider, RoomProvider, CalendarProvider, RoomRecordsProvider, UsersProvider } from './contexts'

import './global/tailwind.scss'
import './i18n'
const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={ client }>
      <AppProvider>
        <AuthProvider>
          <UsersProvider>
            <CalendarProvider>  
              <RoomRecordsProvider>
                <RoomProvider>
                    <App />
                </RoomProvider>
              </RoomRecordsProvider>
            </CalendarProvider>
          </UsersProvider>
        </AuthProvider>    
      </AppProvider>
  </QueryClientProvider>
)
