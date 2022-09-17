import React, { useState, useEffect, useRef } from 'react'
import { motion, MotionValue, useTransform } from 'framer-motion'
import { CELL_SIZE } from '@/utils/constants'

type CellProps = {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}

const Cell = ({ mouseX, mouseY }: CellProps) => {
  const [position, setPosition] = useState<Array<number>>([0, 0])
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const x = rect.left + CELL_SIZE / 2
    const y = rect.top + CELL_SIZE / 2

    setPosition([x, y])

  }, [ref.current])

  const direction = useTransform<number, number>(
    [mouseX, mouseY],
    ([newX, newY]) => {
      const diffY = newY - position[1];
      const diffX = newX - position[0];
      const angleRadians = Math.atan2(diffY, diffX);
      const angleDegrees = Math.floor(angleRadians * (180 / Math.PI));
      return angleDegrees;
    }
  );

  return (
    <div className="cell-container" ref={ref}>
      <motion.div style={{ rotate: direction }}>👉🏻</motion.div>
    </div>)
}

export default Cell