import styled from 'styled-components'

import Loading from './Loading'

const Wrapper = styled.div`
  display: grid;
  place-content: center;
  height: 100%;
`

export default function LoadingScreen() {
  return (
    <Wrapper>
      <Loading color="red" width={70} height={70} />
    </Wrapper>
  )
}
