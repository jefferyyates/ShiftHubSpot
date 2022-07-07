
const hubspot = require('hubspot');
const axios = require('axios');
const url = require('url');

exports.handler = (context, event, callback) => {
 // Axios prep for call to REST API
 // Setup headers
 const headers = {
   "Content-Type" : "application/json",
   client_id : "1234",
   client_secret : "1234",
 };
 
 // Setup body
 const body = {
   TransactionID : event.TransactionID
 };
 
 // Setup URL
 const queryParams = new url.URLSearchParams({ "env": "MJR2_DEV" });
 const url = "https://domain.com/params?" + queryParams;
 
 // Make call using Axios
 axios.post(url, body, { headers : headers })
   .then(response => {
     // Build our response object
     const dataBlock = {
       TransactionID : response.data.TransactionID,
       FirstName : response.data.FirstName,
       DOB : response.data.DOB,
       PhoneNumber : response.data.PhoneNumber
     };
 
     // This callback is what is returned in response to this function being invoked.
     return callback(null, dataBlock);
   })
   .catch(error => {
     console.error('There was an error');
     console.log(error);
     return callback(error);
   });

};
