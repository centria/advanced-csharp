/**
 * Implement Gatsby's Node APIs in this file.
 * This will help to access data from mardown files in the content folder.
 * Also help to create page content for doc files in templates folder.
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const startCase = require('lodash/startCase')

// access markdown files with a GraphQL data query
exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(
    `
      {
        allMdx(sort: { fields: frontmatter___nav_order, order: ASC }) {
          edges {
            node {
              fields {
                id
                slug
              }
              tableOfContents
            }
          }
        }
      }
    `,
  )
  if (result.errors) {
    reporter.panic('error loading content', result.errors)
    return
  }
  // creates content for template files
  result.data.allMdx.edges.forEach(({ node }) => {
    actions.createPage({
      path: node.fields.slug ? node.fields.slug : '/',
      component: require.resolve('./src/templates/docs'),
      context: {
        id: node.fields.id,
      },
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions, reporter }) => {
  const { createNodeField } = actions

  if (node.internal.type === 'Mdx') {
    const parent = getNode(node.parent)
    const title = node.frontmatter.title || startCase(parent.name)

    let value = node.frontmatter.slug
    if (!value && parent.relativePath) {
      value = parent.relativePath.replace(parent.ext, '')
    }

    if (!value) {
      reporter.panic(
        `Can not create node with title: ${title} there is no relative path or frontmatter to set the "slug" field`,
      )
      return
    }

    if (value === 'index') {
      value = ''
    }

    // the file name is the slug itself
    createNodeField({
      name: 'slug',
      node,
      value: `/${value}`,
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    })

    createNodeField({
      name: 'title',
      node,
      value: title,
    })
  }
}
