//we have to wra the whole app with this provider in layout.js to access the session info inside the client components
'use client'

import { SessionProvider } from 'next-auth/react'

const Session_Provider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default Session_Provider