// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


const server = 'http://127.0.0.1:8000';
const site = 'https://';

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
