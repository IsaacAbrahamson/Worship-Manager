import { PersonInterface } from "../types";
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import Modal from '../components/Modal'
import UserContext from '../UserContext'
import { ChangeEvent, useContext, useState } from "react";

interface Props {
  people: PersonInterface[]
  setPeople: React.Dispatch<React.SetStateAction<PersonInterface[] | undefined>>
}

export default function PersonTable(props: Props) {
  const { user } = useContext(UserContext)
  const [person, setPerson] = useState<PersonInterface>()
  const [showModal, setShowModal] = useState<boolean>(false)

  function createRows(): JSX.Element[] {
    const peopleRows: JSX.Element[] = props.people.map((person: PersonInterface) => {
      return (
        <tr key={person._id}>
          <td>{person.first_name}</td>
          <td>{person.last_name}</td>
          <td><a href={`mailto:${person.email}`}>{person.email}</a></td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit onClick={() => createModal(person)} />
              <Delete onClick={() => deletePerson(person._id)} />
            </div>
          </td>
        </tr>
      )
    })
    return peopleRows
  }

  async function deletePerson(id: string) {
    const res = await fetch('/api/people/delete', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })

    if (res.status === 200) {
      props.setPeople(prev => prev?.filter(e => e._id !== id))
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  function createModal(person: PersonInterface) {
    setPerson(person)
    setShowModal(true)
  }

  async function saveModal() {
    const res = await fetch('/api/people/update', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(person)
    })

    if (res.status === 200) {
      const updatedPerson: PersonInterface = await res.json()
      // Update service types with new value
      props.setPeople(prev => {
        return prev!.map(e => {
          if (e._id !== updatedPerson._id) return e
          return {
            ...e,
            first_name: updatedPerson.first_name,
            last_name: updatedPerson.last_name,
            email: updatedPerson.email
          }
        })
      })
      setShowModal(false)
    } else {
      const err = await res.text()
      alert(err)
    }
  }

  function updatePerson(e: ChangeEvent<HTMLInputElement>) {
    setPerson(prev => {
      return {
        ...prev!,
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <>
      {person && (
        <Modal
          title='Update Person'
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={saveModal}
        >
          <form>
            <label htmlFor="first_name">First Name</label>
            <input type="text" name="first_name" value={person.first_name} onChange={updatePerson} />
            <label htmlFor="last_name">Last Name</label>
            <input type="text" name="last_name" value={person.last_name} onChange={updatePerson} />
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={person.email} onChange={updatePerson} />
          </form>
        </Modal>
      )}

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
    </>
  )
}