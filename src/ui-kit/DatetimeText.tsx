import styled from 'styled-components'
import Text from '../ui-kit/Text'
import format from 'date-fns/format'

type Props = {
  datetime: string
  outputFormat: string
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export default function DatetimeText(props: Props) {
  return (
    <Wrapper>
      <Text color="#6c6c6c" size={0.8} weight={600} family="Assistant" align='center'>
        {format(new Date(props.datetime), props.outputFormat)}
      </Text>
    </Wrapper>
  )
}



export function renderDatetimeToTable(props) {
  return (
    <DatetimeText datetime={props.value.toString()} outputFormat="dd MMM yyyy, HH:mm" />
  )
}
