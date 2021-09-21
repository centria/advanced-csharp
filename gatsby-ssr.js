/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require('react')
const GlobalContextProvider = require('./src/context/GlobalContextProvider')
	.default

export const wrapRootElement = ({ element }) => (
	<GlobalContextProvider>{element}</GlobalContextProvider>
)
