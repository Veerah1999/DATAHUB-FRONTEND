import React from 'react'
import './Home.css';
import menu from "../../assests/images/coordinate.png"
import pagesSvg from '../../assests/icons/roleDetails.svg'
import user from "../../assests/images/man.png"
import userRole from '../../assests/images/settings.png'
import roleDetails from '../../assests/images/profile.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionStatusChanger } from '../../redux/reducer/HeaderReducer'
import teams from "../../assests/icons/teams-icon.svg"
import { Card } from 'antd';

function Home(props) {

    const {pages}=props
    console.log(pages)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const settingPages=pages.filter((val)=>{
        if (val.pages == "settings") {
            return val
        }
    })

    console.log(settingPages)

    return (
        <>
            <div className='Settingheader' >
                Settings
            </div>

            <div className='Settingoption'>
                {/* <div className='setting_overall'>
                <Card size="small" className='setting_cardOne'
                    // title="Role"
                    //   extra={<a href="#">More</a>}
                    style={{
                        width: 280, height:130,backgroundImage: 'linear-gradient( 135deg, #90F7EC 10%, #32CCBC 100%)',borderRadius:'5px'
                    }}>
                    <div className=' card' onClick={() => {
                        navigate('/role')
                        dispatch(ActionStatusChanger({ status:'Role'}))
                        sessionStorage.setItem('settingstatus', ('Role'))
                    }}>
                        <img className='roledetailImg'  src={menu} /> <p className='Set_Name'>Role</p>
                    </div>
                </Card>
                </div> */}
                {/* <div className='setting_overall'>
                <Card size="small"className='setting_cardOne'
                    // title="Role Details"
                    style={{
                        width: 280, height:130, backgroundImage:'radial-gradient( circle 588px at 31.7% 40.2%,  rgba(225,200,239,1) 21.4%, rgba(163,225,233,1) 57.1% )',borderRadius:'5px'
                        // width: 280,height:130,borderRadius:'5px',backgroundImage:' radial-gradient( circle 993px at 0.5% 50.5%,  rgba(137,171,245,0.37) 0%, rgba(245,247,252,1) 100.2% )'
                    }}>
                    <div className='roledetailbutton card' onClick={() => {
                        navigate('/roledetails')
                        dispatch(ActionStatusChanger({ status: 'Role Details' }))
                        sessionStorage.setItem('settingstatus', ('Role Details'))
                    }}
                    >
                        <img className='roledetailImg' src={roleDetails} />
                        <p  className='Set_Name'>Role Details</p>
                    </div>
                </Card>
                </div> */}
                <div className='setting_overall'>    
                <Card
                    size="small" className='setting_cardOne'
                    // title="User"
                    style={{
                        width: 250,height:130,
                        backgroundImage: ' radial-gradient( circle farthest-corner at 50.7% 54%,  rgba(204,254,152,1) 0%, rgba(229,253,190,1) 92.4% )',borderRadius:'5px'
                    }}
                >
                    <div className='user card' onClick={() => {
                        navigate('/user')
                        dispatch(ActionStatusChanger({ status: 'User' }))
                        sessionStorage.setItem('settingstatus', ('User'))
                    }}
                    >
                        <img className='roledetailImg'  src={user} /><p  className='Set_Name'>User</p>
                    </div>
                </Card>            
                </div>
                {/* <div className='setting_overall'>
                <Card
                    size="small"className='setting_cardOne'
                    // title="User Role"
                    style={{
                        width: 280,height:130,backgroundImage: 'linear-gradient( 109.5deg,  rgba(229,233,177,1) 11.2%, rgba(223,205,187,1) 100.2% )',borderRadius:'5px'
                    }}
                >
                    <div className='userRole card' onClick={() => {
                        navigate('/userrole')
                        dispatch(ActionStatusChanger({ status: 'User Role' }))
                        sessionStorage.setItem('settingstatus', ('User Role'))
                    }}
                    >
                        <img className='roledetailImg'  src={userRole} /> <p  className='Set_Name'>User Role</p>
                    </div>
                </Card>
                </div> */}

                <>
                {settingPages && settingPages.map((val)=>{
                    return(
                <div className='setting_overall' style={{display:((val.PagesModule.view == true ? 'block':'none'))}}>
                <Card
                    size="small" className='setting_cardOne'
                    // title="Pages"
                    style={{
                        width: 250,height:130,borderRadius:'5px',
                        backgroundImage:' radial-gradient( circle 993px at 0.5% 50.5%,  rgba(137,171,245,0.37) 0%, rgba(245,247,252,1) 100.2% )'
                        
                    }}
                >
                    <div className='userRole card' onClick={() => {
                        navigate('/pages')
                        dispatch(ActionStatusChanger({ status: 'Pages' }))
                        sessionStorage.setItem('settingstatus', ('Pages'))
                    }}
                    >
                        <img className='roledetailImg'  src={pagesSvg} /> <p  className='Set_Name'>Pages</p>
                    </div>
                </Card>
                </div>
                )
                })}
                </>
                <div className='setting_overall'>
                <Card
                    size="small" className='setting_cardOne'
                    // title="Teams"
                    style={{
                        width: 250,height:130,borderRadius:'5px',
                        backgroundImage:'linear-gradient( 135deg, #FFD3A5 100%, #FD6585 0%)'
                    }}
                >
                    <div className='userRole card' onClick={() => {
                        navigate('/teams')
                        dispatch(ActionStatusChanger({ status: 'Teams' }))
                        sessionStorage.setItem('settingstatus', ('Teams'))
                    }}
                    >
                        <img className='roledetailImg'  src={teams} /> <p  className='Set_Name'>Teams</p>
                    </div>
                </Card>
                </div>
            </div>

        </>
    )
}

export default Home