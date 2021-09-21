import styled from '@emotion/styled'
import React from 'react'
import UpArrow from './icons/UpArrow'
import DownArrow from './icons/DownArrow'
import Icon from './icons/Icon'
import PropTypes from 'prop-types'

const ButtonCollapse = ({ onClick, isCollapsed }) => {
  return (
    <StyledButtonCollapse
      onClick={onClick}
      aria-label='Toggle Subnavigation'
      title='Toggle Subnavigation'
    >
      {isCollapsed ? (
        <Icon icon={<DownArrow />} size={24} />
      ) : (
        <Icon icon={<UpArrow />} size={24} />
      )}
    </StyledButtonCollapse>
  )
}

const StyledButtonCollapse = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  padding: 0 0.4rem;
  height: 37px;
  background: none;
  border: 0;
  color: ${p => p.theme.colors.text};
  cursor: pointer;
  font-size: 1rem;
`
ButtonCollapse.propTypes = {
  onClick: PropTypes.func.isRequired,
  isCollapsed: PropTypes.bool,
}

export default ButtonCollapse
