import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Cell from '@/components/Cell'
import { CELL_SIZE } from '@/utils/constants'

const Grid = () => {
  const [columns, setColumns] = useState<number>(0)
  const [rows, setRows] = useState<number>(0)

  useEffect(() => {
    const calculateGrid = () => {
      const columnCount = Math.ceil(window.innerWidth / CELL_SIZE)
      const rowCount = Math.ceil(window.innerHeight / CELL_SIZE)

      setColumns(columnCount)
      setRows(rowCount)
    }

    calculateGrid()
    window.addEventListener('resize', calculateGrid)

    return () => {
      window.removeEventListener('resize', calculateGrid)
    }

  }, [])

  return (
    <div className='grid-container' style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {Array.from({ length: columns * rows }).map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}

export default Grid