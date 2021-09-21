import styled from '@emotion/styled'
import { graphql, useStaticQuery } from 'gatsby'
import { calculateTreeData } from '../../utils/dataTree'
import React, { useState } from 'react'
import NavItem from './NavItem'

const Navigation = () => {
  const result = useStaticQuery(graphql`
    query {
      allMdx(
        filter: { frontmatter: { hidden: { ne: true } } }
        sort: { fields: frontmatter___nav_order, order: ASC }
      ) {
        edges {
          node {
            fields {
              title
              slug
            }
            tableOfContents
          }
        }
      }
    }
  `)

  const { allMdx } = result
  const [treeData] = useState(() => {
    return calculateTreeData(allMdx.edges)
  })

  return (
    <NavList>
      <NavItem {...treeData} />
    </NavList>
  )
}

const NavList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`

export default React.memo(Navigation)
