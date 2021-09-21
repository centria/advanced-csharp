import React from 'react'
import styled from '@emotion/styled'
import Layout from '../components/Layout'
import { StaticImage } from 'gatsby-plugin-image'

const NotFoundPage = () => (
	<Layout tableOfContents={{}} location={{}}>
		<Header>404: Not Found</Header>

		<StaticImage
			src='../images/error.png'
			alt='Centria banner'
			quality={95}
			formats={['AUTO', 'WEBP', 'AVIF']}
		/>
		<p>You just hit a route that doesn&#39;t exist...</p>
	</Layout>
)

const Header = styled.div`
	font-size: 1.5rem;
	color: ${p => p.theme.colors.primary};
`

export default NotFoundPage
