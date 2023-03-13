import {Link} from "@inertiajs/react";

export default function AdminMenu({auth}) {
    return (
        <nav className="flex justify-end bg-slate-900 w-full py-3 px-3">
            <div className="dropdown dropdown-end">
                {!auth.user.avatar && (<div tabIndex={0} className="avatar w-20 text-white online placeholder cursor-pointer">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                        <span className="text-xl">{Array.from(auth.user.name)[0]}</span>
                    </div>
                </div>)}
                {auth.user.avatar && (<div tabIndex={0} className="avatar w-20 text-white online cursor-pointer">
                    <div className="bg-neutral-focus text-neutral-content rounded-full w-20">
                        <img src={'/storage/'+auth.user.avatar} />
                    </div>
                </div>)}
                <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4">
                    <li>
                        <Link as="button" href={route('logout')} method="post">Déconnexion</Link>
                    </li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
        </nav>
    )
}
