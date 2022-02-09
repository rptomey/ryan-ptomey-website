const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath.includes(`content/blog`)) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `/blog${value}`,
    })
  }

  if (node.internal.type === `MarkdownRemark` && node.fileAbsolutePath.includes(`content/portfolio`)) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `/portfolio${value}`,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const { createRedirect } = actions

  createRedirect({
    fromPath: `https://ryan.ptomey.net/`,
    toPath: `https://ryanptomey.com/`
  })

  // Define template for blog posts and portfolio pages
  const blogPostTemplate = path.resolve(`./src/templates/blog-post.js`)
  const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`)

  // Get all markdown files
  const result = await graphql(
    `
      query {
        blogs: allMarkdownRemark (
          sort: { fields: [frontmatter___date], order: DESC}
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/content/blog/" } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
        portfolios: allMarkdownRemark (
          sort: { fields: [frontmatter___date], order: DESC}
          limit: 1000
          filter: { fileAbsolutePath: { regex: "/content/portfolio/" } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `ERROR: Loading "createPages" query.`,
      result.errors
    )
    return
  }

  const blogs = result.data.blogs.edges
  const portfolios = result.data.portfolios.edges

  blogs.forEach(({ node }) => {

    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: { id: node.id },
    })
  })

  portfolios.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: portfolioTemplate,
      context: { id: node.id },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
