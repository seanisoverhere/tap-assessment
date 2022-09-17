import React from 'react'
import { motion } from 'framer-motion'

const QueryContainer = () => {
  return (
    <motion.div className='query-container' whileHover={{
      scale: 1.02,
      transition: { duration: 0.2 },
    }}>
      <div className="relative z-0 w-full group">
        <input
          type="text"
          name='url'
          className="input-form peer"
        />
        <label htmlFor="url" className="input-label">
          Enter your URL
        </label>
      </div></motion.div>
  )
}

export default QueryContainer