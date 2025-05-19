const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    // 查询所有 MDX 文件
    const result = await graphql(`
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
  `);

    if (result.errors) {
        reporter.panicOnBuild('Error loading MDX result', result.errors);
        return;
    }

    // 为每个 MDX 文件创建页面
    result.data.allMdx.nodes.forEach((node) => {
        // 解析文件路径，提取子目录和文件名
        const filePath = node.internal.contentFilePath;
        const relativePath = path.relative(
            path.join(__dirname, 'content'),
            filePath
        );
        const pathParts = relativePath.split(path.sep);

        console.log("pathParts", pathParts);

        // 生成页面路径，如 /blog/test1/mdx1/
        const slug = pathParts.join('/')

        createPage({
            path: slug,
            component: `${path.resolve(__dirname, 'src/templates/blog-post.js')}?__contentFilePath=${filePath}`,
            context: {
                id: node.id,
                subdir: pathParts[0], // 传递子目录信息
            },
        });
    });
};