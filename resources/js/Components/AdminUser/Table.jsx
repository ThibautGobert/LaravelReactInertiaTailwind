import {Link} from "@inertiajs/react";
import DeleteModal from "@/Components/AdminUser/DeleteModal";

export default function Index({users}) {
    function displayDate(date) {
        return new Date(date).toLocaleDateString()
    }
    const Rows = users.map((user, i)=> {
        return (
            <tr key={i}>
                <td>{user.id}</td>
                <td>
                    {!user.avatar && (<div tabIndex={0} className="avatar w-20 text-white online placeholder cursor-pointer">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                            <span className="text-xl">{Array.from(user.name)[0]}</span>
                        </div>
                    </div>)}
                    {user.avatar && (<div tabIndex={0} className="avatar w-20 text-white online cursor-pointer">
                        <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                            <img src={'/storage/'+user.avatar} />
                        </div>
                    </div>)}
                </td>
                <td>{user.pseudo}</td>
                <td>{user.name}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>{displayDate(user.birthday)}</td>
                <td>
                    <Link href={route('admin.user.edit', user.id)} className="btn btn-outline  btn-primary mr-2">
                        <i className="fa fa-edit mr-2"></i>Edit
                    </Link>
                    <label htmlFor={'delete-user-modal-'+user.id} className="btn btn-error btn-outline">
                        <i className="fa fa-times mr-2"></i>Supprimer
                    </label>
                    <DeleteModal user={user}></DeleteModal>
                </td>
            </tr>
        )
    })
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Avatar</th>
                    <th>Pseudo</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Date de naissance</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                    {Rows}
                </tbody>
            </table>
        </div>
    )
}
