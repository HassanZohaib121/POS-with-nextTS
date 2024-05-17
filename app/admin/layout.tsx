import React, { ReactNode } from 'react'
import SideBar from './SideBar'
interface Props {
  children: ReactNode
}
const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-row justify-between">
      <aside className="mr-10">
        <SideBar />
      </aside>
      <main className="flex justify-center">{children}</main>
      <div className="flex justify-center"></div>
    </div>
  )
}

export default AdminLayout
