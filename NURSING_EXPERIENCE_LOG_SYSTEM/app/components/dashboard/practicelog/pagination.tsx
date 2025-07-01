'use client'

import { FC } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationControlsProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  Allpage: number
  search : string
  status : string
}

const PaginationControls: FC<PaginationControlsProps> = (
  {
    hasNextPage,
    hasPrevPage,
    Allpage,
    search,
    status
  }
) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'

  return (
    <div className='flex gap-2'>
      <button
        className='bg-blue-500 text-white p-1 rounded-md'
        disabled={!hasPrevPage}
        onClick={() => {
          router.replace(`?search=${search}&status=${status}&page=${Number(page) - 1}`)
        }}>
        prev page
      </button>

      <div className=' text-gray-500'>
        {page} / {Math.ceil(Allpage / 7)}
      </div>

      <button
        className='bg-blue-500 text-white p-1 rounded-md'
        disabled={!hasNextPage}
        onClick={() => {
          router.replace(`?search=${search}&status=${status}&page=${Number(page) + 1}`)
        }}>
        next page
      </button>
    </div>
  )
}
export default PaginationControls