$(document).ready(function(){
  var data = {};
  // get and show initial slider values
  updateSliders();

  // clear previous content and show second quiz
  $("form#quiz-intro").submit(function(event){
    event.preventDefault();
    $("#second-quiz").children().hide();
    showSecondQuiz(data);
  });

  $("form#quiz-specific-1").submit(function(event){
    event.preventDefault();
    var hardware = $("input#hardware-value").prop("checked");
    var hardwareMeaning = $("input:checkbox[name=hardware-meaning]").prop("checked");
    var features = $("input:checkbox[name=features]:checked").toArray();
    console.log(features);

    // wants to interface with hardware
    if(!hardwareMeaning && hardware){
      var easyToLearnFeature = checkFeaturesArray(features, "2");
      if(data.learn === 0 || data.styling === 2){
        $("#result-lang").text("LabVIEW");
        $("#result-details").text(`
        LabVIEW offers a graphical programming approach
      	that helps you visualize every aspect of your application,
      	including hardware configuration, measurement data, and
      	debugging. This visualization makes it simple to integrate
      	measurement hardware from any vendor, represent complex
      	logic on the diagram, develop data analysis algorithms, and
      	design custom engineering user interfaces.
        `);
        $("#result-link").attr("href", "https://www.ni.com/en-us/shop/labview.html");
      }
      else if (easyToLearnFeature){
        $("#result-lang").text("Python");
        $("#result-details").text(`
          Python is an interpreted, high-level, general-purpose
        	programming language. Python's design philosophy emphasizes
        	code readability with its notable use of significant
        	whitespace. Its language constructs and object-oriented
        	approach aim to help programmers write clear, logical code
        	for small and large-scale projects.
        `);
        $("#result-link").attr("href", "https://en.wikipedia.org/wiki/Python_(programming_language)");
      } else {
        $("#result-lang").text("C#");
        $("#result-details").text(`
          This language is a general-purpose, multi-paradigm programming language
        	encompassing strong typing, lexically scoped, imperative,
        	declarative, functional, generic, object-oriented
        	(class-based), and component-oriented programming
        	disciplines.
        `);
        $("#result-link").attr("href", "https://en.wikipedia.org/wiki/C_Sharp_(programming_language)");
      }
    } else if (!hardwareMeaning){

    }

    $(".modal").modal("show");
  });

  $("form#quiz-specific-2").submit(function(event){
    event.preventDefault();
    var reason = $("input:radio[name=reason]:checked").val();
    var platform = $("input#platform-value").prop("checked");
    var platformAgnostic = $("input:checkbox[name=platform-matters]").prop("checked");
  });

  $("#modal-btn").click(function(){
    // refresh page to clear quiz on modal close
    location.reload();
  });


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
  }
  else {
    $("#group-2b").show();
  }
}

function checkFeaturesArray(features, matchValue){
  var matchFound = false
  features.forEach((element, index) => {
    if(element.value === matchValue){
      matchFound = true;
    }
  });
  return matchFound;
}
