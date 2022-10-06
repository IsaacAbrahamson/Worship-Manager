import { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as CloudIcon } from '../assets/cloud.svg'
import { SongInterface } from '../types'
import UserContext from '../UserContext'
import SongsTable from '../components/SongsTable'

export default function Songs() {
  const { user } = useContext(UserContext)
  const [songs, setSongs] = useState<SongInterface[]>()

  useEffect(() => {
    getPeople()
  }, [])

  async function getPeople() {
    const res = await fetch(`/api/songs?userId=${user?._id}`)
    const data = await res.json()
    setSongs(data)
  }

  return (
    <div className='page'>
      <Sidebar activePage='songs' />
      <div className="page-content">

        <div className="table-title-bar">
          <h2 className='table-title'>Songs</h2>
          <div className="table-title-btns">
            <button className='btn'>
              <PlusIcon />
              New Song
            </button>
          </div>
        </div>
        {songs ? <SongsTable songs={songs} /> : ''}

      </div>
    </div>
  )
}