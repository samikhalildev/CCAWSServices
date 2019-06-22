let url = 'https://us-west-2.cloudconformity.com/v1/services';
let servicesMap = {};
let unitTests = {};

document.addEventListener('DOMContentLoaded', () => fetchAPI(url));

const fetchAPI = url => {
  if (isEmpty(url)) return;

  fetch(url)
    .then(res => res.json())
    .then(json => {
      if (isEmpty(json.data) || isEmpty(json.included)) return;
      let services = json.data;
      let content = json.included;

      services.forEach(service => {
        getServiceContent(service, content);
      });

      loadDataToDOM();
    });

  return true;
};

const getServiceContent = (service, content) => {
  try {
    let title = service.attributes.name;
    let data = service.relationships.rules.data;
    servicesMap[title] = [];

    data.forEach(d => {
      let res = content.filter(c => c.id == d.id)[0].attributes;
      servicesMap[title].push(res);
    });
  } catch (err) {
    console.log(err);
  }
};

const loadDataToDOM = () => {
  for (let key in servicesMap) {
    console.log(key);
    console.log(servicesMap[key]);

    let res = document.getElementById('res');
    let loading = document.getElementById('loading');

    let row = '';
    let count = res.childElementCount;
    let addNewRow = res.children[count - 1].childElementCount === 2;

    if (addNewRow) {
      row = document.createElement('div');
      row.className = 'row';
    }

    let column = document.createElement('div');
    let title = document.createElement('h3');
    let ul = document.createElement('ul');

    column.className = 'col-sm';

    title.innerText = key;
    column.appendChild(title);

    servicesMap[key].forEach(element => {
      let li = document.createElement('li');
      li.innerText = element.title;
      ul.appendChild(li);
    });

    column.appendChild(ul);

    loading.innerText = '';
    if (addNewRow) {
      row.appendChild(column);
      res.appendChild(row);
    } else {
      res.children[--count].appendChild(column);
    }
  }
};

const isEmpty = value => {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
};

// UNIT TESTS

unitTests.isEmpty = function(method) {
  return method('stuff') === true;
};

unitTests.fetchAPI = function(method) {
  return method(url) === true;
};

unitTests.getServiceContent = function(method) {
  return method('service', 'content') === true;
};

//console.log(unitTests.isEmpty(isEmpty));
