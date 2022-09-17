import React, { useState } from 'react'

const Cell = () => {
  const [columns, setColumns] = useState<number>(0)
  const [rows, setRows] = useState<number>(0)

  return (
    <div>Cell</div>
  )
}

export default Cell