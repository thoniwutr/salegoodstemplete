import React, { ButtonHTMLAttributes } from 'react'
import styled from 'styled-components/macro'

import Loading from './Loading'

type ButtonVariant = 'primary' | 'secondary' | 'danger'
type Props = {
  variant: ButtonVariant
  btnLoading?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const BaseButton = styled.button`
  height: 40px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  border-width: 0;
  border-radius: 4px;
  color: white;
  font-family: Assistant;
  padding: 10px 0;
  cursor: pointer;

  &:disabled {
    background-color: #cbcbcb;
  }
`

const PrimaryButton = styled(BaseButton)`
  background-color: #2c46b5;

  &:hover:not(:disabled) {
    background-color: #00187e;
  }
`

const SecondaryButton = styled(BaseButton)`
  background-color: white;
  border: 1px solid #2c46b5;
  color: #2c46b5;

  &:hover:not(:disabled) {
    background-color: rgba(180, 194, 255, 0.5);
  }
`

const DangerButton = styled(BaseButton)`
  background-color: #f65129;

  &:hover:not(:disabled) {
    background-color: #e23004;
  }
`

const generateButtonWrapper = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return PrimaryButton
    case 'danger':
      return DangerButton
    case 'secondary':
      return SecondaryButton
  }
}

export default function Button(props: Props) {
  const { variant = 'primary', children, btnLoading } = props

  const Wrapper = generateButtonWrapper(variant)

  return (
    <Wrapper {...props}>
      {btnLoading ? <Loading width={10} height={10} /> : children}
    </Wrapper>
  )
}

export const WhiteButton = styled.button<{
  width: string
  margin: string
  display: string
}>`
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin};
  display: ${(props) => props.display};
  height: 42px;
  font-family: 'Assistant';
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  justify-content: center;
  text-align: center;
  align-items: center;
  border: 2px solid #2c46b5;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fff;
  color: #2c46b5;
  &:hover {
    background-color: rgba(180, 194, 255, 0.5);
    border: 2px solid #2c46b5;
    color: #2c46b5;
  }
`

export const BlueButton = styled.button<{ width: string; margin: string }>`
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin};
  height: 40px;
  font-family: 'Assistant';
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  border: 2px solid #2c46b5;
  border-radius: 4px;
  cursor: pointer;
  background-color: #2c46b5;
  color: #ffffff;
  &:hover {
    background-color: rgb(0, 29, 160);
    border: 2px solid rgb(0, 29, 160);
    color: #ffffff;
  }
  &:disabled {
    border: 1px solid #acacac;
    background-color: #e4e4e4;
    color: #a1a1a1;
  }
`

export const OrderStatusButton = styled.button<{ width: string; margin: string }>`
  width: ${(props) => props.width}px;
  margin: ${(props) => props.margin};
  height: 40px;
  font-family: 'Assistant';
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.31;
  letter-spacing: normal;
  text-align: center;
  border-radius: 4px;
  cursor: pointer;
  color: black;
  &:hover {
    background-color: rgb(0, 29, 160);
    border: 2px solid rgb(0, 29, 160);
    color: #ffffff;
  }
  &:disabled {
    border: 1px solid #acacac;
    background-color: #e4e4e4;
    color: #a1a1a1;
  }
`
