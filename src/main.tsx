import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import App from "./App";
import Layout from "./layouts/dashboard";
import DashboardPage from "./pages";
import MapPage from "./pages/map";
import TicketPage from "./pages/ticket";

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "",
            Component: DashboardPage,
          },

          {
            path: "map",
            Component: MapPage,
          },
          {
            path: "ticket",
            Component: TicketPage,
          },
        ],
      },
    ],
  },
]);

const httpLink = new HttpLink({
  uri: "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "digitransit-subscription-key": import.meta.env
        .VITE_DIGITRANSIT_SUBSCRIPTION_KEY as string,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
