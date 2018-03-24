import { find } from 'lodash';

// ! ВАЖНО!
// без этого в dev-hot при изменении js будет как при перезагрузке страницы дергаться, с этим изменения выглядят гладко.
if (module && module.hot) {
  module.hot.accept();
}
//


import "./../css/app.css";

import Test from "./Test";


console.log(`|42| ->    find()`, find([{id: 1, foo: 'baz'}, {id: 2, foo: 'bar'}], { id: 1}));

console.log('$:', $('div'));

console.log(APP_CONFIG);
