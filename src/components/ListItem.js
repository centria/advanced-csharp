import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const ListItem = ({ location, item }) => {
	return (
		<ListItemLink href={location.pathname + item.url}>
			{item.title}
		</ListItemLink>
	)
}

const ListItemLink = styled.a`
	display: inline-block;
	padding: 0.2rem 0;
	width: 100%;
	color: ${p => p.theme.colors.text};
	text-decoration: none;
	transition: color ${p => p.theme.transition};
	&:hover,
	&:focus {
		color: ${p => p.theme.colors.primary};
	}
`
ListItem.propTypes = {
	location: PropTypes.object.isRequired,
	item: PropTypes.object.isRequired,
}

export default ListItem
