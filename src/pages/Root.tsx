import { Header, SideNav } from '@/components'
import { Outlet } from 'react-router-dom'

const Root = () => {
  return (
    <>
      <Header />
      <SideNav>
        <Outlet />
      </SideNav>
    </>
  )
}

export default Root
