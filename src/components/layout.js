import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import {
    siteTitle,
    container,
    containerBg,
    heading,
    navLinks,
    navLinkItem,
    navLinkText
} from './layout.module.css'

import '@mantine/core/styles.css';
import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
    /** Put your mantine theme override here */
});


const Layout = ({ pageTitle, children }) => {
    const data = useStaticQuery(graphql`
        query {
          site {
            siteMetadata {
              title
            }
          }
        }
      `)

    return (
        <MantineProvider theme={theme}>
            <div className={`${container} ${containerBg}`}>
                {/* <h1>xxx</h1> */}
                <header className={siteTitle}>{data.site.siteMetadata.title}</header>
                <nav>
                    <ul className={navLinks}>
                        <li className={navLinkItem}>
                            <Link to="/" className={navLinkText}>
                                Home
                            </Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/about" className={navLinkText}>
                                About
                            </Link>
                        </li>
                        <li className={navLinkItem}>
                            <Link to="/blog" className={navLinkText}>
                                Blog
                            </Link>
                        </li>
                    </ul>
                </nav>
                <main>
                    <div className={heading}>{pageTitle}</div>
                    {children}
                </main>
            </div>
        </MantineProvider>
    )
}

export default Layout