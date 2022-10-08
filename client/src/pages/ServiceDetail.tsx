import Sidebar from '../components/Sidebar'
import { EventTypesInterface, ServiceInterface } from '../types'
import '../styles/services.scss'
import { useParams, useNavigate } from 'react-router-dom'
import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react'
import date from 'date-and-time'
import { ReactComponent as BackIcon } from '../assets/back.svg'
import { ReactComponent as EditIcon } from '../assets/edit.svg'
import { ReactComponent as DeleteIcon } from '../assets/delete.svg'
import ServiceEventsTable from '../components/ServiceEventsTable'
import ServicePeopleTable from '../components/ServicePeopleTable'
import UserContext from '../UserContext'
import Modal from '../components/Modal'

export default function ServiceDetails() {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [service, setService] = useState<ServiceInterface>()
  const [newService, setNewService] = useState<ServiceInterface>()
  const [availableEvents, setAvailableEvents] = useState<EventTypesInterface[]>()

  const getService = useCallback(async () => {
    const res = await fetch(`/api/services/${id}`)
    const data = await res.json() as ServiceInterface
    setService(data)
    setNewService(data)
  }, [id])

  useEffect(() => {
    getService()
  }, [getService])

  useEffect(() => {
    async function getAvailableEvents() {
      const res = await fetch(`/api/options/types?userId=${user?._id}`)
      const events = await res.json()
      setAvailableEvents(events)
    }
    getAvailableEvents()
  }, [user])

  function goBack(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault()
    navigate(-1)
  }

  function updateNewService(e: ChangeEvent<HTMLInputElement>) {
    setNewService(prev => {
      return {
        ...prev!,
        [e.target.name]: e.target.value
      }
    })
  }

  function updateNewServiceType(e: ChangeEvent<HTMLSelectElement>) {
    const _id = e.target.value
    const type = e.target.dataset.type

    setNewService(prev => {
      return {
        ...prev!,
        type: {
          ...prev!.type,
          _id,
          type: type!
        }
      }
    })
  }

  async function saveModal() {
    console.log()
    const res = await fetch(`/api/services/${id}/update`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: newService?.date,
        theme: newService?.theme,
        type: newService?.type._id
      })
    })

    if (res.status === 200) {
      console.log('success')
      await getService()
      setShowModal(false)
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  async function deleteService() {
    const confirmed = confirm('Are you sure you want to delete this service?')
    if (!confirmed) return

    const res = await fetch(`/api/services/${id}/delete`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    })

    if (res.status === 200) {
      setShowModal(false)
      navigate(-1)
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
          <input type="text" name="date" value={newService?.date} onChange={updateNewService} />
          <label htmlFor="theme">Theme</label>
          <input type="text" name="theme" value={newService?.theme} onChange={updateNewService} />
          <label htmlFor="type">Type</label>
          <select value={newService?.type.type} onChange={updateNewServiceType}>
            {availableEvents && availableEvents.map(e => <option value={e._id} data-type={e.type} key={e._id}>{e.type}</option>)}
          </select>
        </form>
      </Modal>

      <div className="page-content servicesDetail">
        {service && (
          <>
            <a href="/dashboard/services" className="goBack" onClick={goBack}><BackIcon /> Back</a>

            {/* Title Bar */}
            <div className="table-title-bar">
              <h2 className='table-title'>{date.format(new Date(service.date), 'M/D/YY')} Service</h2>
              <div className="table-title-btns">
                <button className='btn' onClick={() => setShowModal(true)}>
                  <EditIcon />
                  Edit
                </button>
                <button className='btn btn-delete' onClick={deleteService}>
                  <DeleteIcon />
                  Delete
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
            <ServiceEventsTable id={id!} small />

            {/* People Table */}
            <div className="table-title-bar table-title-bar-small">
              <h2 className='table-title table-title-small'>People</h2>
            </div>
            <ServicePeopleTable id={id!} small />
          </>
        )}
      </div>
    </div >
  )
}