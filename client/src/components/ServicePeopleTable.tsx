import { RoleTypesInterface, PersonInterface, ServicePersonInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import UserContext from '../UserContext'
import { useContext, useEffect, useState } from "react"

interface Props {
  small: boolean
  id: string
}

export default function PeopleEventsTable(props: Props) {
  const { user } = useContext(UserContext)
  const [people, setPeople] = useState<ServicePersonInterface[]>()
  const [selectedPerson, setSelectedPerson] = useState('')
  const [selectedRole, setSelectedRole] = useState('')
  const [availablePeople, setAvailablePeople] = useState<PersonInterface[]>()
  const [availableRoles, setAvailableRoles] = useState<RoleTypesInterface[]>()

  useEffect(() => {
    getPeople()
    getAvailablePeople()
    getAvailableRoles()
  }, [])

  async function getPeople() {
    const res = await fetch(`/api/services/${props.id}/people`)
    const people = await res.json()
    setPeople(people)
  }

  async function getAvailablePeople() {
    const res = await fetch(`/api/people?userId=${user?._id}`)
    const people = await res.json()
    setAvailablePeople(people)
  }

  async function getAvailableRoles() {
    const res = await fetch(`/api/options/roles?userId=${user?._id}`)
    const roles = await res.json()
    setAvailableRoles(roles)
  }

  function createRows(): JSX.Element[] {
    const rows: JSX.Element[] = people!.map((result) => {
      return (
        <tr key={result._id}>
          <td>{result.person.first_name} {result.person.last_name}</td>
          <td>{result.role.role}</td>
          <td><a href={`mailto:${result.person.email}`}>{result.person.email}</a></td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Delete onClick={() => deletePerson(result._id!)} />
            </div>
          </td>
        </tr>
      )
    })
    return rows
  }

  async function addPerson() {
    if (!selectedPerson || !selectedRole) return

    const res = await fetch(`/api/services/${props.id}/new/person`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        personId: selectedPerson,
        roleId: selectedRole
      })
    })

    if (res.status === 200) {
      getPeople()
    } else {
      alert('Could not add event')
    }
  }

  async function deletePerson(personId: string) {
    const res = await fetch(`/api/services/${props.id}/delete/person`, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ personId })
    })

    if (res.status === 200) {
      setPeople(prev => prev?.filter(e => e._id !== personId))
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
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th></th>
          </tr>
          {people && createRows()}
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
        <button onClick={addPerson}><PlusIcon /> Add Person</button>
      </div>
    </div>
  )
}