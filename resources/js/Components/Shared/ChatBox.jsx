import {__} from "@/Utils/translations";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import axios from "axios";
import * as ChannelType from '../../Enums/Events/ChannelType'
import * as EventType from '../../Enums/Events/EventType'

const ChatBox = ({auth, user})=> {
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState('')
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useLayoutEffect(() => {
        window.Echo.private(ChannelType.Message+auth.user.id)
            .stopListening(EventType.MessageReceived)
    }, [])

    useEffect(()=> {
        window.Echo.private(ChannelType.Message+auth.user.id)
            .listen(EventType.MessageReceived, (e) => {
                setMessages((messages)=> [...messages, e.message])
            });
        const getMessages = async ()=> {
            let res = await axios.post('/admin/message/get-last-messages', {
                sender_id: auth.user.id,
                receiver_id: user.id
            })
            setMessages(res.data.messages)
        }
        getMessages()
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    const sendMessage = async()=> {
        let res = await axios.post('/admin/message/send', {
            sender_id: auth.user.id,
            receiver_id: user.id,
            content: message
        })
        setMessages(()=> [...messages, res.data.message])
        setMessage(()=>'')
    }

    const historique = messages.map((message=> {
        let isAuthMessage = message.sender_id === auth.user.id
        return (
            <div ref={messagesEndRef} key={'message-'+message.id} className={'chat'+ (!isAuthMessage ? ' chat-start' : ' chat-end')}>
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img src={'/storage/'+(!isAuthMessage ? user.avatar : auth.user.avatar)} />
                    </div>
                </div>
                <div className="chat-header">
                    {isAuthMessage ? auth.user.pseudo : user.pseudo} <br/>
                    <time className="text-xs opacity-50">{message.sent_at}</time>
                </div>
                <div className="chat-bubble">{message.content}</div>
                <div className="chat-footer opacity-50">
                    {message.read ? __('message.read') : __('message.unread')}
                </div>
            </div>
        )
    }))

    return (
        <>
            <input type="checkbox" id={'chat-box-'+user.id} className="modal-toggle" />
            <div className="modal text-base-content max-h-max overflow-y-hidden py-10 ">
                <div className="modal-box max-h-max m-auto">
                    <div className="overflow-y-auto h-[500px] scrollbar-thin scrollbar-thumb-neutral scrollbar-track-base-200 pr-3" style={{scrollbarColor: 'black'}}>
                        <label htmlFor={'chat-box-'+user.id} className="btn btn-sm btn-circle absolute right-2 top-2 z-20">✕</label>
                        <h3 className="text-lg text-base-content">
                            <i className="fa-solid fa-comments mr-2"></i>{__('message.chat with :user', {user: user.pseudo})}
                        </h3>
                        {historique}
                    </div>
                    <textarea onClick={e=>e.stopPropagation()}
                              onChange={(e)=>setMessage(e.target.value)}
                              value={message}
                              className="textarea textarea-bordered w-full mt-5">

                    </textarea>
                    <div className="modal-action">
                        <label htmlFor={'chat-box-'+user.id} className="btn btn-secondary btn-outline">
                            <i className="fa fa-times mr-2"></i>{__('global.annuler')}
                        </label>
                        <button onClick={sendMessage} className="btn btn-primary btn-outline"><i className="fa fa-check mr-2"></i>{__('global.envoyer')}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ChatBox
