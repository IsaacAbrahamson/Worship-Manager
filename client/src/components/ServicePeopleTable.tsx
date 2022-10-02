import { EventInterface, PersonInterface } from "../types"
import { ReactComponent as PlusIcon } from '../assets/plus.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  people: {
    role: { role: string },
    person: PersonInterface
  }[],
  small: boolean
}

export default function PeopleEventsTable(props: Props) {
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
        <select name="personSelect">
          <option value="" selected>Choose person...</option>
        </select>
        <select name="roleSelect">
          <option value="" selected>Choose role...</option>
        </select>
        <button><PlusIcon /> Add Person</button>
      </div>
    </div>
  )
}