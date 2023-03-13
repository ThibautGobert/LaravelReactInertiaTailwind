import AdminLayout from "@/Layouts/AdminLayout";
import {Head, Link} from "@inertiajs/react";
import Form from "@/Components/AdminUser/Form";

export default function Edit({auth, user, roles, permissions, permissionType}) {
    function Breadcrumb() {
        return (
            <ul>
                <li>Administration</li>
                <li><Link href={route('admin.user.index')}>Utilisateurs</Link></li>
                <li><b>Edition de {user.pseudo}</b></li>
            </ul>
        )
    }
    return (
        <>
            <Head title="Edition" />
            <AdminLayout auth={auth} breadcrumb={<Breadcrumb/>}>
                <Form user={user} roles={roles} permissions={permissions} permissionType={permissionType}></Form>
            </AdminLayout>
        </>
    )
}
