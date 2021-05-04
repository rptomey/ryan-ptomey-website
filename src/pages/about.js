import * as React from "react"
import { graphql } from "gatsby"
import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { StaticImage } from "gatsby-plugin-image"

export default function About({ data, location}) {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title="About">
      <Seo title="About" />
      <Bio />
      <StaticImage
        className="about-picture"
        layout="fixed"
        formats={["AUTO", "WEBP", "AVIF"]}
        src="../images/ryan-and-olivia-at-disney.png"
        width={750}
        height={1000}
        quality={95}
        alt="Me holding my oldest daughter at Disney."
      />
      <h2>Hi, I'm Ryan Ptomey.</h2>
      <p>
        I was born and raised in Kansas City, MO. If you’re not from the Midwest and you’ve heard of KC, you likely either know it as flyover territory or one of 4 acceptable styles of BBQ. I’ve spent most of my life in KCMO, and I’m kind of a fan. Outside of general travel, I also spent a couple years in Chicago for undergrad, so I picked up a few food opinions there, too.
      </p>
      <p>
        I graduated from college in May of 2009. That year was the height of the Great Recession (the worst economic downturn since the 1930s). I entered that scary, hopeless job market with a BA in English (if only I’d seen Avenue Q years earlier). Fortunately, I found a home working for a boss who was also an English major, and she was kind enough to bring me in and show me the ropes at a now defunct online advertising agency.
      </p>
      <p>
        After several years of flirting with digital analytics, I eventually managed to work my way into a full-time position at the analytics agency I work for now. While I started out working in both Tableau and Google Tag Manager, I discovered that the latter scratched an itch I didn’t know I had. Since focusing my efforts on web analytics implementation work for our clients, I’ve found myself constantly challenged - in a good way!
      </p>
      <p>
        When you embrace implementation work, every new project is like a puzzle, and every client interaction can become a way of helping someone achieve their goals.
      </p>
      <p>
        I value the open sharing of knowledge and the pursuit of becoming a well-rounded person, and I recognize how many other people have helped me get to where I am today. Because of these values and realizations, I’ve started this website to help you learn more about Google Analytics, Google Tag Manager, and other tools to make your work better.
      </p>
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
