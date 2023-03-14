import Cropper from 'react-easy-crop'
import {useCallback, useEffect, useState} from "react";
import {useForm} from "@inertiajs/react";

const ImageCropper = ({image, aspect, user}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [showCrop, setShowCrop] = useState(false)
    const { data, setData, post, processing, errors, progress } = useForm({
        cropped_area: null,
        zoom: null,
        image: image
    })

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        data.cropped_area = croppedArea
        data.cropped_area_pixel = croppedAreaPixels
        //console.log(croppedArea, croppedAreaPixels, {zoom:zoom})
    }, [])

    function submit(e) {
        e.preventDefault()
        data.image= image
        //data.zoom = zoom
        post(route('admin.user.crop-image', user))
        onClose()
    }

    useEffect(()=> {
        setTimeout(()=> {
            setShowCrop(true)
        }, 1000)

    })
    function onClose() {
        document.getElementById('input-avatar').value = null
        document.getElementById('profil-image-modal').classList.remove('modal-open')
    }

    return (
        <>
            <div id={'profil-image-modal'} className="modal" >
                <div className="modal-box w-11/12 max-w-5xl flex flex-col h-[800px]">
                    <div className="relative flex-grow" >
                        {showCrop && image && <Cropper
                            image={'/storage/'+image}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />}
                    </div>
                    <div className="modal-action">
                        <form onSubmit={submit}>
                            <label onClick={onClose} htmlFor={'profil-image-modal'} className="btn btn-secondary btn-outline">
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
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
export default ImageCropper
