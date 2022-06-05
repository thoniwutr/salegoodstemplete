import styled from 'styled-components/macro'

type Props = {
  inputColor?: string
  borderless?: boolean
  error: boolean
  align?: 'left' | 'right' | 'center'
  padding?: string
  width?: string
  family?: 'LexendDeca' | 'Assistant' | 'IBMPlex' | undefined
}

const Input = styled.input<Props>`
  width: ${(props) => props.width};
  height: 40px;
  border-radius: 5px;
  background-color: #ffffff;
  border: 1px solid #b5b5b5;
  font-family: LexendDeca;
  font-size: 1rem;
  text-align: ${(props) => props.align};
  padding: ${(props) => props.padding};
  color: ${(props) => props.inputColor};
  border-color: ${(props) => props.error && 'red'};
  font-family: ${(props) => props.family};

  &:hover {
    cursor: pointer;
  }
`

export default Input
