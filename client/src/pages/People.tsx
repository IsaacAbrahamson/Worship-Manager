import Sidebar from '../components/Sidebar'
import { useContext, useEffect, useState } from 'react'
import { PersonInterface } from '../types'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as CloudIcon } from '../assets/cloud.svg'
import UserContext from '../UserContext'
import PersonTable from '../components/PersonTable'

export default function Options() {
  const { user } = useContext(UserContext)
  const [people, setPeople] = useState<PersonInterface[]>()

  useEffect(() => {
    getPeople()
  }, [])

  async function getPeople() {
    const res = await fetch(`/api/people?userId=${user?._id}`)
    const data = await res.json()
    setPeople(data)
  }

  return (
    <div className='page'>
      <Sidebar activePage='people' />
      <div className="page-content">

        <div className="table-title-bar">
          <h2 className='table-title'>People</h2>
          <div className="table-title-btns">
            <button className='btn'>
              <PlusIcon />
              New Person
            </button>
          </div>
        </div>
        {people ? <PersonTable people={people} /> : ''}

      </div>
    </div>
  )
}