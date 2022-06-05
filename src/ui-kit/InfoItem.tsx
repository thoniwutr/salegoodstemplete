import React from 'react'
import styled from 'styled-components'
import Text from '../ui-kit/Text'

type Props = {
  title: string
  detail: React.ReactNode
  maxWidth?: number
  padding?: number
  marginTop?: number
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`

const Content = styled.div`
  margin-top: 6px;
`

export default function InfoItem(props: Props) {
  return (
    <Wrapper>
      <Text family="Assistant" size="1" color="#888888">
        {props.title}
      </Text>
      <Content>{props.detail}</Content>
    </Wrapper>
  )
}
