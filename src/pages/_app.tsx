import { GeistSans } from "geist/font/sans"
import { type AppType } from "next/app"

import { AppContext } from '~/context/AppContext'
import { api } from "~/utils/api"

import "~/styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AppContext>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </AppContext>
  )
}

export default api.withTRPC(MyApp)
