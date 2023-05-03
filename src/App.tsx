// Refine
import { Refine, WelcomePage } from '@refinedev/core'
import { RefineKbarProvider } from '@refinedev/kbar'
import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2
} from '@refinedev/antd'
import dataProvider from '@refinedev/simple-rest'
import { AntdInferencer } from '@refinedev/inferencer/antd'
import routerBindings, {
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6'

// React Router DOM
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

// Refine - Antd
import '@refinedev/antd/dist/reset.css'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          notificationProvider={notificationProvider}
          routerProvider={routerBindings}
          dataProvider={dataProvider('https://api.fake-rest.refine.dev')}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true
          }}
          resources={[
            {
              name: 'blog_posts',
              list: '/blog-posts',
              show: '/blog-posts/show/:id',
              create: '/blog-posts/create',
              edit: '/blog-posts/edit/:id'
            }
          ]}
        >
          <Routes>
            <Route index element={<WelcomePage />} />
            <Route
              element={
                <ThemedLayoutV2>
                  <Outlet />
                </ThemedLayoutV2>
              }
            >
              <Route path='blog-posts'>
                <Route index element={<AntdInferencer />} />
                <Route path='show/:id' element={<AntdInferencer />} />
                <Route path='edit/:id' element={<AntdInferencer />} />
                <Route path='create' element={<AntdInferencer />} />
              </Route>
              <Route path='*' element={<ErrorComponent />} />
            </Route>
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
