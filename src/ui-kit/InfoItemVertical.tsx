import React from 'react'
import styled from 'styled-components'
import Text from '../ui-kit/Text'

type Props = {
  title: string
  titleColor?: string
  detail: React.ReactNode
  maxWidth?: number
  padding?: number
  marginTop?: number
}

const Wrapper = styled.div`
  padding: 20px 0 0 0;
  background-color: white;
  width: 100%;
  justify-content: space-between;
  vertical-align: middle;
  display: flex;
`


const TitleContent = styled.div`
  width: 220px;
`

const Content = styled.div`
 overflow-wrap: break-word;
 width: 440px;
`

export default function InfoItemVertical(props: Props) {
  return (
    <Wrapper>
      <TitleContent>
        <Text family="Assistant" size={1} color={props.titleColor ? props.titleColor : '#888888'} >
          {props.title}
        </Text>
      </TitleContent>
      <Content>{props.detail}</Content>
    </Wrapper>
  )
}
