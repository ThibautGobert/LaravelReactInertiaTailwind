import AdminLayout from "@/Layouts/AdminLayout";
import {Head, Link} from "@inertiajs/react";
import Form from "@/Components/AdminRole/Form";

export default function Edit({auth, role, permissions, permissionType}) {
    function Breadcrumb() {
        return (
            <ul>
                <li>Administration</li>
                <li><Link href={route('admin.role.index')}>Roles</Link></li>
                <li><b>Edition du role {role.name}</b></li>
            </ul>
        )
    }
    return (
        <>
            <Head title={'Edition du role '+role.name} />
            <AdminLayout auth={auth} breadcrumb={<Breadcrumb/>}>
                <Form role={role} permissions={permissions} permissionType={permissionType}></Form>
            </AdminLayout>
        </>
    )
}
