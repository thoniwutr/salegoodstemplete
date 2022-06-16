import styled from 'styled-components'
import Text from './Text'

export type WordingType = 'CF' | 'CC' 

type Props = {
  wording: WordingType
}

const Wrapper = styled.div<Props>`
  padding: 4px 14px;
  inline-size: min-content;
  height: 25px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => {
    if (props.wording === 'CF') {
      return '#03a05d'
    } else if (props.wording === 'CC') {
      return '#f65129'
    } else {
      return '#ffffff'
    }
  }};
  background-color: ${(props) => {
    if (props.wording === 'CF') {
      return '#c1ffe5'
    }  else if (props.wording === 'CC') {
      return '#ffe1d9'
    } else {
      return '#ffffff'
    }
  }};
`

export default function WordingStatus(props: Props) {
  return (
    <Wrapper wording={props.wording}>
      <Text size={0.8} weight={600} family="Assistant">
        {props.wording}
      </Text>
    </Wrapper>
  )
}
