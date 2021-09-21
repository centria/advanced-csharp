/**
 * creates context to track of the Leftsidebar open state
 *
 */

import React, { useReducer } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { calculateTreeData } from '../utils/dataTree'

export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

let initialState = {
	collapsed: {},
}

function reducer(state, action) {
	switch (action.type) {
		case 'TOGGLE_NAV_COLLAPSED':
			return {
				...state,
				collapsed: {
					...state.collapsed,
					[action.url]: !state.collapsed[action.url],
				},
			}
		default:
			return {
				...state,
			}
	}
}

const GlobalContextProvider = ({ children }) => {
	const result = useStaticQuery(graphql`
		query {
			allMdx(sort: { fields: frontmatter___nav_order, order: ASC }) {
				edges {
					node {
						fields {
							title
							slug
						}
					}
				}
			}
		}
	`)

	const { allMdx } = result
	const treeData = calculateTreeData(allMdx.edges)
	const contentUrls = treeData.items.map(item => item.url)

	// set all contents collapsed state to true
	const contentsObj = contentUrls.reduce(
		(accu, url) => ({
			...accu,
			[url]: true,
		}),
		{},
	)

	initialState.collapsed = contentsObj

	const [state, dispatch] = useReducer(reducer, initialState)
	return (
		<GlobalStateContext.Provider value={state}>
			<GlobalDispatchContext.Provider value={dispatch}>
				{children}
			</GlobalDispatchContext.Provider>
		</GlobalStateContext.Provider>
	)
}

export default GlobalContextProvider
