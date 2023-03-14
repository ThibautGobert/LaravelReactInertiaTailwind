import {Link} from "@inertiajs/react";
import {useState} from "react";
export default function Avatar({auth, user, toggledProp}) {
    const [toggled, setToggled] = useState(toggledProp || false)

    const handleToggled = () => {
        if(toggled) {
            document.activeElement.blur()
        }
        setToggled(!toggled)
    }

    return (
        <>
            {!user.avatar && (<div tabIndex={0} className="avatar w-20 text-white online placeholder cursor-pointer">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                    <span className="text-xl">{Array.from(auth.user.name)[0]}</span>
                </div>
            </div>)}
            {user.avatar && (<div tabIndex={0} className={"avatar w-20 text-white cursor-pointer" + (user.is_online ? ' online' : ' offline')}>
                <div onClick={()=> handleToggled()}   className="relative  text-neutral-content rounded-full w-20 overflow-hidden">
                    <img src={'/storage/'+user.avatar} />
                    {auth.user && auth.user.id === user.id && (<div className={`transition text-white text-center
                            flex items-start justify-center rounded-full absolute left-2/4
                            -translate-x-2/4 w-32 h-32 h-full bg-gray-700 ${toggled ? '-translate-y-[30px]' : ''}
                            hover:bg-cyan-600
                            `}>
                        <i className="fa-solid fa-gear mt-2"></i>
                    </div>)}
                </div>
            </div>)}
        </>
    )
}
