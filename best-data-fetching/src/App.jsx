import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FetchExample from "./Components/FetchExample";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <FetchExample />
    </QueryClientProvider>
  );
}

export default App;
