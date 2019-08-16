$(document).ready(function(){
  // get and show initial slider values
  updateSliders();
  // update slider values when moved
  $(".slidecontainer").on('input', function(){
    updateSliders();
  });


});



function updateSliders(){
  var experience = $("#prior-exp").val();
  $("#exp-value").text(experience);

  var effort = $("#effort").val();
  $("#effort-value").text(effort);
}
