const BASE_URL = 'http://127.0.0.1:3000';
const URL_ROUTE = {
    citizensTree: (query) => `${BASE_URL}/citizens/tree${query}`
};

const UI_ELEMENTS = {
    categories: document.querySelectorAll('.category'),
    tree: document.querySelector('.tree')
};

UI_ELEMENTS.categories.forEach((category) => {
    category.addEventListener('change', setCitizensTree);
});

setCitizensTree();

function getQueryByCategories() {
    let query = '?';
    UI_ELEMENTS.categories.forEach((category, i, arr) => {
        const key = category.getAttribute('value');
        query += `${key}=${category.checked}`;

        if (arr.length - 1 > i) {
            query += '&';
        }
    });
    return query;
}

async function getCitizenTree() {
    const query = getQueryByCategories();
    const response = await fetch(URL_ROUTE.citizensTree(query));
    return response.json();
}

async function setCitizensTree() {
    const tree = await getCitizenTree();
    createList(tree);
}


function createList(tree, parent = UI_ELEMENTS.tree) {
    parent.textContent = '';
    const list = document.createElement('ul');
    list.classList.add('list');

    tree.forEach((node) => {
        const item = document.createElement('li');
        item.classList.add('list-element');

        list.append(item);

        if (node.next) {
            const newList = createList(node.next, item)
            list.append(newList);
        } else {
            const title = `${node.city_info.name}, ${node.city_info.data} жителей`;
            item.setAttribute('title', title);
        }

        item.textContent = node.value;
        parent.append(list);
    });

    return list;
}
