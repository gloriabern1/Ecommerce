var mongoose = require('mongoose');
var gateman = require("gatemanjs").GateMan(mongoose);

var ecommerceRoles = ["Admin", "Super Admin", "User", "Data Entry"];
ecommerceRoles.forEach(item => {
    gateman.getRole(item).then(result=>{
        if( !result || result.name != item){
         
            gateman.createRole(item)
        } 
    }).catch(err=>{

    });

})

var ecommerceClaims = ["post", "get", "delete", "update"];
ecommerceClaims.forEach(item => {
    gateman.getClaim(item).then(resultClaim=>{

        if(!resultClaim || resultClaim.name != item ){
          
          console.log(resultClaim);
            gateman.createClaim(item);
        } 
    }).catch(err=>{
            throw err;
    });

});


module.exports = gateman;