// Store code snippets in GraphQL for the home page examples.
// Snippets will be matched with markdown templates of the same name.
exports.onCreateNode = async ({ node, actions, loadNodeContent, createNodeId }) => {
  const {createNode} = actions;
  // listen to updates of file nodes that are marked with 'packages` name (in gatsby-config.js)
  // and are in `content/home/examples` directory and have .js extension
  if (node.internal.type === 'File' && node.sourceInstanceName === 'packages' && node.relativeDirectory === 'home/examples' && node.extension === 'js') {
    const code = await loadNodeContent(node);
    createNode({
      id: node.name,
      children: [],
      parent: node.id,
      internal: {
        type: 'ExampleCode',
        contentDigest: JSON.stringify(code),
      },
    });
  }
};