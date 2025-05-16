import * as React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'
import './markdown.module.css'
import {TableOfContents} from '@mantine/core'

const BlogPost = ({ data, children }) => {
    const containerRef = React.useRef(null);

    return (
        <Layout pageTitle={data.mdx.frontmatter.title}>
            <div style={{display: 'flex',overflow:"scroll",height: "500px"}}>
                <TableOfContents
                    minDepthToOffset={0}
                    depthOffset={40}
                    size="sm"
                    scrollSpyOptions={{
                        root: containerRef.current, // 添加这行
                        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
                    }}
                    getControlProps={({ data }) => ({
                        onClick: () => data.getNode().scrollIntoView(),
                        children: data.value,
                    })}
                    style={{overflow:"scroll",height: "500px",flex:1,position: "fixed"}}
                />
                <div id="mdx"  ref={containerRef} style={{flex:2}}>
                    <p>{data.mdx.frontmatter.date}</p>
                    {children}
                </div>
            </div>
        </Layout>
    )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
    }
  }
`

export const Head = ({ data }) => <Seo title={data.mdx.frontmatter.title} />

export default BlogPost