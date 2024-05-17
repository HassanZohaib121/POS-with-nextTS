'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Table from './Table'

interface Supplier {
  id: number
  invoice: string
  name: string
  email: string
  contact: string
  detail: string
}

const SupplierPage = () => {
  const [supplier, setSupplier] = useState<Supplier[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSupplier()
  }, [])

  const fetchSupplier = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/supplier`)
      if (!res.ok) {
        throw new Error('Failed to fetch Supplier')
      }
      const supplierData: Supplier[] = await res.json()
      setSupplier(supplierData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-row space-x-96">
        <h1 className="">Supplier</h1>
      </div>
      {error ? (
        <p> Error: {error}</p>
      ) : (
        <div className="flex flex-row space-x-5 mt-10">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Invoice No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Detail</th>
              </tr>
            </thead>
            {supplier.map(({ id, invoice, name, email, contact, detail }) => (
              <tbody key={id}>
                <tr>
                  <th>
                    <input type="checkbox" className="checkbox" />
                  </th>
                  <th>{invoice}</th>
                  <th>{name}</th>
                  <th>{email}</th>
                  <th>{contact}</th>
                  <th>{detail}</th>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      )}
    </>
  )
}

export default SupplierPage
