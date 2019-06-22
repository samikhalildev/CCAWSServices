let servicesMap = {};
let servicesAPI = 'https://us-west-2.cloudconformity.com/v1/services';

document.addEventListener('DOMContentLoaded', () => fetchAPI());

const fetchAPI = () => {
  fetch(servicesAPI)
    .then(res => res.json())
    .then(json => {
      let services = json.data;
      let content = json.included;

      services.forEach(service => {
        getServiceContent(service, content);
      });

      loadDataToDOM();
    });
};

const getServiceContent = (service, content) => {
  let title = service.attributes.name;
  let data = service.relationships.rules.data;
  servicesMap[title] = [];

  data.forEach(d => {
    let res = content.filter(c => c.id == d.id)[0].attributes;
    servicesMap[title].push(res);
  });
};

const loadDataToDOM = () => {
  for (let key in servicesMap) {
    console.log(key);
    console.log(servicesMap[key]);

    let res = document.getElementById('res');
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
    let li = document.createElement('li');

    column.className = 'col-sm';

    title.innerText = key;
    column.appendChild(title);

    servicesMap[key].forEach(element => {
      li.innerText = element.title;
      ul.appendChild(li);
    });

    column.appendChild(ul);

    if (addNewRow) {
      row.appendChild(column);
      res.appendChild(row);
    } else {
      res.children[--count].appendChild(column);
    }
  }
};
