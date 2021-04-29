import * as React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const Resource = props => (
  <div className="resourceBlock">
    <a href={props.url}>
      <h2 className="resourceName">{props.name}</h2>
    </a>
    <p className="resourceDescription">{props.description}</p>
  </div>
)

export default function Resources({ data, location}) {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="Resources" />
      <Bio />
      <p>
        This list may grow and get more organized in the future, but here are some tools and resources that I've found hugely helpful in the past...
      </p>
      <Resource
        name="dataslayer"
        description="This is a tool I use for testing web analytics implementations. I’ve always found it easier to read than other options, and unlike GTM’s Preview mode, the data persists across pages, meaning you can easily tell what event happened last on your previous page."
        url="https://chrome.google.com/webstore/detail/dataslayer/ikbablmmjldhamhcldjjigniffkkjgpo"
      />
      <Resource
        name="regexr"
        description="This is my favorite playground for testing out RegEx (Regular Expressions). I like the way it lets you test against your own text, how it gives you helpful hints about how your RegEx is being interpreted, and the organization and clarity of its cheatsheets."
        url="https://regexr.com/"
      />
      <Resource
        name="regexone"
        description="If you’re not familiar with RegEx, this is a great place to start learning it. RegEx can benefit your work in GA, GTM, Tableau, and even Google Sheets, so it’s worth your time regardless of where you fit into the digital analytics space."
        url="https://regexone.com/"
      />
      <Resource
        name="Simo Ahava"
        description="Simo isn’t a tool, but he is a human being who freely shares his knowledge surrounding digital analytics. I’ve learned a ton from Simo, so it would be remiss of me not to share a link to his site."
        url="https://www.simoahava.com/"
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
      }
    }
  }
`
