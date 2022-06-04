import styled from "styled-components";
import { Outlet } from 'react-router-dom'
import NavBar from '../ui-kit/NavBar'



const Wrapper = styled.div`
  height: 100%;
  display: flex;
`

const ContentWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`

export default function MenuLayout() {
    return <Wrapper>
        <NavBar/>
        <ContentWrapper>
        <Outlet />
        </ContentWrapper>
    </Wrapper>
}