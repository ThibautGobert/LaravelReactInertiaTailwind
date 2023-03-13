import { usePage } from '@inertiajs/react'
import AdminSidebar from "@/Components/Layout/AdminSidebar";
import AdminMenu from "@/Components/Layout/AdminMenu";
import AdminFooter from "@/Components/Layout/AdminFooter";
export default function AdminLayout({children, breadcrumb, auth}) {
    const {sideBarItems} = usePage().props

    return (
        <div className="flex flex-col min-h-screen">
            <AdminMenu auth={auth}></AdminMenu>
            <div className="flex flex-grow">
                <AdminSidebar items={sideBarItems}></AdminSidebar>
                <main className="flex flex-col pb-3 w-[calc(100vw-250px)]">
                    <div className="mb-2 border-b-2">
                        <div className="ml-2 text-sm breadcrumbs ">
                            {breadcrumb}
                        </div>
                    </div>
                    <div className="mx-2">
                        {children}
                    </div>
                </main>
            </div>
            <AdminFooter></AdminFooter>
        </div>
    )
}
