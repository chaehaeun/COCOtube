import { Header, SideNav } from '@/components'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const Root = () => {
  const [isSideNav, setIsSideNav] = useState(false)

  return (
    <>
      <Header setIsSideNav={setIsSideNav} />
      <SideNav isSideNav={isSideNav} setIsSideNav={setIsSideNav}>
        <Outlet />
      </SideNav>
    </>
  )
}

export default Root
