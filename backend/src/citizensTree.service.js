/**
 * @param {Array<Object>} citizens - An array of joined citizens and cities
 * @param {Array<String>} filter - An array of existing allowed parameters in the query string.
 *
 * @returns {Array<Object>} - Citizens tree by filter.
 */
exports.getCitizensTree = (citizens, filter) => {
    const tree = [];
    citizens.forEach((citizen) => {
        setNodes(tree, citizen, filter);
    });
    return tree;
};

/**
 * @param {ReqQuery} query - Request object that is populated by request query strings that are found in a URL.
 * @param {Array<String>} filterList - An array of allowed parameters in the query string.
 *
 * @returns {Array<String>} - An array of existing allowed parameters in the query string.
 */
exports.getFilter = (query, filterList) => {
    const filter = [];
    for (let node in query) {
        if (query[node] === 'true' && filterList.includes(node)) {
            filter.push(node);
        }
    }
    return filter;
};

/**
 * Creates and sets nodes in the citizen tree.
 *
 * @param {Array<Node>} nodes - Tree of citizens (an array of nodes or an empty array).
 * @param {Object} citizen - Citizen object.
 * @param {Array<String>} filter - An array of allowed parameters in the query string.
 * @param {Number=} index - Index for filter iteration.
 */
function setNodes (nodes, citizen, filter, index = 0) {
    const key = filter[index++];

    if (key != undefined) {
        const groupName = citizen.groups.find((group) => group.type == key).name;
        const node = getNodeByValue(nodes, groupName);
        setNodes(node.next, citizen, filter, index);
    } else {
        nodes.push({
            value: citizen.name,
            city_info: citizen.city_info,
            next: null
        });
    }
}

/**
 * @param {Array<Node>} nodes - Node array
 * @param {String} value - String value
 * @returns {Node} - Returns an existing node or creates a new node `{ value: value, next: [] }`
 */
function getNodeByValue (nodes, value) {
    const node = nodes.find((node) => node.value === value);
    if (!node) {
        const newNode = { value: value, next: [] };
        nodes.push(newNode);
        return newNode;
    }
    return node;
}