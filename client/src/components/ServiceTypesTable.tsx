import { ServiceTypeInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import { useState } from "react"

interface Props {
  types: ServiceTypeInterface[]
  setServiceTypes: React.Dispatch<React.SetStateAction<ServiceTypeInterface[] | undefined>>
  small?: boolean
}

export default function ServiceTypesTable(props: Props) {
  const [typeInput, setTypeInput] = useState<string>('')

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.types.map((type: ServiceTypeInterface) => {
      return (
        <tr key={type._id}>
          <td>{type.type}</td>
          <td>
            <div className="colored-circle" style={{ background: type.color }}></div>
            {type.color}
          </td>
          <td>
            <div className="colored-circle" style={{ background: type.background }}></div>
            {type.background}
          </td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit />
              <Delete onClick={() => deleteType(type._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  async function submitType(e: React.FormEvent) {
    e.preventDefault()
    if (typeInput === '') return

    const res = await fetch('/api/options/types/new', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: typeInput })
    })

    if (res.status === 200) {
      const newType: ServiceTypeInterface = await res.json()
      props.setServiceTypes(prev => {
        return [...prev!, newType]
      })
    } else {
      alert('Could not add type!')
    }

    setTypeInput('')
  }

  async function deleteType(id: string) {
    const res = await fetch('/api/options/types/delete', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    if (res.status === 200) {
      props.setServiceTypes(prev => prev?.filter(e => e._id !== id))
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  return (
    <div className={props.small ? 'table-wrapper table-wrapper-small' : 'table-wrapper'}>
      <table>
        <tbody>
          <tr>
            <th>Type</th>
            <th>Color</th>
            <th>Background</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <form onSubmit={submitType}>
          <input type="text" name="role" placeholder="Enter new service type..." value={typeInput} onChange={(e) => setTypeInput(e.target.value)} />
          <button><PlusIcon /> Add Service type</button>
        </form>
      </div>
    </div>
  )
}