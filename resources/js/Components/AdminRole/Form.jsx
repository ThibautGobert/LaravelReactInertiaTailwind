import {Link, useForm} from "@inertiajs/react";

export default function Form({role, permissions, permissionType}) {
    const { data, setData, post, processing, errors, progress } = useForm({
        id: role.id,
        name: role.name,
        permissions: role && role.permissions ? role.permissions.map(p=>p.id) : [],
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.role.update', role))
    }

    function handlePermissionCheckBox(e) {
        let id = e.target.value;
        if (e.target.checked) {
            setData("permissions", [...data.permissions, id]);
        } else {
            setData(
                "permissions",
                data.permissions.filter((item) => {
                    return parseInt(item) !== parseInt(id);
                })
            );
        }
    }

    const Permissions =  permissionType.map(pt=> {
        return (
            <div key={'permission_type_'+pt.value} className="form-control w-full mb-3">
                <h4 className="text-xl my-2">{pt.label}</h4>
                {
                    permissions.map(p=> {
                        if(pt.value === p.type) {
                            return (
                                <div className="mb-2 w-full flex justify-between" key={'permission_'+p.id}>
                                    <label className="form-label d-block">{p.name}</label>
                                    <label htmlFor={'permission_' + p.id} className="switch">
                                        <input type="checkbox"
                                               name="permissions[]"
                                               id={'permission_' + p.id}
                                               checked={data.permissions.find(dp=> dp === p.id)}
                                               onChange={e=> handlePermissionCheckBox(e)}
                                               value={p.id}/>
                                        <span className="slider round"></span>
                                    </label>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    })

    return (
        <form className="h-full" onSubmit={submit}>
            <div className="h-full flex flex-col justify-between">
                <div>
                    <div className="grid md:grid-cols-3 gap-4 border-b-2 pb-2">
                        <div className="form-control w-full mb-3">
                            <label className="label-text" htmlFor="name">Nom</label>
                            <input disabled id="name" type="text" className="input input-bordered w-full" value={role.name}/>
                        </div>
                    </div>
                    <h3 className="text-2xl mt-3">Permissions</h3>
                    <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-4 border-b-2 pb-2">
                        {Permissions}
                    </div>
                </div>
                <div className="flex justify-end border-t-2 pt-2">
                    <Link href={route('admin.role.index')} className="btn btn-secondary mr-2">
                        <i className="fa fa-times mr-2"></i>
                        Annuler
                    </Link>
                    <button
                        className="btn btn-success"
                        type="submit"
                        disabled={processing}>
                        {!processing && (<i className="fa fa-check mr-2"></i>)}
                        {processing && (<i className="fa-solid fa-circle-notch animate-spin mr-2"></i>)}
                        Enregistrer
                    </button>
                </div>
            </div>
        </form>
    )
}
