import React from 'react'
import { motion } from 'motion/react'

const CustomButton = ({ type, text, className, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ width: "100%" }}
    >
      <button type={type} className={className} style={{fontFamily: 'Moneygraphy-Rounded'}} onClick={onClick}>{text}</button>
    </motion.div>
  )
}

export default CustomButton