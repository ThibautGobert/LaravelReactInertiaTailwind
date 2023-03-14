import {Link} from "@inertiajs/react";
import AvatarDropDown from "@/Components/Layout/Partials/AvatarDropDown";

export default function AdminMenu({auth}) {
    return (
        <nav className="flex justify-end bg-slate-900 w-full py-3 px-3">
            <AvatarDropDown auth={auth} user={auth.user}></AvatarDropDown>
        </nav>
    )
}
