import { useCallback, useContext, useEffect, useState } from 'react'
import ServiceTable from '../components/ServiceTable'
import Sidebar from '../components/Sidebar'
import { EventTypesInterface, ServiceInterface } from '../types'
import UserContext from '../UserContext'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import '../styles/services.scss'
import Modal from '../components/Modal'

export default function Services() {
  const { user } = useContext(UserContext)
  const [services, setServices] = useState<ServiceInterface[]>()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [theme, setTheme] = useState('')
  const [type, setType] = useState('')
  const [availableEvents, setAvailableEvents] = useState<EventTypesInterface[]>()

  const getServices = useCallback(async () => {
    const res = await fetch(`/api/services?userId=${user?._id}`)
    const data = await res.json()
    setServices(data)
  }, [user])

  useEffect(() => {
    getServices()
  }, [getServices])

  useEffect(() => {
    async function getAvailableEvents() {
      const res = await fetch(`/api/options/types?userId=${user?._id}`)
      const events = await res.json()
      setAvailableEvents(events)
    }
    getAvailableEvents()
  }, [user])

  async function saveModal() {
    const datetime: Date = new Date(date + ' ' + time)

    const res = await fetch('/api/services/new', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        datetime,
        theme,
        type,
        userId: user?._id
      })
    })

    if (res.status === 200) {
      const newService = await res.json()
      setServices(prev => [...prev!, newService])
      setShowModal(false)
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  return (
    <div className='page'>
      <Sidebar activePage='services' />
      <Modal
        title='Update Service'
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={saveModal}
      >
        <form>
          <label htmlFor="date">Date</label>
          <input type="text" name="date" value={date} placeholder='YYYY-MM-DD' onChange={(e) => setDate(e.target.value)} />
          <label htmlFor="time">Time</label>
          <input type="text" name="time" value={time} placeholder='24:00' onChange={(e) => setTime(e.target.value)} />
          <label htmlFor="theme">Theme</label>
          <input type="text" name="theme" value={theme} placeholder='Describe theme' onChange={(e) => setTheme(e.target.value)} />
          <label htmlFor="type">Type</label>
          <select name="type" value={type} onChange={(e) => setType(e.target.value)}>
            <option disabled={true} value="">Choose event</option>
            {availableEvents && availableEvents.map(e => <option value={e._id} data-type={e.type} key={e._id}>{e.type}</option>)}
          </select>
        </form>
      </Modal>

      <div className="page-content services">
        <div className="table-title-bar">
          <h2 className='table-title'>Upcoming Services</h2>
          <div className="table-title-btns">
            <button className='btn' onClick={() => setShowModal(true)}>
              <PlusIcon />
              New Service
            </button>
          </div>
        </div>
        <p className='table-subtitle'>Click on a service for details</p>
        {services ? <ServiceTable services={services} /> : ''}

        <div className="table-title-bar">
          <h2 className='table-title'>Past Services</h2>
        </div>
        <p className='table-subtitle'>Click on a service for details</p>
        {services ? <ServiceTable services={services} /> : ''}

      </div>
    </div>
  )
}