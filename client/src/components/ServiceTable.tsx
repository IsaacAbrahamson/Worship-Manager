import { ServiceInterface } from "../types"
import { ReactComponent as Edit } from '../assets/edit.svg'
import { ReactComponent as Delete } from '../assets/delete.svg'
import date from 'date-and-time'

interface Props {
  services: ServiceInterface[]
}

export default function ServiceTable(props: Props) {
  function createRows(): JSX.Element[] {
    const serviceRows: JSX.Element[] = props.services.map((service: ServiceInterface) => {
      const color = service.type.color
      const background = service.type.background
      return (
        <tr key={service._id}>
          <td>{date.format(new Date(service.date), 'M/D/YY')}</td>
          <td>{date.format(new Date(service.date), 'hh:mm A')}</td>
          <td>
            <div className="type-wrapper" style={{ color, background }}>{service.type.type}</div>
          </td>
          <td>{service.theme}</td>
          <td className="table-btns">
            <div className="table-btns-wrapper">
              <Edit />
              <Delete />
            </div>
          </td>
        </tr>
      )
    })
    return serviceRows
  }

  return (
    <div className="services-table">
      <table>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Type</th>
            <th>Theme</th>
            <th></th>
          </tr>
          {createRows()}
        </tbody>
      </table>
    </div>
  )
}