import Sidebar from '../components/Sidebar'
import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { PersonInterface } from '../types'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import UserContext from '../UserContext'
import PersonTable from '../components/PersonTable'
import Modal from '../components/Modal'

export default function Options() {
  const { user } = useContext(UserContext)
  const [people, setPeople] = useState<PersonInterface[]>()
  const [newPerson, setNewPerson] = useState<PersonInterface>()
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    async function getPeople() {
      const res = await fetch(`/api/people?userId=${user?._id}`)
      const data = await res.json()
      setPeople(data)
    }
    getPeople()
  }, [user])

  async function saveModal() {
    const res = await fetch('/api/people/new', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        first_name: newPerson?.first_name,
        last_name: newPerson?.last_name,
        email: newPerson?.email,
        userId: user?._id
      })
    })

    if (res.status === 200) {
      const savedPerson: PersonInterface = await res.json()
      setPeople(prev => {
        return [...prev!, savedPerson]
      })
      setShowModal(false)
    } else {
      alert('Could not add person!')
    }
  }

  function updateNewPerson(e: ChangeEvent<HTMLInputElement>) {
    setNewPerson(prev => {
      return {
        ...prev!,
        [e.target.name]: e.target.value
      }
    })
  }

  function createModal() {
    const blankPerson: PersonInterface = {
      _id: '',
      first_name: '',
      last_name: '',
      email: '',
    }
    setNewPerson(blankPerson)
    setShowModal(true)
  }

  return (
    <div className='page'>
      <Sidebar activePage='people' />
      {newPerson && (
        <Modal
          title='Create Person'
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveModal}
        >
          <form>
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" value={newPerson.first_name} onChange={updateNewPerson} />
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" value={newPerson.last_name} onChange={updateNewPerson} />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={newPerson.email} onChange={updateNewPerson} />
          </form>
        </Modal>
      )}

      <div className="page-content">
        <div className="table-title-bar">
          <h2 className='table-title'>People</h2>
          <div className="table-title-btns">
            <button className='btn' onClick={createModal}>
              <PlusIcon />
              New Person
            </button>
          </div>
        </div>
        {people ? <PersonTable people={people} setPeople={setPeople} /> : ''}
      </div>
    </div>
  )
}