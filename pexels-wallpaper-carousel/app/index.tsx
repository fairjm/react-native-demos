import PexelsWallpapers from "@/components/PexelsWallpapers";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

const queryClient = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <PexelsWallpapers />
    </QueryClientProvider>
  );
}
