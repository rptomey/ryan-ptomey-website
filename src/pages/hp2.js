import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Home = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const blogs = data.blogPosts.nodes
  const portfolios = data.portfolioProjects.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Homepage" />
      <Bio />
      <section class="hp-featured-grid">
        <section class="hp-featured-box">
          <h2>Latest Blog Posts</h2>
          <ol style={{ listStyle: `none` }}>
            {blogs.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              const pagePath = post.fields.slug

              return (
                <li key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={pagePath} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{post.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>
        <section class="hp-featured-box">
          <h2>Latest Projects</h2>
          <ol style={{ listStyle: `none` }}>
            {portfolios.map(post => {
              const title = post.frontmatter.title || post.fields.slug
              const pagePath = post.fields.slug

              return (
                <li key={post.fields.slug}>
                  <article
                    className="post-list-item"
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <Link to={pagePath} itemProp="url">
                          <span itemProp="headline">{title}</span>
                        </Link>
                      </h2>
                      <small>{post.frontmatter.date}</small>
                    </header>
                    <section>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: post.frontmatter.description || post.excerpt,
                        }}
                        itemProp="description"
                      />
                    </section>
                  </article>
                </li>
              )
            })}
          </ol>
        </section>
      </section>
    </Layout>
  )
}

export default Home

export const pageQuery = graphql`
query {
  site {
    siteMetadata {
      title
    }
  }
  portfolioProjects: allMarkdownRemark(
    filter: {fields: {slug: {regex: "/portfolio/"}}}
    sort: {fields: frontmatter___date, order: DESC}
    limit: 3
  ) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
  blogPosts: allMarkdownRemark(
    filter: {fields: {slug: {regex: "/blog/"}}}
    sort: {fields: frontmatter___date, order: DESC}
    limit: 3
  ) {
    nodes {
      excerpt
      fields {
        slug
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
      }
    }
  }
}
`
