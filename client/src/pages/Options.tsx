import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import { EventTypesInterface, RoleTypesInterface, ServiceTypeInterface } from '../types'
import ServiceTypesTable from '../components/ServiceTypesTable'
import EventTypesTable from '../components/EventTypesTable'
import RoleTypesTable from '../components/RoleTypesTable'
import '../styles/options.scss'

type OptionsPromise = [ServiceTypeInterface[], EventTypesInterface[], RoleTypesInterface[]]

export default function Options() {
  const [serviceTypes, setServiceTypes] = useState<ServiceTypeInterface[]>()
  const [eventTypes, setEventTypes] = useState<EventTypesInterface[]>()
  const [roleTypes, setRoleTypes] = useState<RoleTypesInterface[]>()

  useEffect(() => {
    getOptions()
  }, [])

  async function getOptions() {
    const promises = [fetchData('/api/options/types'), fetchData('/api/options/events'), fetchData('/api/options/roles')]
    const [types, events, roles] = await Promise.all(promises) as OptionsPromise
    setServiceTypes(types)
    setEventTypes(events)
    setRoleTypes(roles)
  }

  async function fetchData(endpoint: string) {
    const res = await fetch(endpoint)
    const data = await res.json()
    return data
  }

  return (
    <div className='page'>
      <Sidebar activePage='options' />
      <div className="page-content">

        {/* Service Types */}
        <div className="table-title-bar table-title-bar-small">
          <h2 className='table-title table-title-small'>Service Types</h2>
        </div>
        {serviceTypes ? <ServiceTypesTable types={serviceTypes} setServiceTypes={setServiceTypes} small /> : ''}

        {/* Event Types */}
        <div className="table-title-bar table-title-bar-small">
          <h2 className='table-title table-title-small'>Event Types</h2>
        </div>
        {eventTypes ? <EventTypesTable types={eventTypes} setEventTypes={setEventTypes} small /> : ''}

        {/* Role Types */}
        <div className="table-title-bar table-title-bar-small">
          <h2 className='table-title table-title-small'>Role Types</h2>
        </div>
        {roleTypes ? <RoleTypesTable roles={roleTypes} setRoleTypes={setRoleTypes} small /> : ''}

      </div>
    </div>
  )
}