import {Link} from "@inertiajs/react";
import Avatar from "@/Components/Shared/Avatar";
import {useState} from "react";

export default function AvatarDropDown({auth, user}) {
    const [toggled, setToggled] = useState(false)
    const handleToggled = () => {
        if(toggled) {
            document.activeElement.blur()
        }
        setToggled(!toggled)
    }

    return (
        <div onClick={handleToggled} id="avatar-dropdown" className={"dropdown dropdown-end"+ (toggled ? ' dropdown-open' : '')}>
            <Avatar auth={auth} user={user} toggledProp={toggled}></Avatar>
            <ul tabIndex={0} className="menu transition dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                <li>
                    <Link as="button" href={route('logout')} method="post">Déconnexion</Link>
                </li>
                <li><a>Item 2</a></li>
            </ul>
        </div>
    )
}
