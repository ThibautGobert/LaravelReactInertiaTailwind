import {useEffect} from "react";
import {menuClasses, ProSidebarProvider, Sidebar, sidebarClasses} from "react-pro-sidebar";
import {Menu, MenuItem} from 'react-pro-sidebar';
import {Link} from "@inertiajs/react";

export default function AdminSidebar({items}) {
    function Icon(props) {
        return <i className={props.name}></i>
    }

    const MappedItems = items.map((item, i) => {
        return (
            <MenuItem key={i} active={item.active} icon={<Icon name={item.icon}/>} component={<Link href={item.href}></Link>}>
                {item.label}
            </MenuItem>
        )
    })

    return (
        <ProSidebarProvider>
            <Sidebar className="bg-slate-900" style={{width: '250px', borderRightStyle: 'unset'}}
                     menuItemStyles={{
                         button: ({level, active, disabled}) => {
                             return {
                                 color: active ? 'rgb(15 23 42 / var(--tw-bg-opacity))' : 'rgba(255,255,255,.55)',
                                 '&:hover': {
                                     color: active ? 'rgba(255,255,255,.55)' : 'rgb(15 23 42 / var(--tw-bg-opacity))',
                                     backgroundColor: active ? 'rgb(15 23 42 / var(--tw-bg-opacity))' : 'rgba(255,255,255,.55)',
                                 },
                                 backgroundColor: active ? 'rgba(255,255,255,.55)' : 'rgb(15 23 42 / var(--tw-bg-opacity))',
                             };
                         },
                     }}
                     rootStyles={{
                         [`.${sidebarClasses.container}`]: {
                             backgroundColor: 'rgb(15 23 42 / var(--tw-bg-opacity))',
                             color: 'rgba(255,255,255,.55)'
                         },

                         [`.${menuClasses.menuItemRoot}`]: {
                             backgroundColor: 'rgb(15 23 42 / var(--tw-bg-opacity))',
                             color: 'rgba(255,255,255,.55)',
                             '&:hover': {
                                 color: 'rgb(15 23 42 / var(--tw-bg-opacity))',
                                 backgroundColor: 'rgba(255,255,255,.55)',
                             },
                             '&.ps-active': {
                                 color: 'rgb(15 23 42 / var(--tw-bg-opacity))',
                                 backgroundColor: 'rgba(255,255,255,.55)',
                             },
                         }
                     }}
            >
                <Menu>
                    {MappedItems}
                </Menu>
            </Sidebar>
        </ProSidebarProvider>
    )
}
