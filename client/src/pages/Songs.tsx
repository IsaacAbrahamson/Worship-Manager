import { ChangeEvent, useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as CloudIcon } from '../assets/cloud.svg'
import { SongInterface } from '../types'
import UserContext from '../UserContext'
import SongsTable from '../components/SongsTable'
import Modal from '../components/Modal'

export default function Songs() {
  const { user } = useContext(UserContext)
  const [songs, setSongs] = useState<SongInterface[]>()
  const [newSong, setNewSong] = useState<SongInterface>()
  const [showModal, setShowModal] = useState<boolean>(false)

  useEffect(() => {
    getPeople()
  }, [])

  async function getPeople() {
    const res = await fetch(`/api/songs?userId=${user?._id}`)
    const data = await res.json()
    setSongs(data)
  }

  async function saveModal() {
    const res = await fetch('/api/songs/new', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: newSong?.name,
        page: newSong?.page,
        last_used: newSong?.last_used,
        userId: user?._id
      })
    })

    if (res.status === 200) {
      const savedSong: SongInterface = await res.json()
      setSongs(prev => {
        return [...prev!, savedSong]
      })
      setShowModal(false)
    } else {
      alert('Could not add person!')
    }
  }

  function updateNewSong(e: ChangeEvent<HTMLInputElement>) {
    setNewSong(prev => {
      return {
        ...prev!,
        [e.target.name]: e.target.value
      }
    })
  }

  function createModal() {
    const blankSong: SongInterface = {
      _id: '',
      name: '',
      page: undefined,
    }
    setNewSong(blankSong)
    setShowModal(true)
  }

  return (
    <>
      {newSong && (
        <Modal
          title='Create Song'
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveModal}
        >
          <form>
            <label htmlFor="name">Title</label>
            <input type="text" name="name" value={newSong.name} onChange={updateNewSong} />
            <label htmlFor="page">Page</label>
            <input type="number" name="page" value={newSong.page || ''} onChange={updateNewSong} />
          </form>
        </Modal>
      )}

      <div className='page'>
        <Sidebar activePage='songs' />
        <div className="page-content">

          <div className="table-title-bar">
            <h2 className='table-title'>Songs</h2>
            <div className="table-title-btns">
              <button className='btn' onClick={createModal}>
                <PlusIcon />
                New Song
              </button>
            </div>
          </div>
          {songs ? <SongsTable songs={songs} /> : ''}

        </div>
      </div>
    </>
  )
}