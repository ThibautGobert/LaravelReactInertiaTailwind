import {Link, useForm} from "@inertiajs/react";
import ImageCropper from "@/Components/Shared/ImageCropper";
import {useState} from "react";
import axios from "axios";
export default function Form({user, roles, permissions, permissionType}) {
    const { data, setData, post, processing, errors, progress } = useForm({
        id: user ? user.id : '',
        pseudo: user && user.pseudo ? user.pseudo : '',
        name: user && user.name ? user.name : '',
        firstname: user && user.firstname ? user.firstname : '',
        email: user && user.email ? user.email : '',
        birthday: user && user.birthday ? user.birthday : '',
        permissions: user && user.permissions ? user.permissions.map(p=>p.id) : [],
        roles: user && user.roles ? user.roles.map(p=>p.id) : [],
        password: '',
        password_confirm: '',
    })

    const [image, setImage] = useState(null)
    const [showCropper, setShowCropper] = useState(false)
    function submit(e) {
        e.preventDefault()
        if(user) {
            post(route('admin.user.update', user.id))
            return
        }
        post(route('admin.user.store'))
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
    async function handleImage(e) {
        setShowCropper(false)
        let file = e.target.files[0];
        let formData = new FormData()
        formData.append("image", file);
        if (file) {
            let res = await axios.post('/admin/user/'+user.id+'/upload-temp-image',formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }})
            setImage(res.data.path)
            document.getElementById('profil-image-modal').classList.add('modal-open')
            setTimeout(()=> {
                setShowCropper(true)
            }, 300)
        }

    }

    function handleRoleCheckBox(e) {
        let id = e.target.value;
        if (e.target.checked) {
            setData("roles", [...data.roles, id]);
        } else {
            setData(
                "roles",
                data.roles.filter((item) => {
                    return parseInt(item) !== parseInt(id);
                })
            );
        }
    }

    const checkPermissionViaRole = (permission)=> {
        return user && user.roles.find(role=> {
            return role.permissions.find(p=> p.id === permission.id)
        })
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
                                            <label className={'form-label d-block'+ (checkPermissionViaRole(p) != null ? ' text-blue-500' : '')}>{p.name}</label>
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

    const Roles = roles.map(role=> {
        return (
            <div className="mb-2 w-full flex justify-between" key={'role_'+role.id}>
                <label className="form-label d-block">{role.name}</label>
                <label htmlFor={'role_' + role.id} className="switch">
                    <input type="checkbox"
                           name="roles[]"
                           id={'role_' + role.id}
                           checked={data.roles.find(dp=> dp === role.id)}
                           onChange={e=> handleRoleCheckBox(e)}
                           value={role.id}/>
                    <span className="slider round"></span>
                </label>
            </div>
        )
    })

    return (
        <>
            <ImageCropper
                image={image}
                aspect={1}
                user={user}
                showCrop={showCropper}
                inputId="form-avatar-input"

            ></ImageCropper>
            <form className="h-full" onSubmit={submit}>
                <div className="h-full flex flex-col justify-between">
                    <div>
                        <div className="grid md:grid-cols-3 gap-4 border-b-2 pb-2">
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="name">Pseudo</label>
                                <input id="pseudo" type="text" className="input input-bordered w-full" value={data.pseudo} onChange={e=> setData('pseudo', e.target.value)}/>
                                {errors.pseudo && <small className="text-red-600">{errors.pseudo}</small>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="name">Nom</label>
                                <input id="name" type="text" className="input input-bordered w-full" value={data.name} onChange={e=> setData('name', e.target.value)}/>
                                {errors.name && <small className="text-red-600">{errors.name}</small>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="name">Prénom</label>
                                <input id="firstname" type="text" className="input input-bordered w-full" value={data.firstname} onChange={e=> setData('firstname', e.target.value)}/>
                                {errors.firstname && <small className="text-red-600">{errors.firstname}</small>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="email">Email</label>
                                <input id="email" type="email" className="input input-bordered w-full" disabled={user} value={data.email} onChange={e=> setData('email', e.target.value)}/>
                                {errors.email && <small className="text-red-600">{errors.email}</small>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="birthday">Date de naissance</label>
                                <input id="birthday" type="date" className="input input-bordered w-full" value={data.birthday} onChange={e=> setData('birthday', e.target.value)}/>
                                {errors.birthday && <small className="text-red-600">{errors.birthday}</small>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="email">Mot de passe</label>
                                <input id="password" type="password" className="input input-bordered w-full" onChange={e=> setData('password', e.target.value)}/>
                                {errors.password && <small className="text-red-600">{errors.password}</small>}
                            </div>
                            <div className="form-control w-full mb-3">
                                <label className="label-text" htmlFor="email">Confirmation de mot de passe</label>
                                <input id="password_confirm" type="password" className="input input-bordered w-full" onChange={e=> setData('password_confirm', e.target.value)}/>
                                {errors.password_confirm && <small className="text-red-600">{errors.password_confirm}</small>}
                            </div>
                            {user && (
                                <div className="form-control w-full mb-3">
                                    <label className="label-text" htmlFor="email">Image</label>
                                    <input id="form-avatar-input" type="file" className="file-input file-input-bordered file-input-primary w-full max-w-xs" onChange={e=> handleImage(e)}/>
                                </div>
                            )}
                        </div>
                        <h3 className="text-2xl mt-3">Roles</h3>
                        <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-4 border-b-2 pb-2">
                            {Roles}
                        </div>
                        <h3 className="text-2xl mt-3">Permissions</h3>
                        <span className="text-blue-500">(via le role)</span>
                        <div className="grid  md:grid-cols-3 lg:grid-cols-4  gap-4 border-b-2 pb-2">
                            {Permissions}
                        </div>
                    </div>
                    <div className="flex justify-end border-t-2 pt-2">
                        <Link href={route('admin.user.index')} className="btn btn-secondary mr-2">
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
        </>


    )
}
