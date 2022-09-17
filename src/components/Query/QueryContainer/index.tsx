import React from 'react'
import { motion } from 'framer-motion'

const QueryContainer = () => {
  return (
    <motion.div className='query-container' whileHover={{
      scale: 1.02,
      transition: { duration: 0.2 },
    }}>Query Container</motion.div>
  )
}

export default QueryContainer