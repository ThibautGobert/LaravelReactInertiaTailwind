import {Link} from "@inertiajs/react";
import Avatar from "@/Components/Shared/Avatar";
import {useEffect, useRef, useState} from "react";
import {__} from "@/Utils/translations";

export default function AvatarDropDown({auth, user}) {
    const [toggled, setToggled] = useState(false)
    const dropDown = useRef(null)

    useEffect(()=> {
        const closeDropDown = (e)=> {
            const element = dropDown.current
            if (e.target !== element && !element.contains(e.target) && toggled) {
                setToggled(()=> false)
                document.activeElement.blur()
            }
        }
        document.addEventListener('click',closeDropDown)
        return () => {
            document.removeEventListener('click', closeDropDown);
        };
    },[toggled])

    const handleToggled = () => {
        if(toggled) {
            document.activeElement.blur()
        }
        setToggled(!toggled)
    }

    return (
        <div onClick={handleToggled}>
            <div ref={dropDown} id="avatar-dropdown" className={"dropdown dropdown-end mt-1"+ (toggled ? ' dropdown-open' : '')}>
                <Avatar auth={auth} user={user} toggledProp={toggled}></Avatar>
                <ul tabIndex={0} className="menu transition dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li>
                        <Link as="button" href={route('logout')} method="post">{__('auth.logout :pseudo', {pseudo: auth.user.pseudo})}</Link>
                    </li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </div>

    )
}
