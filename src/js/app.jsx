import { find } from 'lodash';

console.log(`|42| ->    Boolean(module && module.hot)`, Boolean(module && module.hot));
// ! IMPORTANT!
// without it HMR doesn't work.
if (module && module.hot) {
  module.hot.accept();
}
//

import "./../css/app.css";

import Test from "./Test";


console.log(`|42| ->    lodash - find()`, find([{id: 1, foo: 'baz'}, {id: 2, foo: 'bar'}], { id: 1}));
console.log('$:', $('div'));
console.log('APP_CONFIG:', APP_CONFIG);
