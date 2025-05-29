const getString = window.location.search;
console.log(getString);

const myinfo = new URLSearchParams(getString);
console.log(myinfo);

console.log(myinfo.get("first"));
console.log(myinfo.get("last"));
console.log(myinfo.get("ordinance"));
console.log(myinfo.get("date"));
console.log(myinfo.get("location"));
console.log(myinfo.get("phone"));
console.log(myinfo.get("email"));

document.querySelector('#results').innerHTML = `
<p>Appointment for ${myinfo.get("first")} ${myinfo.get("last")} </p> 
<p>Proxy ${myinfo.get("ordinance")} on ${myinfo.get("date")} in the ${myinfo.get("location")} </p>
<p>Phone: ${myinfo.get("phone")} </p>
<p>Email: ${myinfo.get("email")} </p>
`;
