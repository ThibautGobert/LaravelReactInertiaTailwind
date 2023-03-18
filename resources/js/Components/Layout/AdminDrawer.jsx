import {Link} from "@inertiajs/react";
import {AdminNavBar} from "@/Components/Layout/AdminNavBar";
import AdminFooter from "@/Components/Layout/AdminFooter";

export const AdminDrawer = ({auth, items, breadcrumb, children})=> {
    const Icon = (props)=> {
        return <i className={props.name}></i>
    }

    const MappedItems = items.map((item, i) => {
        return (
            <li key={i} className={item.active ? 'active' : null}>
                <Link href={item.href}>
                    <div className="flex justify-between w-full">
                        <Icon name={item.icon}/>
                        <div className="w-1/2">
                            {item.label}
                        </div>
                    </div>
                </Link>
            </li>
        )
    })

    return (
        <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col scrollbar-thin overflow-y-hidden">
                <AdminNavBar auth={auth}></AdminNavBar>
                <div className="flex flex-col flex-grow w-full justify-between">
                    <main className="flex flex-col pb-3 w-full px-3">
                        <div className="mb-2 border-b-2">
                            <div className="text-sm breadcrumbs">
                                {breadcrumb}
                            </div>
                        </div>
                        <div className="">
                            {children}
                        </div>
                    </main>
                    <footer>
                        <AdminFooter></AdminFooter>
                    </footer>
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {MappedItems}
                </ul>
            </div>
        </div>
    )
}
