$(document).ready(function(){
  var data = {};

  $("form#quiz-intro").submit(function(event){
    event.preventDefault();
    $("#second-quiz").children().hide();
    showSecondQuiz(data);
  });


  // get and show initial slider values
  updateSliders();
  // update slider values when moved
  $(".slidecontainer").on('input', function(){
    updateSliders();
  });


});



function updateSliders(data){
  var experience = $("#prior-exp").val();
  $("#exp-value").text(experience);

  var effort = $("#effort").val();
  $("#effort-value").text(effort);
}


function showSecondQuiz(data){
  // Get and store variables to data object
  var learn = parseInt($("input:radio[name=learn]:checked").val());
  var experience = parseInt($("#prior-exp").val());
  var styling = parseInt($("#style-type").val());
  var effort = parseInt($("#effort").val());

  data.experience = experience;
  data.effort = effort;
  data.learn = learn;
  data.styling = styling;

  // determine which 2nd quiz and show
  if((experience > 3 && effort >= 6) || experience >= 6) {
    $("#group-2a").show();
    console.log("A")
  }
  else {
    $("#group-2b").show();
    console.log("B")
  }
}
