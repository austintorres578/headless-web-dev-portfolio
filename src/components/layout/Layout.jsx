// Layout.jsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToHash from './ScrollToHash'

export default function Layout() {
  return (
    <>
      <ScrollToHash />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}