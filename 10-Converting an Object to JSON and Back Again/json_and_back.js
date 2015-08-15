var profiles = require('./profiles'); //nopte the .js suffix isn't imperative

//object to json, rename name properties to fullname
profiles = JSON.stringify(profiles).replace(/name/g, 'fullname');

//json back into object
profiles = JSON.parse(profiles);

//correct felix's name using the replaced fullname property
profiles.felix.fullname = "Felix Geisendörfer";

console.log(profiles.felix);

