import * as React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';

const BlogPostTemplate = ({ data, children  }) => {
    return (
        <article>
            <h1>{data.mdx.frontmatter.title}</h1>
            <MDXProvider>
                {children }
            </MDXProvider>
        </article>
    );
};

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
      }
    }
  }
`;

export default BlogPostTemplate;