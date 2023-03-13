import {useForm} from "@inertiajs/react";

export default function DeleteModal({user}) {
    const { data, setData, post, processing, errors, progress } = useForm({
        id: user.id,
    })

    function submit(e) {
        e.preventDefault()
        post(route('admin.user.delete', user))
    }
    return (
        <>
            <input type="checkbox" id={'delete-user-modal-'+user.id} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12">
                    <form onSubmit={submit}>
                        <h3 className="font-bold text-lg">Veuillez confirmer la suppression de {user.pseudo}</h3>
                        <p className="py-4">Cette action est irréversible !</p>
                        <div className="modal-action">
                            <label htmlFor={'delete-user-modal-'+user.id} className="btn btn-secondary btn-outline">
                                <i className="fa fa-times mr-2"></i>Annuler
                            </label>
                            <button
                                className="btn btn-success"
                                type="submit"
                                disabled={processing}>
                                {!processing && (<i className="fa fa-check mr-2"></i>)}
                                {processing && (<i className="fa-solid fa-circle-notch animate-spin mr-2"></i>)}
                                Enregistrer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
