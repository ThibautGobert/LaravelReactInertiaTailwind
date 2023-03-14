import {Link} from "@inertiajs/react";
import {$can} from "@/Utils/permission";
import {__} from "@/Utils/translations";

export default function Index({auth, roles}) {
    function displayDate(date) {
        return new Date(date).toLocaleDateString()
    }
    const Rows = roles.map((role, i)=> {
        return (
            <tr key={i}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                    {$can('role edit', auth) && <Link href={route('admin.role.edit', role.id)} className="btn btn-outline  btn-primary mr-2">
                        <i className="fa fa-edit mr-2"></i>Edit
                    </Link>}
                </td>
            </tr>
        )
    })
    return (
        <div className="overflow-x-auto ">
            <table className="table table-zebra w-full">
                <thead>
                <tr>
                    <th>{__('global.id')}</th>
                    <th>{__('global.name')}</th>
                    <th>{__('global.actions')}</th>
                </tr>
                </thead>
                <tbody>
                    {Rows}
                </tbody>
            </table>
        </div>
    )
}
