import { useContext, useEffect, useState } from 'react'
import ServiceTable from '../components/ServiceTable'
import Sidebar from '../components/Sidebar'
import { ServiceInterface } from '../types'
import UserContext from '../UserContext'
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
        <h2 className='service-title'>Services</h2>
        {services ? <ServiceTable services={services} /> : <p>No services</p>}
      </div>
    </div>
  )
}