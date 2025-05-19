import { graphql, useStaticQuery } from "gatsby"
// const path = require('path'); // 不能用这个 浏览器没有path方法，你要存到数据节点里，在获取
// hook改成model（数据层）

const useSiteNav = () => {
    const data = useStaticQuery(graphql`
        query {
            allMdx {
                nodes {
                    id
                    internal {
                        contentFilePath
                    }
                }
            }
        }
    `)

    return data.site.siteMetadata
}

export default useSiteNav