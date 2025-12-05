import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


import { I18nextProvider } from 'react-i18next'
import { ErrorBoundary } from '@/handler/ErrorBoundary'
import i18n from '@/i18n'
import { ENV } from '@/utils/env'
import App1 from '@/example/apps/App1'

// import { Toaster } from 'sonner'
// import { LoadingFallback } from '@/components/common/LoadingFallBack'


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: getConstant(ConstantCategory.FEATURE, 'QUERY_STALE_TIME', 5 * 60 * 1000),
      // retry: getConstant(ConstantCategory.FEATURE, 'DEFAULT_QUERY_RETRY', 1),
      refetchOnWindowFocus: false
    }
  }
})



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          {/* <Suspense fallback={<LoadingFallback />}> */}
            <App1 />
            {/* <Toaster /> */}
          {/* </Suspense> */}

        </I18nextProvider>
        {ENV.isDevelopment && <ReactQueryDevtools />}
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)
