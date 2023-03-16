import React, { Fragment, useEffect } from 'react'
import Footer from '../../components/footer/Footer'
import Header from '../../components/header/Header'
import CommonTable from '../../components/table/CommonTable'
import { useSelector, useDispatch } from 'react-redux'
import { tenantGet, tenantGetOne, TenantGetId, TenantViewPop, TenantEditPop,TenantCreatePop } from '../../redux/reducer/tenantList/TenantListReducer'
import TenantEdit from '../../components/modal/tenantList/edit/TenantEdit'
import TenantView from '../../components/modal/tenantList/view/View'
import { Switch, Modal, Drawer, Space, Button } from 'antd';
import Loader from '../../components/loader/Loader'
import * as Fi from 'react-icons/fi';
import * as Fa from 'react-icons/fa';
import * as Ai from 'react-icons/ai';
import moment from 'moment'
import TenantAdd from '../../components/modal/tenantList/add/TenantAdd';

function TenantList() {

    const dispatch = useDispatch()

    const searchData = useSelector((state) => state.Header.Search.value)
    console.log(searchData)
    const footerPage = useSelector((state) => state.Header.Footer.page)
    const footerPageSize = useSelector((state) => state.Header.Footer.pagesize)

    const tenantGetLoader = useSelector((state) => state.Tenant.loader.Loader)
    // console.log(tenantGetLoader)
    const tenantGetAll = useSelector((state) => state.Tenant.TenantGetData)

    const tenantEditOpen = useSelector((state) => state.Tenant.newForm.TenantEditPop)
    const tenantViewOpen = useSelector((state) => state.Tenant.newForm.TenantViewPop)
    const tenantCreateOpen = useSelector((state) => state.Tenant.newForm.TenantCreatePop)

    useEffect(() => {
        dispatch(tenantGet(true))
    }, [])

    const TenantEditModal = () => {
        dispatch(TenantEditPop())
    }

    const TenantViewModal = () => {
        dispatch(TenantViewPop())
    }

    const TenantAddModal = () => {
        dispatch(TenantCreatePop())
    }
    const tenantListColumns = [
        {
            title: 'S.No',
            dataIndex: 'sno',
            width: '50px',
            render: (text, object, index) => { return index + 1 },
          
        },
        {
            title: 'Company Name',
            dataIndex: 'companyname',
            // sorter: (a, b) => { return a.detailname.localeCompare(b.detailname) },
            width: '350px',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            width: '300px',

        },
        {
            title: 'Start Date',
            dataIndex: 'sdate',
            // sorter: (a, b) => { return a.sdate.localeCompare(b.sdate) },
            width: '300px'
        },
        {
            title: 'End Date',
            dataIndex: 'edate',
            // sorter: (a, b) => { return a.edate.localeCompare(b.edate) },
            width: '300px'
        },
        {
            title: 'Active',
            dataIndex: 'active',
            width: '70px'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            width: '120px'
        },
    ];

    const tenantFilterData = tenantGetAll.filter((val) => {
        if (searchData === '') {
            return val
        } else if (val.company_name.toString().toLowerCase().includes(searchData.toLowerCase())) {
            return val
        }
    })

    const tenantData = tenantFilterData.map((val) => {

        return (
            {
                companyname: val.company_name,
                role: val.role,
                sdate: moment.utc((val.start_date)).format('MM-DD-YYYY'),
                edate: moment.utc((val.end_date)).format('MM-DD-YYYY'),
                active: (<Switch checked={val.is_active === true ? true : false} />),
                action: (
                    <div className='Action_Icons'>
                        <Fi.FiEdit size={16} onClick={() => {
                            dispatch(TenantGetId({ singleData: val.id }))
                            dispatch(tenantGetOne())
                            dispatch(TenantEditPop())
                        }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                        <Fa.FaEye size={18} onClick={() => {
                            dispatch(TenantGetId({ singleData: val.id }))
                            dispatch(tenantGetOne())
                            dispatch(TenantViewPop())
                        }} style={{ cursor: 'pointer', marginRight: '20px' }} />
                    </div>
                )
            }
        )
    })

    const tenantGetData = (page, pageSize) => {
        return tenantData.slice((page - 1) * pageSize, page * pageSize);
    };



    return (
        <Fragment>
            {tenantGetLoader ? (
                <Loader />
                ) : (
                <Fragment>
                    <Header />
                    {/* <Modal title={false} style={{ top: 260 }} open={tenantGetLoader} maskClosable={false} closable={false} ariaHideApp={false} width='20vh' footer={null}>
                <Loader />
            </Modal> */}
                    <CommonTable tenantListColumns={tenantListColumns} tenantData={tenantGetData(footerPage, footerPageSize)} />
                    <Drawer title="Tenant Add" open={tenantCreateOpen} maskClosable={false} onClose={TenantAddModal} ariaHideApp={false} width='70vh' footer={null}
                    extra={
                        <Space >
                            <Button onClick={TenantAddModal}>Cancel</Button>
                        </Space>
                    }
                    >
                        <TenantAdd />
                    </Drawer>
                    <Drawer title="Tenant Edit" open={tenantEditOpen} maskClosable={false} onClose={TenantEditModal} ariaHideApp={false} width='70vh' footer={null}>
                        <TenantEdit />
                    </Drawer><Drawer title="Tenant View" open={tenantViewOpen} maskClosable={false} onClose={TenantViewModal} ariaHideApp={false} width='70vh' footer={null}>
                        <TenantView />
                    </Drawer>

                    <Footer tenantData={tenantFilterData.length} />
                </Fragment>
             )}
        </Fragment>
    )
}

export default TenantList