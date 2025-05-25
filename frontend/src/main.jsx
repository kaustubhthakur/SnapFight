import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import App from "./App.jsx";

export const queryClient = new QueryClient();


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);
