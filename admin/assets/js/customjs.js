params = []
var apmtDisplay    = $("#apmt-display");
var ordDisplay     = $("#ord-display");
var usersDisplay   = $("#users-display");
var plansDisplay   = $("#plans-display");
var spanOrders     = $("#span-orders");
var spanApmt       = $("#span-appointments");
var spanPlans      = $("#span-plans");

$(document).ready(function(){

  // Plans table On Devless
  SDK.queryData("plans", "plans_table", params, function(response){
    var value = response.payload.results.length
    plansDisplay.text(value);
    spanPlans.text(value);

  });

  // Appointments Table
  SDK.queryData("plans", "appointments_table", params, function(response){
    var value = response.payload.results.length
    apmtDisplay.text(value);
    spanApmt.text(value);
  })

  // Orders Table
  SDK.queryData("plans", "orders_table", params, function(response){
    var value = response.payload.results.length
    ordDisplay.text(value);
    spanOrders.text("New " + value);
  });

  // Users Table
  SDK.call('devless', 'getAllUsers', [], function(response){
    //console.log(response);
  });



})
