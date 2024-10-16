import { GeistSans } from "geist/font/sans";
import { type AppType } from "next/app";

import { UserContextProvider } from '~/context/UserContext';
import { api } from "~/utils/api";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <UserContextProvider>
      <div className={GeistSans.className}>
        <Component {...pageProps} />
      </div>
    </UserContextProvider>
  );
};

export default api.withTRPC(MyApp);
