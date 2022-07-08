
//const hubspot = require('hubspot');
const axios = require('axios');
const url = require('url');

exports.handler = (context, event, callback) => {

  console.log(event);
  console.log(context);

 // Axios prep for call to REST API
 // Setup headers
 const headers = {
   "Content-Type" : "application/json",
 };
 
 // Setup body
 const body = {
 };
 
 // Setup URL
 const queryParams = new url.URLSearchParams({ "limit": "10", "archived": "false", "hapikey" : context.HUBSPOTapikey });
 const hubUrl = "https://api.hubapi.com/crm/v3/objects/contacts/" + event.customerId + "?" + queryParams;
 
 // Make call using Axios
 axios.get(hubUrl, body, { headers : headers })
   .then(response => {
     // Build our response object
     const dataBlock = {
       id : response.data.id,
       email : response.data.properties.email,
       firstname : response.data.properties.firstname,
       lastname : response.data.properties.lastname
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
