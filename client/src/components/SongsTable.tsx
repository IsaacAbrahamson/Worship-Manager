import { SongInterface } from "../types";
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import date from 'date-and-time'
import { ChangeEvent, useState } from "react";
import Modal from "./Modal";

interface Props {
  songs: SongInterface[]
  setSongs: React.Dispatch<React.SetStateAction<SongInterface[] | undefined>>
}

export default function SongsTable(props: Props) {
  const [song, setSong] = useState<SongInterface>()
  const [showModal, setShowModal] = useState<boolean>(false)

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.songs.map((song: SongInterface) => {
      return (
        <tr key={song._id}>
          <td>{song.name}</td>
          <td>{song.page ? song.page : ''}</td>
          <td>{song.last_used ? date.format(new Date(song.last_used), 'M/D/YY') : ''}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit onClick={() => createModal(song)} />
              <Delete onClick={() => deleteSong(song._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  async function deleteSong(id: string) {
    const res = await fetch('/api/songs/delete', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    if (res.status === 200) {
      props.setSongs(prev => prev?.filter(e => e._id !== id))
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  function createModal(song: SongInterface) {
    setSong(song)
    setShowModal(true)
  }

  async function saveModal() {
    const res = await fetch('/api/songs/update', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(song)
    })

    if (res.status === 200) {
      const updatedSong: SongInterface = await res.json()
      // Update service types with new value
      props.setSongs(prev => {
        return prev!.map(e => {
          if (e._id !== updatedSong._id) return e
          return {
            ...e,
            name: updatedSong.name,
            page: updatedSong.page
          }
        })
      })
      setShowModal(false)
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  function updateSong(e: ChangeEvent<HTMLInputElement>) {
    setSong(prev => {
      return {
        ...prev!,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <>
      {song && (
        <Modal
          title='Update Person'
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveModal}
        >
          <form>
            <label htmlFor="name">Title</label>
            <input type="text" name="name" value={song.name} onChange={updateSong} />
            <label htmlFor="page">Page</label>
            <input type="number" name="page" value={song.page || ''} onChange={updateSong} />
          </form>
        </Modal>
      )}

      <div className="table-wrapper">
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Page</th>
              <th>Last Used</th>
              <th></th>
            </tr>
            {createRows()}
          </tbody>
        </table>
      </div>
    </>
  )
}