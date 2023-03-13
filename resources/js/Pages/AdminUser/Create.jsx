import {Head, Link} from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Form from "@/Components/AdminUser/Form";

export default function Create({auth, roles, permissions, permissionType}) {
    function Breadcrumb() {
        return (
            <ul>
                <li>Administration</li>
                <li><Link href={route('admin.user.index')}>Utilisateurs</Link></li>
                <li><b>Création d'un utilisateur</b></li>
            </ul>
        )
    }
    return (
        <>
            <Head title="Edition" />
            <AdminLayout auth={auth} breadcrumb={<Breadcrumb/>}>
                <Form roles={roles} permissions={permissions} permissionType={permissionType}></Form>
            </AdminLayout>
        </>
    )
}
