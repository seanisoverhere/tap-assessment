import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { animate, useMotionValue } from 'framer-motion'
import Cell from '@/components/Cell'
import { CELL_SIZE } from '@/utils/constants'
import { useDebouncedCallback } from 'use-debounce'

const Grid = () => {
  const [columns, setColumns] = useState<number>(0)
  const [rows, setRows] = useState<number>(0)
  const [cellCount, setCellCount] = useState<number>(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const calculateGrid = useDebouncedCallback(() => {
    const columnCount = Math.ceil(window.innerWidth / CELL_SIZE)
    const rowCount = Math.ceil(window.innerHeight / CELL_SIZE)

    setColumns(columnCount)
    setRows(rowCount)

  }, 200)

  useEffect(() => {
    calculateGrid()
    window.addEventListener('resize', calculateGrid)

    return () => {
      window.removeEventListener('resize', calculateGrid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useMemo(() => {
    setCellCount(columns * rows)
  }, [columns, rows])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      animate(mouseX, e.clientX)
      animate(mouseY, e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='grid-container' style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {[...Array(cellCount)].map((_, i: number) => (
        <Cell key={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </div>
  )
}

export default Grid