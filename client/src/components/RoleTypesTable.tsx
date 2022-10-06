import { RoleTypesInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import UserContext from '../UserContext'
import React, { useContext, useState } from "react"

interface Props {
  roles: RoleTypesInterface[],
  setRoleTypes: React.Dispatch<React.SetStateAction<RoleTypesInterface[] | undefined>>
  small?: boolean
}

export default function RoleTypesTable(props: Props) {
  const { user } = useContext(UserContext)
  const [roleInput, setRoleInput] = useState<string>('')

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.roles.map((role: RoleTypesInterface) => {
      return (
        <tr key={role._id}>
          <td>{role.role}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Delete onClick={() => deleteRole(role._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  async function submitRole(e: React.FormEvent) {
    e.preventDefault()
    if (roleInput === '') return

    const res = await fetch('/api/options/roles/new', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: roleInput, userId: user?._id })
    })

    if (res.status === 200) {
      const newRole: RoleTypesInterface = await res.json()
      props.setRoleTypes(prev => {
        return [...prev!, newRole]
      })
    } else {
      alert('Could not add role!')
    }

    setRoleInput('')
  }

  async function deleteRole(id: string) {
    const res = await fetch('/api/options/roles/delete', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    if (res.status === 200) {
      props.setRoleTypes(prev => prev?.filter(e => e._id !== id))
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
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <form onSubmit={submitRole}>
          <input type="text" name="role" placeholder="Enter new role..." value={roleInput} onChange={(e) => setRoleInput(e.target.value)} />
          <button><PlusIcon /> Add Role</button>
        </form>
      </div>
    </div>
  )
}