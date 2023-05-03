// Refine
import { Authenticated, Refine, WelcomePage } from '@refinedev/core'
import { RefineKbarProvider } from '@refinedev/kbar'
import {
  ErrorComponent,
  notificationProvider,
  ThemedLayoutV2
} from '@refinedev/antd'
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier
} from '@refinedev/react-router-v6'

// The statement commented below is REST data provider that generated when first time init the project
// import dataProvider from '@refinedev/simple-rest'

// The statement commented below is REST data custom provider generated by swizzle
import { dataProvider } from './rest-data-provider'

// The statement commented below is REST data custom provider using Axios as third party api caller
// import { dataProvider } from './data-provider'

// React Router DOM
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'

// Pages
import BlogPostList from './pages/blog-posts/List'
import BlogPostEdit from './pages/blog-posts/Edit'
import BlogPostShow from './pages/blog-posts/Show'
import BlogPostCreate from './pages/blog-posts/Create'
import { AuthPage } from './components/pages/auth'

// Auth Provider
import authProvider from './auth-provider'

// Refine - Antd
import '@refinedev/antd/dist/reset.css'

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          authProvider={authProvider}
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
              edit: '/blog-posts/edit/:id',
              meta: {
                canDelete: true
              }
            }
          ]}
        >
          <Routes>
            <Route index element={<WelcomePage />} />

            {/* Authenticated Routes */}
            <Route
              element={
                <Authenticated fallback={<CatchAllNavigate to='/login' />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path='blog-posts'>
                <Route index element={<BlogPostList />} />
                <Route path='show/:id' element={<BlogPostShow />} />
                <Route path='edit/:id' element={<BlogPostEdit />} />
                <Route path='create' element={<BlogPostCreate />} />
              </Route>
            </Route>
            {/* End Authenticated Routes */}

            {/* Auth Routes */}
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path='/login' element={<AuthPage />} />
            </Route>
            {/* End Auth Routes */}

            {/* All Routes */}
            <Route
              element={
                <Authenticated fallback={<Outlet />}>
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route path='*' element={<ErrorComponent />} />
            </Route>
            {/* End All Routes */}
          </Routes>
          <UnsavedChangesNotifier />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  )
}

export default App
