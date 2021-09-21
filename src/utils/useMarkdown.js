import { graphql, useStaticQuery } from 'gatsby'

const useMarkdown = title => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { hidden: { eq: true } } }) {
        nodes {
          body
          fields {
            title
          }
        }
      }
    }
  `)

  const mdx = data.allMdx.nodes.filter(item => item.fields.title === title)[0]

  return mdx
}

export default useMarkdown
