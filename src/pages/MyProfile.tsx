import React from 'react'
import { HeaderWrap } from '../components/common/HeaderWrap'
import { useAppSelector } from '../stores/hook'
import '../css/MyProfile.css'
const MyProfile = () =>{
    const user = useAppSelector((state:any)=>state.auth.user)   
    return (
        <HeaderWrap>
         {user &&    <div className="profile_body">
             <img src={user.avatar} />
             <div className="profile_info">
                <div className="info_wrap">
                    <div className="info_name_wrap">Name : <span className="info_name">{user.name}</span></div>
                    <div className="info_email_wrap">Email : <span className="info_email">{user.email}</span></div>
                    <div className="info_role_wrap">Role : <span className="info_role">{user.role}</span></div>
                    <div className="info_editTime_wrap">Edited At : <span className="info_editTime">{user.updatedAt.substring(0, user.updatedAt.indexOf("T"))}</span></div>
                    
                </div>
             </div>
            </div>}
        </HeaderWrap>
    )
}

export default MyProfile