import styled from '@emotion/styled'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Layout from '../components/Layout'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { MDXProvider } from '@mdx-js/react'
import { Exercise, Note } from '../components/UIComponents'
import { Link } from 'gatsby'
import { Image, AspectImage, Embed } from 'theme-ui'

const DocsTemplate = ({ data, location }) => {
  const { mdx } = data

  const shortcodes = { Image, AspectImage, Embed, Exercise, Note, Link }

  return (
    <Layout tableOfContents={mdx.tableOfContents} location={location}>
      <Helmet title={mdx.frontmatter.title} />
      <Heading>{mdx.frontmatter.title}</Heading>
      <MDXProvider components={shortcodes}>
        <MDXRenderer>{mdx.body}</MDXRenderer>
      </MDXProvider>
    </Layout>
  )
}

const Heading = styled.h1`
  padding-top: 0;
  margin-top: 0;
  &::before {
    display: none !important;
  }
`

export const pageQuery = graphql`
  query($id: String!) {
    mdx(fields: { id: { eq: $id } }) {
      body
      tableOfContents
      frontmatter {
        title
      }
    }
  }
`
DocsTemplate.propTypes = {
  data: PropTypes.shape({
    mdx: PropTypes.object.isRequired,
  }).isRequired,
  location: PropTypes.object.isRequired,
}

export default DocsTemplate
