import { SongInterface } from "../types";
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import date from 'date-and-time'

interface Props {
  songs: SongInterface[]
}

export default function SongsTable(props: Props) {
  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.songs.map((song: SongInterface) => {
      return (
        <tr key={song._id}>
          <td>{song.name}</td>
          <td>{song.page ? song.page : ''}</td>
          <td>{song.last_used ? date.format(new Date(song.last_used), 'M/D/YY') : ''}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit />
              <Delete />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  return (
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
  )
}