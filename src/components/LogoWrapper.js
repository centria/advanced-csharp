import styled from '@emotion/styled'
import { Link } from 'gatsby'
import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

const Logo = () => {
	return (
		// You can change the Logo here by replace the img source
		<StaticImage
			src='../images/Centria-banner.png'
			alt='Centria banner'
			quality={95}
			formats={['AUTO', 'WEBP', 'AVIF']}
		/>
	)
}

const LogoWrapper = () => (
	<StyledLogoWrapper>
		<LogoLink to='/'>
			<Logo />
		</LogoLink>
	</StyledLogoWrapper>
)

const StyledLogoWrapper = styled.div`
	width: 10rem;
	p {
		margin: 0;
		font-size: 1.6rem;
	}
`

const LogoLink = styled(Link)`
	display: block;
	text-decoration: none;
	color: ${p => p.theme.colors.text};
	transition: color ${p => p.theme.transition};
	&:hover,
	&:focus {
		color: ${p => p.theme.colors.primary};
	}
`

export default LogoWrapper
