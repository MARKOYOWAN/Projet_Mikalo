const server = '';
const site = '';

export const environment = {
  production: true,
  server_url : `${server}/api/`,
  image_url : `${server}/api/get/media?path=`, 
  site_url : `${site}/fr/`,
  onesignal: {
    app_id: '',
    project_id: ''
  },
  color : '#df191a',
  map: {
    zoom: 9,
    lat : -12.131312131,
    lng: 11.111801,
}
};
