import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Anchor = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    // <div style={{ margin: '5px' }}></div>
    <div style={{ margin: '5px 10px 0px 0px' }}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    </div>
  )
}

export default Anchor
