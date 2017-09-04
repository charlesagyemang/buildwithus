params = []
var apmtDisplay    = $("#apmt-display");
var ordDisplay     = $("#ord-display");
var usersDisplay   = $("#users-display");
var plansDisplay   = $("#plans-display");
var spanOrders     = $("#span-orders");
var spanApmt       = $("#span-appointments");
var spanPlans      = $("#span-plans");


$(document).ready(function(){
  //filestack initialization
  var client          = filestack.init('AImLZrMiLQGy6uXSgb1a1z');
  var mainImageUrl    = "";
  var otherImagesUrls = "";


  // Plans table On Devless
  SDK.queryData("plans", "plans_table", params, function(response){
    var value = response.payload.results.length
    plansDisplay.text(value);
    spanPlans.text(value);
  });

  // Appointments Table
  SDK.queryData("appointements", "appointements_table", params, function(response){
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

  // main image button btn-other-images
  $('#btn-other-images').unbind('click').click(function(){
      // several images button
      resulting = [];
      client.pick({
        accept: 'image/*',
        maxFiles: 7,
      }).then(function(result) {
        var finalResult = result.filesUploaded
        if (finalResult.length > 1) {
          $.each(finalResult, function(ind, ele){
            resulting.push(finalResult[ind].url);
          })
        }
        // get results
        $("#label-other-images").text(finalResult.length + " images selected");
        //console.log(resulting);
        otherImagesUrls = JSON.stringify(resulting);
      });

  })


  // Several Images Button btn-main-image
  $('#btn-main-image').unbind('click').click(function(){
    client.pick({
      accept: 'image/*',
      maxFiles: 1,
    }).then(function(result) {
        console.log("filesUploaded", result.filesUploaded);
        $("#label-mImage").text(result.filesUploaded[0].filename);
        mainImageUrl = result.filesUploaded[0].url;
        //console.log(JSON.stringify(result.filesUploaded[0].url))
    });
  })

  $('#btn-add-plan-devless').unbind('click').click(function(){
      var $this       = $(this);
      var name        = $('#input-name').val();
      var price       = $('#input-price').val();
      var description = $('#txt-description').val();

      var postJsonBody =  {
        name: name,
        price: price,
        description: description,
        file: mainImageUrl,
        images: otherImagesUrls
      }


      if (name.length > 0 && price.length > 0 && description.length > 0 && mainImageUrl.length > 0  && otherImagesUrls.length >0)
      {
        $this.text("Adding..")
        SDK.addData("plans", "plans_table", postJsonBody,  function(response){
          if (response.status_code == 609) {
            // success
            $this.text("Plan Added Successfully");
            $("#modal-close-plan").click();
            $("#alert-plan-success").removeClass('hide');
          }

          console.log(response);

        })

      } else {

        alert("make sure name, description and price fields are not left empty and please upload the main image too if youve not  done that and Yh one more thing please add at least one other image ok. Thanks")
      }
  })



})
