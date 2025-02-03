'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      //staleTime: 1000 * 60 * 5, // 5 minutes
      // Faz a query ser sempre buscada sem usar cache
      staleTime: 0, // Considera os dados obsoletos imediatamente
      refetchOnMount: 'always', // Sempre faz refetch ao montar
      refetchOnWindowFocus: true, // Refetch ao ganhar o foco (opcional)
      refetchOnReconnect: true, // Refetch ao reconectar a internet
    },
  },
});

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}