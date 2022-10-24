import React from 'react'
import styled from 'styled-components'

const Input = ({handleChange, name, defaultValue, inputType='number', min, max }: {name?: string; defaultValue?: number; inputType?: string; min?: number; max?: number;handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <StyledInput onChange={handleChange} name={name} type={inputType} placeholder={defaultValue.toString()} min={min} max={max} />
  )
}

export default Input;

const StyledInput = styled.input`
  background-color: transparent;
  text-align: center;
  border: 1px solid ${({theme}) => theme.colors.MGG_accent2};
  height: 5vh;
  width: 100%;
  font-size: 1.5em;
  padding: 5px;
  color: ${({theme}) => theme.colors.text};
  &:focus {
    outline: none;
  }

  &[type=range] {
    -webkit-appearance: none;
    margin: 10px 0;
    border: none;
  }
  
  &[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #796317;
    background: #FDDA00;
    border-radius: 5px;
    border: 1px solid #796317;
  }
  &[type=range]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #796317;
    height: 25px;
    width: 25px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -8.5px;
  }
  &[type=range]:focus::-webkit-slider-runnable-track {
    background: #FDDA00;
  }
  &[type=range]::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #796317;
    background: #FDDA00;
    border-radius: 5px;
    border: 1px solid #796317;
  }
  &[type=range]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #796317;
    height: 25px;
    width: 25px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
  }
  &[type=range]::-ms-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }
  &[type=range]::-ms-fill-lower {
    background: #FDDA00;
    border: 1px solid #796317;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #796317;
  }
  &[type=range]::-ms-fill-upper {
    background: #FDDA00;
    border: 1px solid #796317;
    border-radius: 10px;
    box-shadow: 1px 1px 1px #796317;
  }
  &[type=range]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #000000;
    border: 1px solid #796317;
    height: 25px;
    width: 25px;
    border-radius: 50px;
    background: #FFFFFF;
    cursor: pointer;
  }
  &[type=range]:focus::-ms-fill-lower {
    background: #FDDA00;
  }
  &[type=range]:focus::-ms-fill-upper {
    background: #FDDA00;
  }
`

Input.defaultProps = {
  name: '',
  inputType: 'number',
  defaultValue: 0,
  min: 0,
  max: 100,
  handleChange: () => null, 
}