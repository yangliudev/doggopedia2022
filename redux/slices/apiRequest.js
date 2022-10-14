import instance from '../../utilities/axios';

export const apiRequest = () => () => {
  console.log('start of api call');
  instance
    .get('?action=parse&page=dog&prop=text&formatversion=2&format=json')
    .then(response => {
      let responseData = response.data;
      console.log('response from redux is ', responseData);
    })
    .catch(error => {
      console.log('apiRequest.js error is ', error);
    });
  console.log('end of api call');
};
