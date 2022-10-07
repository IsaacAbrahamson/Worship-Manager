import { RoleTypesInterface, PersonInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import UserContext from '../UserContext'
import { useContext, useEffect, useState } from "react"

interface Props {
  people: {
    role: { role: string },
    person: PersonInterface
  }[],
  small: boolean
}

export default function PeopleEventsTable(props: Props) {
  const { user } = useContext(UserContext)
  const [selectedPerson, setSelectedPerson] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [availablePeople, setAvailablePeople] = useState<PersonInterface[]>()
  const [availableRoles, setAvailableRoles] = useState<RoleTypesInterface[]>()

  useEffect(() => {
    getPeople()
    getRoles()
  }, [])

  async function getPeople() {
    const res = await fetch(`/api/people?userId=${user?._id}`)
    const people = await res.json()
    setAvailablePeople(people)
  }

  async function getRoles() {
    const res = await fetch(`/api/options/roles?userId=${user?._id}`)
    const roles = await res.json()
    setAvailableRoles(roles)
  }

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = props.people.map((result) => {
      return (
        <tr key={result.person._id}>
          <td>{result.person.first_name} {result.person.last_name}</td>
          <td>{result.role.role}</td>
          <td><a href={`mailto:${result.person.email}`}>{result.person.email}</a></td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Delete />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  return (
    <div className={props.small ? 'table-wrapper table-wrapper-small' : 'table-wrapper'}>
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
      <div className="table-inputs">
        <select value={selectedPerson} onChange={(e) => setSelectedPerson(e.target.value)}>
          <option disabled={true} value="">Choose person</option>
          {availablePeople && availablePeople.map(e => <option value={e._id} key={e._id}>{e.first_name} {e.last_name}</option>)}
        </select>
        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
          <option disabled={true} value="">Choose role</option>
          {availableRoles && availableRoles.map(e => <option value={e._id} key={e._id}>{e.role}</option>)}
        </select>
        <button><PlusIcon /> Add Person</button>
      </div>
    </div>
  )
}