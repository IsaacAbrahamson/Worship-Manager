import { useContext, useEffect, useState } from 'react'
import ServiceTable from '../components/ServiceTable'
import Sidebar from '../components/Sidebar'
import { ServiceInterface } from '../types'
import UserContext from '../UserContext'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as CloudIcon } from '../assets/cloud.svg'
import '../styles/services.scss'

export default function Options() {
  const { user } = useContext(UserContext)
  const [services, setServices] = useState<ServiceInterface[]>()

  useEffect(() => {
    getServices()
  }, [])

  async function getServices() {
    const res = await fetch('/api/services/')
    const data = await res.json()
    setServices(data)
  }

  return (
    <div className='page'>
      <Sidebar activePage='services' />
      <div className="page-content services">

        <div className="table-title-bar">
          <h2 className='table-title'>Upcoming Services</h2>
          <div className="table-title-btns">
            <button className='btn btn-outline'>
              <CloudIcon />
              Import / Export
            </button>
            <button className='btn'>
              <PlusIcon />
              New Service
            </button>
          </div>
        </div>
        {services ? <ServiceTable services={services} /> : ''}

        <div className="table-title-bar">
          <h2 className='table-title'>Past Services</h2>
        </div>
        {services ? <ServiceTable services={services} /> : ''}

      </div>
    </div>
  )
}