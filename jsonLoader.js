let servicesMap = {};
let servicesAPI = 'https://us-west-2.cloudconformity.com/v1/services';

document.addEventListener('DOMContentLoaded', () => fetchAPI());

fetchAPI = () => {
  fetch(servicesAPI)
    .then(res => res.json())
    .then(json => {
      let services = json.data;
      let content = json.included;

      services.forEach(service => {
        getServiceContent(service, content);
      });

      for (let key in servicesMap) {
        console.log(key);
        console.log(servicesMap[key]);
      }
    });
};

getServiceContent = (service, content) => {
  let title = service.attributes.name;
  let data = service.relationships.rules.data;
  servicesMap[title] = [];

  data.forEach(d => {
    let res = content.filter(c => c.id == d.id)[0].attributes;
    servicesMap[title].push(res);
  });
};
