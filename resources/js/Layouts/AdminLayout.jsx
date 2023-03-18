import { usePage } from '@inertiajs/react'
import {AdminDrawer} from "@/Components/Layout/AdminDrawer";

export default function AdminLayout({children, breadcrumb, auth}) {
    const {sideBarItems} = usePage().props

    return (
        <div className="flex flex-col min-h-screen">
            <AdminDrawer auth={auth} breadcrumb={breadcrumb} items={sideBarItems}>
                {children}
            </AdminDrawer>
        </div>
    )
}
