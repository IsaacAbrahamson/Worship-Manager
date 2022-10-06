import { PersonInterface } from "../types";
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'

interface Props {
  people: PersonInterface[]
}

export default function PersonTable(props: Props) {
  function createRows(): JSX.Element[] {
    const peopleRows: JSX.Element[] = props.people.map((person: PersonInterface) => {
      return (
        <tr key={person._id}>
          <td>{person.first_name}</td>
          <td>{person.last_name}</td>
          <td><a href={`mailto:${person.email}`}>{person.email}</a></td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit />
              <Delete onClick={() => deletePerson(person._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return peopleRows
  }

  async function deletePerson(id: string) {
    console.log(id)
  }

  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
    </div>
  )
}