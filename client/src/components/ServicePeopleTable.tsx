import { EventInterface, PersonInterface } from "../types"
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  people: {
    role: { role: string },
    person: PersonInterface
  }[]
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
    <div className="table-wrapper">
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
    </div>
  )
}