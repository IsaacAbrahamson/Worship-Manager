import Sidebar from '../components/Sidebar'
import { ServiceInterface } from '../types'
import '../styles/services.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import date from 'date-and-time'
import { ReactComponent as BackIcon } from '../assets/back.svg'
import { ReactComponent as EditIcon } from '../assets/edit.svg'
import { ReactComponent as CopyIcon } from '../assets/copy.svg'
import ServiceEventsTable from '../components/ServiceEventsTable'
import ServicePeopleTable from '../components/ServicePeopleTable'

export default function ServiceDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [service, setService] = useState<ServiceInterface>()

  useEffect(() => {
    getService()
  }, [])

  async function getService() {
    const res = await fetch(`/api/services/${id}`)
    const data = await res.json() as ServiceInterface
    setService(data)
  }

  function goBack(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div className='page'>
      <Sidebar activePage='services' />
      <div className="page-content servicesDetail">
        {service && (
          <>
            <a href="/dashboard/services" className="goBack" onClick={goBack}><BackIcon /> Back</a>

            {/* Title Bar */}
            <div className="table-title-bar">
              <h2 className='table-title'>{date.format(new Date(service.date), 'M/D/YY')} Service</h2>
              <div className="table-title-btns">
                <button className='btn btn-outline'>
                  <CopyIcon />
                  Copy
                </button>
                <button className='btn'>
                  <EditIcon />
                  Edit
                </button>
              </div>
            </div>

            {/* Details Bar */}
            <div className="service-detail-bar">
              <p className="service-detail-item"><span>Time:</span> {date.format(new Date(service.date), 'hh:mm A')}</p>
              <p className="service-detail-item">
                <span>Type: </span>
                <span className='service-detail-item--type' style={{ background: service.type.background, color: service.type.color }}>{service.type.type}</span>
              </p>
              <p className="service-detail-item"><span>Theme:</span> {service.theme}</p>
            </div>

            {/* Events Table */}
            <div className="table-title-bar table-title-bar-small">
              <h2 className='table-title table-title-small'>Events</h2>
            </div>
            <ServiceEventsTable events={service.events} small />

            {/* People Table */}
            <div className="table-title-bar table-title-bar-small">
              <h2 className='table-title table-title-small'>People</h2>
            </div>
            <ServicePeopleTable people={service.people} small />
          </>
        )}
      </div>
    </div >
  )
}