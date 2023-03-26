import {useDispatch, useSelector} from "react-redux";
import {selectNotification, updateAsync} from "@/Store/Slices/notificationSlice";
import {useEffect} from "react";
import * as ChannelType from "@/Enums/Events/ChannelType";
import * as EventType from "@/Enums/Events/EventType";

export const NotificationsWrapper = ({auth})=> {
    const notification = useSelector(selectNotification)
    const dispach = useDispatch();

    useEffect(()=> {
        dispach(updateAsync(auth.user.id))

        window.Echo.private(ChannelType.Notification+auth.user.id)
            .listen(EventType.NotificationReceived, (e) => {
                dispach(updateAsync(auth.user.id))
            });
    }, [])

    return (
        <div className="w-10 h-10 text-4xl mr-2 cursor-pointer relative">
            {notification && notification.length > 0 && <span className="badge absolute right-[-5px] top-[5px]">{notification.length}</span>}
            <i className="fa-solid fa-bell"></i>
        </div>
    )
}
