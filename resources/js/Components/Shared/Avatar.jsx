import {useRef, useState} from "react";
import axios from "axios";
import ImageCropper from "@/Components/Shared/ImageCropper";
import useClickOutside from "@/Hooks/useClickOutside";
export default function Avatar({auth, user, toggledProp}) {
    const [toggled, setToggled] = useState(toggledProp || false)
    const [showCropper, setShowCropper] = useState(false)
    const [image, setImage] = useState(null)
    const wrapperRef = useRef(null);
    useClickOutside(wrapperRef);

    const handleToggled = () => {
        if(toggled) {
            document.activeElement.blur()
        }
        setToggled(!toggled)
    }

    async function handleImageClick(e) {
        e.stopPropagation();
        setShowCropper(false)
        document.getElementById('avatar-input').click()
    }

    function handleInputClick(e) {
        e.stopPropagation()
    }
    async function handleImage() {
        let file = document.getElementById('avatar-input').files[0];
        let formData = new FormData()
        formData.append("image", file);
        if(file) {
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

    return (
        <div ref={wrapperRef}>
            {!user.avatar && (<div tabIndex={0} className="avatar w-20 text-white online placeholder cursor-pointer">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                    <span className="text-xl">{Array.from(auth.user.name)[0]}</span>
                </div>
            </div>)}
            {user.avatar && (<div tabIndex={0} className={"avatar w-20 text-white cursor-pointer" + (user.is_online ? ' online' : ' offline')}>
                <div onClick={()=> handleToggled()}   className="relative  text-neutral-content rounded-full w-20 overflow-hidden">
                    <img src={'/storage/'+user.avatar} />
                    {auth.user && auth.user.id === user.id && (<div onClick={handleImageClick}
                        className={`transition text-white text-center
                            flex items-start justify-center rounded-full absolute left-2/4
                            -translate-x-2/4 w-32 h-32  bg-gray-700 ${toggled ? '-translate-y-[30px]' : ''}
                            hover:bg-cyan-600
                            `}>
                        <i className="fa-solid fa-gear mt-2"></i>
                    </div>)}
                </div>
            </div>)}
            <ImageCropper
                image={image}
                aspect={1}
                user={user}
                showCrop={showCropper}
                inputId="avatar-input"
            ></ImageCropper>
            <input onClick={handleInputClick} onChange={handleImage} id="avatar-input" type="file" className="hidden"/>
        </div>
    )
}
