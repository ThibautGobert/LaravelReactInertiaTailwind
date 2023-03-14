import AdminLayout from "@/Layouts/AdminLayout";
import {Head, Link} from "@inertiajs/react";
import Table from "@/Components/AdminUser/Table"

export default function Index({users, auth}) {
    function Breadcrumb() {
        return (
            <ul>
                <li>Administration</li>
                <li><b>Utilisateurs</b></li>
            </ul>
        )
    }
    return (
        <>
            <Head title="Utilisateurs" />
            <AdminLayout auth={auth} breadcrumb={<Breadcrumb/>}>
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg">Utilisateurs</h3>
                    <Link href={route('admin.user.create')} className="btn btn-primary btn-outline">
                        <i className="fa fa-plus"></i>
                    </Link>
                </div>
                <Table auth={auth} users={users}></Table>
            </AdminLayout>
        </>
    )
}
