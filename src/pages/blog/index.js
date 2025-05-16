import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
    return (
        <Layout pageTitle="My Blog Posts">
            {
                data.allMdx.nodes.map((node) => (
                    <article key={node.id}>
                        <h2>
                            <Link to={`/blog/${node.frontmatter.slug}`}>
                                {JSON.stringify(node.frontmatter)}
                                {node.frontmatter.title}
                                {node.frontmatter.slug}
                            </Link>
                        </h2>
                        <p>Posted: {node.frontmatter.date}</p>
                        <p>{node.excerpt}</p>
                    </article>
                ))
            }
        </Layout>
    )
}

export const query = graphql`
    query {
        allMdx(sort: { frontmatter: { date: DESC } }) {
        nodes {
            frontmatter {
                    date(formatString: "MMMM D, YYYY")
                    title
                    slug
                }
                id
                excerpt
            parent {
            ... on File {
                        id
                        name
                        modifiedTime(formatString: "MMMM D, YYYY\"")
                    }
                }
            }
        }
    }
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage