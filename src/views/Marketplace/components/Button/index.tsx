import { Button as MGGButton } from '@metagg/mgg-uikit'
import styled from 'styled-components'

const Button = styled(MGGButton)<{ bg?: string; shadow?: boolean }>`
  min-width: 200px;
  border-radius: 3rem;
  color: black;
  background-color: ${(props) => props.bg};
  &:hover {
    background-color: ${(props) => props.bg}!important;
    color: white;
  }
  ${(props) =>
    props.shadow &&
    `
  box-shadow: -1px 7px 17px 0px rgba(253,218,0,0.33);
-webkit-box-shadow: -1px 7px 17px 0px rgba(253,218,0,0.33);
-moz-box-shadow: -1px 7px 17px 0px rgba(253,218,0,0.33);`}}
`

export default Button
