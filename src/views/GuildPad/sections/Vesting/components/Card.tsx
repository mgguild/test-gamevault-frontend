import React from 'react'

interface Socials { 
 [key: string] : string
}

interface Props {
  name: string
  description: string  
  socials: Socials
}

const Card: React.FC<{details: Props}> = ({details}) => {
  const {name, description, socials } = details;
  return (
    <div>sample</div>
  )
}

export default Card;