import styled from '@emotion/styled'
import React from 'react'
import mediaqueries from '../styles/media'
import IconButton from './icons/IconButton'
import Menu from './icons/Menu'
import Close from './icons/Close'
import LogoWrapper from './LogoWrapper'
import PropTypes from 'prop-types'

const Header = ({ navOpen, setNavOpen }) => {
  return (
    <StyledHeader navOpen={navOpen}>
      <HeaderSection>
        <NavIconButton>
          <IconButton
            label='Open Navigation'
            icon={navOpen ? <Close /> : <Menu />}
            size={30}
            onClick={() => {
              setNavOpen(!navOpen)
            }}
          />
        </NavIconButton>
        <LogoWrapper />
      </HeaderSection>
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem 1rem;
  z-index: 5;
  background: ${p => p.theme.colors.header};
  transition: all 0.25s var(--ease-in-out-quad);
  border-bottom: 1px solid ${p => p.theme.colors.borderColor};
  transform: ${p => (p.navOpen ? 'translateX(19rem)' : null)};
  ${mediaqueries.desktop_up`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 1rem 1.2rem;
    transform: translateX(0);

  `};
`

const NavIconButton = styled.div`
  display: flex;
  margin-right: 1rem;
  ${mediaqueries.desktop_up`
    display: none;
  `};
`

const HeaderSection = styled.div`
  display: flex;
  margin: 0;
  text-alight: center;
  align-items: center;
`

Header.propTypes = {
  navOpen: PropTypes.bool,
  setNavOpen: PropTypes.func,
}

export default Header
