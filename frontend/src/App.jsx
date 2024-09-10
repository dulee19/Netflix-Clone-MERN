import { Routes, Route, Navigate } from 'react-router-dom'

// Auth
import LoginPage from './pages/auth/LoginPage'
import SignUp from './pages/auth/SignUp'
import { HomePage } from './pages/home'
import { Footer } from './components'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authUser'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import WatchPage from './pages/home/WatchPage'
import SearchPage from './pages/home/SearchPage'
import SearchHistoryPage from './pages/home/SearchHistoryPage'
import NotFoundPage from './pages/home/NotFoundPage'

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck])

  if(isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='mx-auto animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />
        <Route path="/watch/:id" element={user ? <WatchPage /> : <Navigate to="/login" />} />
        <Route path="/search" element={user ? <SearchPage /> : <Navigate to="/" />} />
        <Route path="/history" element={user ? <SearchHistoryPage /> : <Navigate to="/" />} />
        <Route path="/*" element={<NotFoundPage />} />
      
      </Routes>
      <Footer />

      <Toaster />
    </>
  )
}

export default App
