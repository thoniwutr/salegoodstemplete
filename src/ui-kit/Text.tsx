import React from 'react'
import styled from 'styled-components'

type Props = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
  size?: string
  // Better fixed color for this system
  color?: string
  family?: 'LexendDeca' | 'Assistant' | 'IBMPlex' | undefined
  weight?: 'bold' | 'lighter' | number
  transform?: 'uppercase' | 'lowercase' | 'capitalize'
  letterSpacing?: number
  align?: 'left' | 'right' | 'center'
  children: React.ReactNode
  display?: 'block' | 'inline-block' | 'inline' | 'flex'
  lineHeight?: number
  marginLeft?: number
  mWidth?: number
  padding?: string
}

const Text = styled.span<Props>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size}rem;
  font-family: ${(props) => props.family};
  font-weight: ${(props) => props.weight};
  text-transform: ${(props) => props.transform};
  letter-spacing: ${(props) => props.letterSpacing}px;
  text-align: ${(props) => props.align};
  display: ${(props) => props.display};
  line-height: ${(props) => props.lineHeight};
  margin-left: ${(props) => props.marginLeft}px;
  padding: ${(props) => props.padding};
`

export default Text

