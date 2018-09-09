$(document).ready(function() {

  var showArray = [];
  var queryURL;
  var showTitle;
  var showSearcher;
  var showLinker;
  var restSearcher;
  var restLat;
  var restLon;
  var showLatg;
  var showLong;
  var showID;
  var showImage;


  //console.log(restLat + "," + restLon);


  $("#search-show").on("click", function(event) {

    $("#search-show").val("");
  });


  $("#add-show").on("click", function(event) {
    event.preventDefault();
    var showSearch = $("#search-show").val().trim();

    var showLink = "ID=" + showSearch;

    url = "show-display.html?" + showLink;

    if (showSearch != "") {

      window.location = url;

      // console.log(showSearch);

    } else if (showSearch === undefined) {
      // alert('this is not found');
    }

  });

  function selectShow() {
    showLatg = $(this).attr("data-lat");
    showLong = $(this).attr("data-lon");
    showID = $(this).attr("data-id");

    //alert("button was clicked");
    // console.log("show" + showLatg + "," + "show" + showLong + "show"+ showID);

  }


  function getItinerary() {

    var someVar = $(this).attr("data-rest");
    var restLatg = $(this).attr("data-lat");
    var restLong = $(this).attr("data-lon");


    var itinLink = "restID=" + someVar + "&" + "showID=" + showID + "&restLat=" + restLatg + "&restLon=" + restLong + "&showLat=" + showLatg + "&showLon=" + showLong;
    // console.log(itinLink);

    var T = "itinerary-display.html?" + itinLink;

    window.location = T;

  }


  function goToSeatGeek() {

    var seatGeek = showLinker
      // console.log(showLinker)
    window.open(
      seatGeek,
      '_blank' // <- This is what makes it open in a new window.
    );
  }



  function getShowItin() {
    // showTitle = 3662794;
    // showTitle = urlID;
    // console.log(showTitle);
    //queryURL = "https://seat-geek-proxy.herokuapp.com/2/events?client_id=ODkxMDA2MnwxNTA1NDc2Njg3Ljkx&client_secret=d03ee2bc8b3508b71abadabe57072965260caf9a20d80887580eb4473fe42620&lat=40.7589&lon=-73.9851&range=2mi&q=" + showSearcher + "&taxonomies.id=3030000&taxonomies.name=theater_broadway";

    $("#alert-message").css("display", "none");

    queryURL = "https://api.seatgeek.com/2/events?client_id=ODkxMDA2MnwxNTA1NDc2Njg3Ljkx&client_secret=d03ee2bc8b3508b71abadabe57072965260caf9a20d80887580eb4473fe42620&lat=40.7589&lon=-73.9851&range=2mi&q=" + showSearcher + "&taxonomies.id=3030000&taxonomies.name=theater_broadway";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).done(function(response) {
      if (response.events[0] === undefined) {
        loadShowOptions();
      } else {
        //console.log(response);
        var events = response.events[0].short_title;

        if (response.events.length === 0) {
          $("#search-show").val("We're sorry, That show is not found");
          //console.log("this show is not there");
        }
        var showName = response.events[0].short_title;
        //console.log("this is the event ==> " + events);
        var getIndex = showArray.indexOf(events);
        //console.log(getIndex);
        if (getIndex === -1) {
          showArray.push(events);
          // console.log(showArray);
        }
        //this gets the show name
        var showName = response.events[0].short_title;
        var showID = response.events[0].id;
        //this gets the show location lat and long
        var locationLat = response.events[0].venue.location.lat;
        var locationLon = response.events[0].venue.location.lon;
        //this gets the theatre name
        var locationVenue = response.events[0].venue.name;
        // this gets the venue address
        var locationStreet = response.events[0].venue.address;
        var locationCity = response.events[0].venue.extended_address;
        showLinker = response.events[0].url;
        //var locationZip = response.events[i].venue.postal_code;
        var locationAddress = locationStreet + ", " + locationCity;

        // this gets the image
          var eventName = events.toLowerCase().replace(' - new york', '');
            console.log(eventName);


            if (response.events[0].performers[0].image !== null) {
              showImage = response.events[0].performers[0].image;
              // console.log("&&&&&&&&&&&&&===========+++&&&&&&&&&&&&&");
              // console.log(response.events[i].performers[0].image);

            } else if (!response.events[0].performers[0].image) {

              for (var j = 0; j < backUpImage.length; j++) {
                // console.log("made it to the loop to check the backup images");
                if (backUpImage[j].name == eventName) {
                  showImage = backUpImage[j].image;
                } 
            } 
              } else {
              showImage = "assets/images/missingImage.jpg";
            };

            if (showImage === "") {
              showImage = "assets/images/missingImage.jpg";
            };

        // console.log(showImage);


        var newImage = $("<img>").attr("src", showImage);

        var newImageContainer = $("<div>");
        newImageContainer.html(newImage);
        newImage.addClass("image300px img-thumbnail img-box-shadow2");

        var newDescription;

        //create/append header to show details

        var newHeader = $("<h3>");
        newHeader.css("margin-top", "20px");
        newHeader.css("white-space", "normal");

        var locationVenueHolder = $("<p>");
        locationVenueHolder.html(locationVenue);

        var locationAddressHolder = $("<p>");
        locationAddressHolder.html(locationAddress);

        //newDescription.append(newImageContainer);
        newHeader.html(showName.replace(" - New York", ""));

        var newButton = $("<button>");
        newButton.text("Book Show");
        // newButton.attr("id", "display_restaurants");
        newButton.addClass("btn displayBtn");
        newButton.addClass("book_show");
        newButton.addClass("selectShow");

        $("#col1").append(newImage);
        // $("#col1").append(newDescription);
        $("#col1").append(newHeader);
        $("#col1").append(locationVenueHolder);
        $("#col1").append(locationAddressHolder);
        $("#col1").append(newButton);

      } //end of Else
    }); //end of AJAX
  } //end of getShowFunction



  function finalRestaurant() {
    var settings = {
      url: "https://yproxy-01.herokuapp.com/" + restSearcher,
      method: "GET"
        // "headers": {
        //   "authorization": "bearer BMlbQZVu-BuW_8qt2z7In1JzH3DCwTw4r5HZ8HIsulQjlk5GaJ-sfwpqdyrtFvIy4ipucRHExGN6T9nd-cE9uqzW-nEo8UMKUt2e2PWbSOnX-bH-c2Xkltw1j-S7WXYx",
        //   "cache-control": "no-cache",
        // }
    };

    $.ajax(settings).done(function(response) {
      var restFinal = JSON.parse(response);
      fillFinalRestaurant(restFinal);
    });
  };


  var fillFinalRestaurant = function(restFinal) {
    //console.log(restFinal);

    var finalImageContainer = $("<div>");
    var finalImage = $("<img>");

    finalImage.attr("src", restFinal.image_url);
    finalImage.attr("alt", "restImage");
    finalImage.addClass("img-thumbnail thumbnail removeMargin image300px img-box-shadow2");

    finalImageContainer.append(finalImage);

    var finalDescription = $("<div>");

    var finalName = $("<h3>");
    finalName.css("margin-top", "20px")
    finalName.html(restFinal.name);

    var finalRating = $("<p>");
    finalRating.html(restFinal.rating + " Stars");

    var finalCatHolder = $("<p>");
    finalCatHolder.addClass("italics");

    var finalCat = "";


    for (var j = 0; j < restFinal.categories.length; j++) {
      if (j === restFinal.categories.length - 1) {
        finalCat += restFinal.categories[j].title;
      } else {
        finalCat += restFinal.categories[j].title + ", ";
      };
    };


    finalCatHolder.html(finalCat);

    var finalAddress = $("<p>")
    finalAddress.html(restFinal.location.address1 + ", New York, NY");

    var finalURL = restFinal.url;
    // finalDescription.append(finalName);
    // finalDescription.append(finalRating);
    // finalDescription.append(finalCatHolder);
    // finalDescription.append(finalAddress);

    $("#col2").append(finalImage);
    $("#col2").append(finalName);
    $("#col2").append(finalRating);
    $("#col2").append(finalCatHolder);
    $("#col2").append(finalAddress);
    $("#col2").append("<form action=" + finalURL + " target='_blank'> <input class='btn btn-primary' type='submit' value='View Yelp Page' /></form><br>");

  };



  function getShow() {
    // showTitle = 3662794;
    // showTitle = urlID;

    queryURL = "https://api.seatgeek.com/2/events?client_id=ODkxMDA2MnwxNTA1NDc2Njg3Ljkx&client_secret=d03ee2bc8b3508b71abadabe57072965260caf9a20d80887580eb4473fe42620&lat=40.7589&lon=-73.9851&range=2mi&q=" + showTitle + "&taxonomies.id=3030000&taxonomies.name=theater_broadway";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).done(function(response) {
      if (response.events[0] === undefined) {
        loadShowOptions();
      } else {
        //console.log(response);
        var events = response.events[0].short_title;


        if (response.events.length === 0) {
          $("#search-show").val("We're sorry, That show is not found");
          //console.log("this show is not there");
        }
        var showName = response.events[0].short_title;
        //console.log("this is the event ==> " + events);
        var getIndex = showArray.indexOf(events);
        //console.log(getIndex);
        if (getIndex === -1) {
          showArray.push(events);
        }

        //this gets the show name
        var showName = response.events[0].short_title;

        var showID = response.events[0].id;
        //this gets the show location lat and long
        var locationLat = response.events[0].venue.location.lat;
        var locationLon = response.events[0].venue.location.lon;
        //this gets the theatre name
        var locationVenue = response.events[0].venue.name;
        // this gets the venue address
        var locationStreet = response.events[0].venue.address;
        var locationCity = response.events[0].venue.extended_address;
        //var locationZip = response.events[i].venue.postal_code;
        var locationAddress = locationStreet + ", " + locationCity;

        // this gets the image
          var eventName = events.toLowerCase().replace(' - new york', '');
            console.log(eventName);


            if (response.events[0].performers[0].image !== null) {
              showImage = response.events[0].performers[0].image;
              // console.log("&&&&&&&&&&&&&===========+++&&&&&&&&&&&&&");
              // console.log(response.events[i].performers[0].image);

            } else if (!response.events[0].performers[0].image) {

              for (var j = 0; j < backUpImage.length; j++) {
                // console.log("made it to the loop to check the backup images");
                if (backUpImage[j].name == eventName) {
                  showImage = backUpImage[j].image;
                } 
            } 
              } else {
              showImage = "assets/images/missingImage.jpg";
            };

            if (showImage === "") {
              showImage = "assets/images/missingImage.jpg";
            };

        var newImage = $("<img>");
        newImage.attr("src", showImage);

        //Loads content to the page
        var newSuggestion = $("<div id='suggestions' class='row'>");


        var BSimgContainerClasses = "<div class='col-lg-offset-1 col-lg-5 col-md-offset-1 col-md-5 col-sm-offset-1 col-sm-6 col-xs-offset-1 col-xs-10 imgContainer'>"
        var newImageContainer = $(BSimgContainerClasses);
        // var newImage = $("<img>").attr("src", showImage);

        newImage.addClass("img-thumbnail img-box-shadow2 increaseSize");
        newImageContainer.html(newImage);


        var BSdescriptionClasses = "<div id='plot' class='col-lg-offset-1 col-lg-4 col-md-4 col-sm-5 col-xs-offset-2 col-xs-10 descriptionAdjust'>";
        var newDescription = $(BSdescriptionClasses);
        //create/append header to show details
        var newHeader = $("<h3>");
        newHeader.addClass("margin-top");
        newHeader.html(showName.replace(" - New York", ""));
        newDescription.append(newHeader);

        var venueContainer = $("<div>");
        venueContainer.append(locationVenue);
        venueContainer.addClass("theater-name");
        newDescription.append(venueContainer);
        newDescription.append(locationAddress);


        $("#suggestions").append(newImageContainer);
        $("#suggestions").append(newDescription);

        var newAnchor = $("<a>");
        newAnchor.attr("href", showID);
        newAnchor.addClass("topOfDiv" + showID);

        var newButton = $("<button>");
        newButton.text("Nearby Restaurants");
        newButton.attr("id", "display_restaurants");
        newButton.addClass("btn displayBtn");
        newButton.addClass("show_hide2");
        newButton.addClass("selectShow");
        newButton.attr("data-lat", locationLat);
        newButton.attr("data-lon", locationLon);

        newButton.attr("data-id", showID);

        var newSlidingDivId = "#slidingDiv_" + showID;
        newButton.attr("rel", newSlidingDivId);
        // ADD Datavalue for Lat and lon from seat geek to pass into yelp
        newButton.append(newAnchor);

        var newSlidingDiv = "slidingDiv_" + showID;
        newButton.attr("data-value", newSlidingDivId);
        newButton.attr("data-showName", "insert Show name from AJAX");
        newDescription.append(newButton);
        //puts the full Description header, plot, button in newSuggestion DIV
        newSuggestion.append(newDescription);
        //append container into "suggestions"

        var emptyDiv = $("<div class='col-lg-1'>");
        newSuggestion.append(emptyDiv);
        $("#suggestions").append(newSuggestion);
        // add new row for flyout content

        var suggestionContentRow = $("<div class='row'>");
        $("#suggestions").append(suggestionContentRow);
        //create the sliding div NAME and save in var

        var newSlidingDiv = "slidingDiv_" + showID;
        //create div to hold the suggestion content (will populate with Yelp Data)

        var suggestionContent = $("<div>");
        //add ID to pair back to button. newSlidingDiv is the the VAR we created above

        suggestionContent.attr("id", newSlidingDiv);
        suggestionContent.attr("class", "restaurants");
        //append content into the div
        suggestionContent.html("");
        suggestionContentRow.append(suggestionContent);

        var newAnchor = $("<a>");
        newAnchor.attr("href", showID);
        newAnchor.addClass("topOfDiv" + showID);
        suggestionContent.prepend(newAnchor);
        $("#suggestions").append(suggestionContentRow);
        $("#suggestions").append("<hr>");

      } //end of Else
    }); //end of AJAX
  } //end of getShowFunction


  // loads shows on load of home page

  function loadShows() {
    queryURL = "https://api.seatgeek.com/2/events?client_id=ODkxMDA2MnwxNTA1NDc2Njg3Ljkx&client_secret=d03ee2bc8b3508b71abadabe57072965260caf9a20d80887580eb4473fe42620&lat=40.7589&lon=-73.9851&range=2mi&q=broadway&taxonomies.id=3000000&taxonomies.name=theater";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).done(function(response) {
      // console.log(response);
      // sets up suggestions
      var newSuggestion = $("<div id='suggestions' class='row'>");
      //for (var i = 0; i < response.events.length; i++)
      for (var i = 0; i <= 9; i++) {
        //console.log(response.events[i].popularity);
        console.log(response.events[i]);

        var events = response.events[i].short_title;
        console.log(events);

        var showID = response.events[i].id;
        //console.log(showID);
        var getIndex = showArray.indexOf(events);
        //console.log(getIndex);
        if (getIndex === -1) {
          showArray.push(events);
          // console.log(showArray);

          var popularity = parseInt(response.events[i].popularity * 100);

          //var popInt = parseInt(popularity);
          // console.log("this pulls the initial popularity: " + popularity);


          if (popularity > .6 * 100) {
            //this gets the show name
            var results = response.events;
            var events = response.events[i].short_title;
            var popularity = parseInt(response.events[i].popularity);

            //this gets the show location lat and long
            var locationLat = response.events[i].venue.location.lat;
            var locationLon = response.events[i].venue.location.lon;

            //this gets the theatre name
            var locationVenue = response.events[i].venue.name;

            // this gets the venue address
            var locationStreet = response.events[i].venue.address;
            var locationCity = response.events[i].venue.extended_address;

            //var locationZip = response.events[i].venue.postal_code;
            var locationAddress = locationStreet + ", " + locationCity;
            var location = locationLat + "," + locationLon;

            // this gets the image
            //console.log(response.events[i].performers[0].image.huge);

            var eventName = events.toLowerCase().replace(' - new york', '');
            console.log(eventName);


            if (response.events[i].performers[0].image !== null) {
              showImage = response.events[i].performers[0].image;
              // console.log("&&&&&&&&&&&&&===========+++&&&&&&&&&&&&&");
              // console.log(response.events[i].performers[0].image);

            } else if (!response.events[i].performers[0].image) {

              for (var j = 0; j < backUpImage.length; j++) {
                // console.log("made it to the loop to check the backup images");
                if (backUpImage[j].name == eventName) {
                  showImage = backUpImage[j].image;
                } 
            } 
              } else {
              showImage = "assets/images/missingImage.jpg";
            };

            if (showImage === "") {
              showImage = "assets/images/missingImage.jpg";
            };


            //code for images
            console.log("image is here");
            console.log("image URL: " + showImage);
            var BSimgContainerClasses = "<div class='col-lg-4 col-md-4 col-sm-6 col-xs-12 imgContainer'>";

            var mainImageContainer = $(BSimgContainerClasses);

            mainImageContainer.addClass("mainImageContainer");
            var containerID = "option" + i;


            //Creates Link URLS for show display
            var showLink = "ID=" + showID + "&" + "event=" + events + "&" + "lat=" + locationLat + "&" + "lon=" + locationLon;


            var link = $("<a>");
            var createHref = "show-display.html?" + showLink;
            link.attr("href", createHref);
            //END OF create Link URLS for show display
            var newImage = $("<img>").attr("src", showImage);
            //newImage.attr("src", showImage);
            newImage.addClass("recoImage img-thumbnail");
            newImage.addClass("img-box-shadow");
            mainImageContainer.append(newImage);
            newSuggestion.append(mainImageContainer);
            link.html(mainImageContainer);



            $("#suggestions").append(link);
            var newTitle = $("<h2>");
            newTitle.addClass("mainPageTitle");
            newTitle.html(events.replace(' - New York', ''));
            $(mainImageContainer).append(newTitle);
          } else if (popularity < .5 * 100) {

          }
        }
        showImage = "";
      } //end for loop
    }); //end of loadShowFunction
  }


  function yelpDisplay() {
    //console.log("made it to yelp");
    var locationVar = ""
    var getLat = $(this).attr("data-lat");
    var getLon = $(this).attr("data-lon");
    var locationVar = getLat + "%20" + getLon;

    var settings = {
      url: "https://yproxy-01.herokuapp.com/search?location=" + locationVar + "&term=restaurant&limit=3&radius=250",
      method: "GET"
        // "headers": {
        //   "authorization": "bearer BMlbQZVu-BuW_8qt2z7In1JzH3DCwTw4r5HZ8HIsulQjlk5GaJ-sfwpqdyrtFvIy4ipucRHExGN6T9nd-cE9uqzW-nEo8UMKUt2e2PWbSOnX-bH-c2Xkltw1j-S7WXYx",
        //   "cache-control": "no-cache",
        // }
    };

    $.ajax(settings).done(function(response) {
      // console.log(JSON.parse(response));
      var resp = JSON.parse(response);
      loadRestaurantOptions(resp);
    });
  };



  var loadRestaurantOptions = function(resp) {

    $(".restaurants").empty();

    $(".restaurants").append("<hr>");

    for (var i = 1; i < 4; i++) {
      var k = i - 1;
      var restContainer = $("<div class='row'>");

      var restImageContainer = $(
        "<div class='col-lg-offset-2 col-lg-3 col-md-offset-2 col-md-4 col-sm-offset-2 col-sm-4'>"
      );
      var restImage = $("<img>");
      restImage.attr("src", resp.businesses[k].image_url);
      restImage.attr("alt", "restImage");
      restImage.addClass("img-thumbnail thumbnail img-box-shadow2");

      restImageContainer.html(restImage);

      var restDescription = $("<div class='col-lg-4 col-md-5 col-sm-5'>");

      var restTitle = $("<h2>");
      restTitle.addClass("restTitle");

      var restName = resp.businesses[k].name;

      restTitle.html(restName);

      restDescription.append(restTitle);

      var restRating = resp.businesses[k].rating;

      restDescription.append(restRating + " Stars" + "<br>");
      restDescription.addClass("descriptions");

      var restReview = $("<p>");
      restReview.addClass("italics descriptions");
      var restCat = "";


      // restReview.addClass("descriptions");
      // UNCOMMENT THIS FOR LOOP ONCE THE API IS SET UP!!!
      for (var j = 0; j < resp.businesses[k].categories.length; j++) {
        if (j === resp.businesses[k].categories.length - 1) {
          restCat += resp.businesses[k].categories[j].title;
        } else {
          restCat += resp.businesses[k].categories[j].title + ", ";
        };
      };

      restReview.append(restCat);

      restDescription.append(restReview);

      restAddress = resp.businesses[k].location.address1 + ", New York, NY";

      restDescription.append(restAddress + "<br>");

      // restURL = resp.businesses[k].url;

      // console.log("================");
      // console.log(resp);
      // console.log("================");
      // console.log(resp.businesses[k].coordinates.latitude);

      // console.log(resp.businesses[k].coordinates.longitude);


      var restLat = resp.businesses[k].coordinates.latitude;
      var restLon = resp.businesses[k].coordinates.longitude;

      var restID = resp.businesses[k].id;

      var getItinBtn = $("<button>");

      getItinBtn.addClass("btn");
      getItinBtn.html("Select This Restaurant");
      getItinBtn.attr("data-rest", restID);
      getItinBtn.attr("data-lat", restLat);
      getItinBtn.attr("data-lon", restLon);
      getItinBtn.addClass("itin-button");

      restContainer.append(restImageContainer);

      restDescription.append(getItinBtn);

      restContainer.append(restDescription);

      $(".restaurants").append(restContainer);


      if (i < 3) {
        $(".restaurants").append("<hr>");
      }

    }
  };



  function loadShowOptions() {

    var headerDiv = $("<div>");
    headerDiv.attr("id", "alert-message");
    headerDiv.append("We're Sorry. We can not locate that show. Please search again or choose from the shows below.");
    $("#alert-header").append(headerDiv);

    queryURL = "https://api.seatgeek.com/2/events?client_id=ODkxMDA2MnwxNTA1NDc2Njg3Ljkx&client_secret=d03ee2bc8b3508b71abadabe57072965260caf9a20d80887580eb4473fe42620&lat=40.7589&lon=-73.9851&range=2mi&q=broadway&taxonomies.id=3000000&taxonomies.name=theater";
    $.ajax({
      url: queryURL,
      method: "GET",
      dataType: "json"
    }).done(function(response) {

      for (var i = 1; i < 6; i++) {
        //create container

        var newSuggestion = $("<div id='suggestions' class='row'>");

        //create/append image container

        var BSimgContainerClasses =
          "<div class='imgContainer col-lg-offset-2 col-lg-4 col-md-5 col-sm-5'>";

        var newImageContainer = $(BSimgContainerClasses);
        var showID = response.events[i].id;

        var newImage = $("<img>");
        newImage.addClass("img-box-shadow2")

        //var loop = response.events[i].performers.length;

        // var counter = 0;
        // // this gets the image
        // for (var j = 0; j < response.events[i].performers.length; j++) {
        //   counter++;

        //   if (response.events[i].performers[j].image != null) {
        //     showImage = response.events[i].performers[j].image;
        //   } else {
        //     showImage = "assets/images/missingImage.jpg";
        //   }
        // }

        var events = response.events[i].short_title; 

        var eventName = events.toLowerCase().replace(' - new york', '');
            console.log(eventName);


            if (response.events[i].performers[0].image !== null) {
              showImage = response.events[i].performers[0].image;
              // console.log("&&&&&&&&&&&&&===========+++&&&&&&&&&&&&&");
              // console.log(response.events[i].performers[0].image);

            } else if (!response.events[i].performers[0].image) {

              for (var j = 0; j < backUpImage.length; j++) {
                // console.log("made it to the loop to check the backup images");
                if (backUpImage[j].name == eventName) {
                  showImage = backUpImage[j].image;
                } 
            } 
              } else {
              showImage = "assets/images/missingImage.jpg";
            };

            if (showImage === "") {
              showImage = "assets/images/missingImage.jpg";
            };


        var newImage = $("<img>").attr("src", showImage);

        newImage.addClass("recoImage img-thumbnail");
        newImage.addClass("img-box-shadow");

        newImageContainer.html(newImage);

        //appends the IMAGE to newSuggestion DIV
        newSuggestion.append(newImageContainer);

        //create container to hold show details

        var BSdescriptionClasses =
          "<div id='plot' class='col-lg-offset-1 col-lg-4 col-md-offset-1 col-md-5 col-sm-5 descriptionAdjust'>";
        var newDescription = $(BSdescriptionClasses);

        //create/append header to show details
        var newHeader = $("<h3>");

        newHeader.html(response.events[i].short_title.replace(" - New York", ""));
        newDescription.append(newHeader);

        //create/append paragraph to venue details

        var locationStreet = response.events[i].venue.address;
        var locationCity = response.events[i].venue.extended_address;

        var newDiv = $("<div>");

        newDescription.append(response.events[i].venue.name + "<br>").addClass("theatreName");
        newDescription.append(response.events[i].venue.address + ", " + response.events[i].venue.extended_address).addClass("address");



        //create/append Button

        var newAnchor = $("<a>");
        newAnchor.attr("href", i);
        newAnchor.addClass("topOfDiv" + i);

        var newButton = $("<button>");
        newButton.text("Nearby Restaurants");
        newButton.attr("id", "display_restaurants");

        newButton.addClass("btn");

        var locationLat = response.events[i].venue.location.lat;
        var locationLon = response.events[i].venue.location.lon;

        newButton.attr("data-lat", locationLat);
        newButton.attr("data-lon", locationLon);
        newButton.attr("data-id", showID);
        newButton.addClass("selectShow");

        newButton.addClass("show_hide2 displayBtn");


        var newSlidingDivId = "#slidingDiv_" + i;

        newButton.attr("rel", newSlidingDivId);

        newButton.append(newAnchor);

        var newSlidingDiv = "slidingDiv_" + i;

        newButton.attr("data-value", newSlidingDivId);

        newButton.attr("data-showName", "insert Show name from AJAX");

        newDescription.append(newButton);

        //puts the full Description header, plot, button in newSuggestion DIV

        newSuggestion.append(newDescription);

        //append container into "suggestions"
        var emptyDiv = $("<div class='col-lg-1'>");
        newSuggestion.append(emptyDiv);

        $("#suggestions").append(newSuggestion);

        // add new row for flyout content
        var suggestionContentRow = $("<div class='row'>");

        $("#suggestions").append(suggestionContentRow);

        //create the sliding div NAME and save in var
        var newSlidingDiv = "slidingDiv_" + i;

        //create div to hold the suggestion content (will populate with Yelp Data)

        var suggestionContent = $("<div>");

        //add ID to pair back to button. newSlidingDiv is the the VAR we created above

        suggestionContent.attr("id", newSlidingDiv);
        suggestionContent.attr("class", "restaurants");

        //append content into the div

        suggestionContent.html("");

        suggestionContentRow.append(suggestionContent);

        var newAnchor = $("<a>");
        newAnchor.attr("href", i);
        newAnchor.addClass("topOfDiv" + i);
        suggestionContent.prepend(newAnchor);

        $("#suggestions").append(suggestionContentRow);
        $("#suggestions").append("<hr>");
      }
    }); //end of ajax for load show Options
  }

  // This function opens/closes the content divs

  var show = false;
  var openDiv;


  function updateHeader() {
    $("#headerLogo").removeClass("mainLogo");
    $("#headerLogo").addClass("mainLogoSub");
    // $("#headerLogo").addClass("col-lg-offset-1 col-lg-5");
    $("#mainSearch").addClass("mainSearchSub");
    var headerText = $("<div>").attr("class", "header-text");
    headerText.append("<p class='header-text'>The easiest place to get tickets & find a great place to eat.</p>");
    $("#mainSearch").prepend(headerText);

    // $("#mainSearch").addClass("col-lg-offset-1 col-lg-5");
  }

  function showHideActivate(currentDiv) {
    // var latitude = $(this).attr("data-lat");
    // var longitude = $(this).attr("data-lon");


    if (show != true) {
      $(currentDiv).slideDown("slow", function() {
        show = true;
        openDiv = currentDiv;

        $("html,body").animate({
            scrollTop: $(currentDiv).offset().top
          },
          "slow"
        );
      });
    } else if (openDiv === currentDiv) {
      $(openDiv).slideUp("slow", function() {
        show = false;
      });
    } else if (openDiv != currentDiv) {
      $(openDiv).slideUp("slow", function() {});

      $(currentDiv).slideDown("slow", function() {
        show = true;

        $("html,body").animate({
            scrollTop: $(currentDiv).offset().top
          },
          "slow"
        );

        openDiv = currentDiv;
      });
    }
  }

  //HERE


  $(document).on("click", ".show_hide2", function() {
    showHideActivate($(this).attr("data-value"));
  });


  function randomRestaurant() {
    var respRand;
    var settings = {
      url: "https://yproxy-01.herokuapp.com/search?location=220%20West%2048th%20Street%2C%20New%20York%2C%20NY&term=restaurant&limit=20&radius=804",
      method: "GET"
        // "headers": {
        //   "authorization": "bearer BMlbQZVu-BuW_8qt2z7In1JzH3DCwTw4r5HZ8HIsulQjlk5GaJ-sfwpqdyrtFvIy4ipucRHExGN6T9nd-cE9uqzW-nEo8UMKUt2e2PWbSOnX-bH-c2Xkltw1j-S7WXYx",
        //   "cache-control": "no-cache",
        // }
    };
    $.ajax(settings).done(function(response) {
      var resp = JSON.parse(response);
      randNum = Math.floor(Math.random() * 20)
      respRand = resp.businesses[randNum];
      // console.log(respRand);
      fillRandomRestaurant(respRand);
    });
  };


  var fillRandomRestaurant = function(respRand) {
    // console.log(respRand);
    var randImageContainer = $("<div class='col-lg-offset-2 col-lg-4 col-md-4 col-sm-4 '>");
    var randImage = $("<img>");
    randImage.attr("src", respRand.image_url);
    randImage.attr("alt", "restImage");
    randImage.addClass("img-thumbnail thumbnail removeMargin");
    randImageContainer.html(randImage);

    var randDescription = $("<div class='col-lg-5 col-md-5 col-sm-5'>");
    var randName = $("<h3>");
    randName.addClass("margin-top");
    randName.html(respRand.name);

    var randRating = $("<p>");
    randRating.html(respRand.rating + " Stars");

    var randCatHolder = $("<p>");
    randCatHolder.addClass("italics");

    var randCat = "";


    for (var j = 0; j < respRand.categories.length; j++) {
      if (j === respRand.categories.length - 1) {
        randCat += respRand.categories[j].title;
      } else {
        randCat += respRand.categories[j].title + ", ";
      };

    };

    randCatHolder.html(randCat);



    var randAddress = $("<p>")
    randAddress.html(respRand.location.address1 + ", New York, NY");
    var randURL = respRand.url;
    randDescription.append(randName);
    randDescription.append(randRating);
    randDescription.append(randCatHolder);
    randDescription.append(randAddress);
    randDescription.append("<form action=" + randURL + " target='_blank'> <input class='btn btn-primary' type='submit' value='View Yelp Page' /></form><br>");
    $("#rand-rest-reco").append(randImageContainer);
    $("#rand-rest-reco").append(randDescription);
  };


  //PREPARE MAP
  function prepareMap() {
    parseURL();

    var venueLat = showLatg;
    var venueLon = showLong;

    var dinnerLat = restLat;
    var dinnerLon = restLon;

    // console.log(restLat + "," + restLon);

    var origin = dinnerLat + ", " + dinnerLon;
    var destination = venueLat + ", " + venueLon;

    var map = document.createElement("iframe");
    $("iframe").addClass("map");
    map.setAttribute("src", "https://www.google.com/maps/embed/v1/directions?key=AIzaSyA2puDgcNjDOXQdRdO5kmgxHjjbCvYBa7Q&origin=" + origin + "&destination=" + destination + "&mode=walking");
    map.style.width = "400px";
    map.style.height = "360px";
    $("#google-map").html(map);
  } //End prepareMap Function

  //PREPARE WEATHER
  function prepareWeather() {



    var queryURL = "https://api.openweathermap.org/data/2.5/weather?zip=10019,us&appid=5f0ec8197da4fafcec187f9767cb2040";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // console.log(response);

      var iconImage = $("<img>");
      var weatherDescription = response.weather[0].description;
      var weatherID = response.weather[0].icon;

      // console.log(weatherID);


      if (weatherID === "01d") {
        $("#icon").addClass("sunny");
      } else if (weatherID === "01n") {
        $("#icon").addClass("clearNight");
      } else if (weatherID === "02d") {
        $("#icon").addClass("partlyCloudyDay");
      } else if (weatherID === "02n") {
        $("#icon").addClass("partlyCloudyNight");
      } else if (weatherID === "03d" || weatherID === "03n" || weatherID === "04d" || weatherID === "04n") {
        $("#icon").addClass("cloudy");
      } else if (weatherID === "09d" || weatherID === "09n") {
        $("#icon").addClass("lightRain");
      } else if (weatherID === "10d" || weatherID === "10n") {
        $("#icon").addClass("rain");
      } else if (weatherID === "11d" || weatherID === "11n") {
        $("#icon").addClass("thunderstorm");
      } else if (weatherID === weatherID === "13d" || weatherID === "13n") {
        $("#icon").addClass("snow");
      } else if (weatherID === "50d" || weatherID === "50n") {
        $("#icon").addClass("fog");
      }
      //End if Statement

      //TEMP CONVERSION
      var currentTemp = JSON.stringify(response.main.temp);
      var tempConverted = currentTemp * 9 / 5 - 459.67;
      var finalTemp = Math.round(tempConverted * 10) / 10;
      finalTemp = Math.floor(finalTemp);

      var maxTemp = JSON.stringify(response.main.temp_max);
      var maxTempConverted = maxTemp * 9 / 5 - 459.67;
      var finalMaxTemp = Math.round(maxTempConverted * 10) / 10;
      finalMaxTemp = Math.floor(finalMaxTemp);

      var minTemp = JSON.stringify(response.main.temp_min);
      var minTempConverted = minTemp * 9 / 5 - 459.67;
      var finalMinTemp = Math.round(minTempConverted * 10) / 10;
      finalMinTemp = Math.floor(finalMinTemp);

      //DISPLAY WEATHER
      $("#icon").html(iconImage);
      $("#weather-description").html(weatherDescription);
      $("#temp").html(finalTemp + " °F");
      $("#maxTemp").html("Hi: " + finalMaxTemp + " °F");
      $("#minTemp").html("Low: " + finalMinTemp + " °F");
      $("#humidity").html("Humidity: " + response.main.humidity + "%");
      $("#wind").html("Wind: " + response.wind.speed + "mph");

    })
  } //End prepareWeather function


  function parseURL() {
    var getParams = new URLSearchParams(window.location.search);

    //console.log(getParams.get("restID"));
    var urlID = getParams.get("ID");
    var urlEvent = getParams.get("event");
    var urlLat = getParams.get("lat");
    var urlLon = getParams.get("lon");
    var restNameVar = getParams.get("restID");
    var showNameVar = getParams.get("showID");
    var restURLLat = getParams.get("restLat");
    var restURLLon = getParams.get("restLon");

    var showURLLat = getParams.get("showLat");
    var showURLLon = getParams.get("showLon");


    // console.log(urlID);
    // console.log(urlEvent);
    // console.log(urlLat);
    // console.log(urlLon);
    showTitle = urlID;
    showSearcher = showNameVar;
    restSearcher = restNameVar;

    restLat = restURLLat;
    restLon = restURLLon;

    showLatg = showURLLat;
    showLong = showURLLon;


  };



  if (page === "index.html") {
    loadShows();
    parseURL();
    randomRestaurant();


  };
  if (page === "showDisplay") {
    parseURL();
    // yelpDisplay();
    getShow();

    //loadSelectedShow();
    // loadRestaurantOptions();
    updateHeader();
  };

  if (page === "itinerayDisplay") {

    prepareMap();
    prepareWeather();
    loadShows();
    //parseURL();
    getShowItin();
    finalRestaurant();
    updateHeader();

  };



  $(document).on("click", ".book_show", goToSeatGeek);
  $(document).on("click", ".selectShow", selectShow);
  $(document).on("click", ".itin-button", getItinerary);
  $(document).on("click", ".mainImageContainer", getShow);
  // $(document).on("click", ".show_hide2", showHideActivate);
  $(document).on("click", ".show_hide2", yelpDisplay);



});
