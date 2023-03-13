import AdminLayout from "@/Layouts/AdminLayout";
import {Head, Link} from "@inertiajs/react";
import Table from "@/Components/AdminRole/Table";

export default function Index({auth, roles}) {
    function Breadcrumb() {
        return (
            <ul>
                <li>Administration</li>
                <li><b>Roles</b></li>
            </ul>
        )
    }
    return (
        <>
            <Head title="Roles" />
            <AdminLayout auth={auth} breadcrumb={<Breadcrumb/>}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg">Roles</h3>
                </div>
                <Table auth={auth} roles={roles}></Table>
            </AdminLayout>
        </>
    )
}
