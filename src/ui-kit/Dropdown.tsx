import React from 'react'

import styled from 'styled-components/macro'
import Input from '../ui-kit/Input'

type Props = {
  error?: boolean
  children: React.ReactNode
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = styled.select<Pick<Props, 'error'>>`
  ${Input}
  border: ${(props) => props.error && `2px solid red`};
  font-family: 'Assistant';
  /* Override style in Safari */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E') !important;
  background-repeat: no-repeat, repeat !important;
  background-position: 95% 55% !important;
  background-size: 8px auto, 100% !important;
`

export default function Dropdown(props: Props) {
  return <Select {...props}>{props.children}</Select>
}

type DropdownItemProps = {
  value: string
  displayName?: string
} & React.OptionHTMLAttributes<HTMLOptionElement>

function DropdownItem(props: DropdownItemProps) {
  const { displayName, ...restProps } = props
  return <option {...restProps}>{props.displayName || props.value}</option>
}

Dropdown.Item = DropdownItem
