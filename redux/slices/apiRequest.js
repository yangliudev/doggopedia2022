import instance from '../../utilities/axios';

export const apiRequest = searchTerm => () => {
  // console.log('search term is: ', searchTerm);
  instance
    .get(
      '?action=query&format=json&list=search&formatversion=2&srsearch=' +
        searchTerm,
    )
    .then(response => {
      let responseData = response.data;
      // console.log('full response ', responseData);
      console.log('query ', responseData.query);
    })
    .catch(error => {
      console.log('apiRequest.js error is ', error);
    });
};
