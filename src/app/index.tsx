import { RouterProvider } from "react-router-dom";
import { router } from "./routing";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};
