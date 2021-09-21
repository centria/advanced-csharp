/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import React from 'react'
import GlobalContextProvider from './src/context/GlobalContextProvider'

export const wrapRootElement = ({ element }) => (
	<GlobalContextProvider>{element}</GlobalContextProvider>
)
