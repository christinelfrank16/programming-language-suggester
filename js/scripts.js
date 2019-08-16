$(document).ready(function(){
  var data = {};
  updateSliderValues();

  // clear existing 2nd quiz content and show appropriate second quiz
  $("form#quiz-intro").submit(function(event){
    event.preventDefault();
    getInfoQuizValues(data); // get values in case of changes on re-submission
    $("#second-quiz").children().hide();
    showSecondQuiz(data);
  });

  // show results when second quiz (a) is submitted
  $("form#quiz-specific-1").submit(function(event){
    event.preventDefault();

    var hardware = $("input#hardware-value").prop("checked");
    var hardwareMeaning = $("input:checkbox[name=hardware-meaning]").prop("checked");
    var features = $("input:checkbox[name=features]:checked").toArray();

    if(features.length === 0){
      alert("Please check at least one feature important to you.");
    } else {

      // wants to interface with hardware
      if(!hardwareMeaning && hardware){
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
        else if (checkFeaturesArray(features, "2")){ // checks if easy to learn is selected
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
        // does not want to interface with hardware
        $("#result-lang").text("Ruby");
        $("#result-details").text(`
          A dynamic, open source programming language with a
        	focus on simplicity and productivity. It has an elegant
        	syntax that is natural to read and easy to write.
        `);
        $("#result-link").attr("href", "https://www.ruby-lang.org/en/");
      } else {
        // doesn't know about interfacing
        $("#result-lang").text("JavaScript");
        $("#result-details").text(`
          JavaScript (JS) is a lightweight, interpreted,
        	or just-in-time compiled programming language with
        	first-class functions. While it is most well-known as the
        	scripting language for Web pages, many non-browser
        	environments also use it.
        `);
        $("#result-link").attr("href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript");
      }

      $(".modal").modal("show");
    }
  });

  // show results when second quiz (b) is submitted
  $("form#quiz-specific-2").submit(function(event){
    event.preventDefault();

    var reason = $("input:radio[name=reason]:checked").val();
    var platform = $("input#platform-value").prop("checked"); // true = Mac, false = Windows
    var platformAgnostic = $("input:checkbox[name=platform-matters]").prop("checked");

    if(!platformAgnostic){
      // Cares about platform
      if(platform){
        $("#result-lang").text("Swift");
        $("#result-details").text(`
          Swift is a general-purpose, multi-paradigm, compiled
        	programming language developed by Apple Inc. for iOS, macOS,
        	watchOS, tvOS, Linux, and z/OS.
        `);
        $("#result-link").attr("href", "https://en.wikipedia.org/wiki/Swift_(programming_language)");
      }
      else {
        $("#result-lang").text("Go");
        $("#result-details").text(`
          Also known as Golang, is a statically typed,
        	compiled programming language designed at Google. It is
        	syntactically similar to C, but with memory safety,
        	garbage collection, structural typing, and CSP-style
        	concurrency.
        `);
        $("#result-link").attr("href", "https://en.wikipedia.org/wiki/Go_(programming_language)");
      }
      // no platform preference
    } else {
      if(reason === "2" || !data.styling =="2"){ // sounds like fun or likes styling
        $("#result-lang").text("JavaScript");
        $("#result-details").text(`
          JavaScript (JS) is a lightweight, interpreted,
        	or just-in-time compiled programming language with
        	first-class functions. While it is most well-known as the
        	scripting language for Web pages, many non-browser
        	environments also use it.
        `);
        $("#result-link").attr("href", "https://developer.mozilla.org/en-US/docs/Web/JavaScript");
      } else if (effort >= 4){
        $("#result-lang").text("Rust");
        $("#result-details").text(`
          Rust is a multi-paradigm system programming language
        	focused on safety, especially safe concurrency. Rust
        	is syntactically similar to C++, but is designed to provide
        	better memory safety while maintaining high performance.
        `);
        $("#result-link").attr("href", "https://en.wikipedia.org/wiki/Rust_(programming_language)");
      } else if (reason === "1"){
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
      }
      else {
        $("#result-lang").text("Java");
        $("#result-details").text(`
          Java is a general-purpose programming language that
        	is class-based, object-oriented, and designed to have as
        	few implementation dependencies as possible. It is intended
        	to let application developers write once, run anywhere (WORA),
        	meaning that compiled Java code can run on all platforms that
        	support Java without the need for recompilation. Java
        	applications are typically compiled to bytecode that can
        	run on any Java virtual machine (JVM) regardless of the
        	underlying computer architecture.
        `);
        $("#result-link").attr("href", "https://en.wikipedia.org/wiki/Java_(programming_language)");
      }

    }

    $(".modal").modal("show");
  });

  $("#modal-btn").click(function(){
    // refresh page to clear quiz on modal close
    location.reload();
  });

  // update slider values when moved
  $(".slidecontainer").on("input", function(){
    updateSliderValues();
  });

});



function updateSliderValues(data){
  var experience = $("#prior-exp").val();
  $("#exp-value").text(experience);

  var effort = $("#effort").val();
  $("#effort-value").text(effort);
}

function getInfoQuizValues(data){
  // Get and store variables to data object
  var learn = parseInt($("input:radio[name=learn]:checked").val());
  var experience = parseInt($("#prior-exp").val());
  var styling = parseInt($("#style-type").val());
  var effort = parseInt($("#effort").val());

  data.experience = experience;
  data.effort = effort;
  data.learn = learn;
  data.styling = styling;
}


function showSecondQuiz(data){
  getInfoQuizValues(data);
  $("h2").hide();
  // determine which 2nd quiz and show
  if((data.experience > 2 && data.effort >= 6) || data.experience >= 5) {
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
