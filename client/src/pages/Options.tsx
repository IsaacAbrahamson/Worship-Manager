import Sidebar from '../components/Sidebar'
import { useEffect, useState } from 'react'
import { EventTypesInterface, RoleTypesInterface, ServiceTypeInterface } from '../types'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as CloudIcon } from '../assets/cloud.svg'
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
        <div className="table-title-bar">
          <h2 className='table-title'>Service Types</h2>
          <div className="table-title-btns">
            <button className='btn btn-outline'>
              <CloudIcon />
              Import / Export
            </button>
            <button className='btn'>
              <PlusIcon />
              New Service Type
            </button>
          </div>
        </div>
        {serviceTypes ? <ServiceTypesTable types={serviceTypes} /> : ''}

        {/* Event Types */}
        <div className="table-title-bar">
          <h2 className='table-title'>Event Types</h2>
          <div className="table-title-btns">
            <button className='btn btn-outline'>
              <CloudIcon />
              Import / Export
            </button>
            <button className='btn'>
              <PlusIcon />
              New Event Type
            </button>
          </div>
        </div>
        {eventTypes ? <EventTypesTable types={eventTypes} /> : ''}

        {/* Role Types */}
        <div className="table-title-bar">
          <h2 className='table-title'>Role Types</h2>
          <div className="table-title-btns">
            <button className='btn btn-outline'>
              <CloudIcon />
              Import / Export
            </button>
            <button className='btn'>
              <PlusIcon />
              New Role Type
            </button>
          </div>
        </div>
        {roleTypes ? <RoleTypesTable roles={roleTypes} /> : ''}

      </div>
    </div>
  )
}