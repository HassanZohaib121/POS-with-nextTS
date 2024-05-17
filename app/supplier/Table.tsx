interface Props {
  id: number
  invoice: string
  name: string
  email: string
  contact: string
  detail: string
}
export default function Table({
  id,
  invoice,
  name,
  email,
  contact,
  detail,
}: Props) {
  return (
    <div>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>id</th>
            <th>Invoice No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>{id}</th>
            <th>{invoice}</th>
            <th>{name}</th>
            <th>{email}</th>
            <th>{contact}</th>
            <th>{detail}</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
