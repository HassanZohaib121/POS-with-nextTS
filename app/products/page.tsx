'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Product {
  id: number
  barcode: number
  name: string
  price: number
  image: string
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
      if (!res.ok) {
        throw new Error('Failed to fetch products')
      }
      const productsData: Product[] = await res.json()
      setProducts(productsData)
    } catch (error: any) {
      setError(error.message)
    }
  }

  return (
    <>
      <div className="flex flex-row space-x-96"></div>
      {error ? (
        <p> Error: {error}</p>
      ) : (
        <div className="flex flex-row space-x-5 mt-10">
          {products.map(({ id, barcode, name, price, image }) => (
            <div key={id} className="card w-96 bg-base-100 shadow-xl">
              {image && (
                <figure>
                  <Image
                    src={`${image}`}
                    alt="Shoes"
                    width={200}
                    height={200}
                  />
                </figure>
              )}
              <div className="card-body text-white">
                {barcode && <p>Barcode: {barcode}</p>}
                {name && <h2 className="card-title">Name: {name}</h2>}
                {price && (
                  <p className=" text-white">
                    Price: <strong>Rs. {price}</strong>
                  </p>
                )}
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ProductPage
