// Initialize Firebase
var config = {
    apiKey: "AIzaSyCTcskWO5ZrfOOhIHwSvg7I0OOkDFhLCKc",
    authDomain: "trainschedulehomework-6bf93.firebaseapp.com",
    databaseURL: "https://trainschedulehomework-6bf93.firebaseio.com",
    projectId: "trainschedulehomework-6bf93",
    storageBucket: "trainschedulehomework-6bf93.appspot.com",
    messagingSenderId: "208430608820"
  };
  firebase.initializeApp(config);
console.log("initialize firebase");

// create on click function for submitted new train
$("#addNewTrain").on("click", function(e){
    e.preventDefault();

	// Get new train name and schedule input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainTime = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// Creates temporary storage for holding new train data
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainTime,
		frequency: frequency
	}
   
	// Uploads train data to the firebase
    trainData.ref().push(newTrain);
    
    //logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination); 
	console.log(newTrain.firstTrain);
	console.log(newTrain.frequency)

     // Alert
    alert("New Train Schedule Added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;
});


// Create Firebase event for adding trains to the database and add an new row in the html
trainData.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var FirstTrainSchedule = childSnapshot.val().firstTrain;

//calculator function:
	// Calculating length of time before arrival =  Current time - FirstTrain time  
	var diffTimes = moment().diff(moment.unix(FirstTrainSchedule), "minutes");
	var tBeforeArrival = moment().diff(moment.unix(FirstTrainSchedule), "minutes") % tFrequency ;
	var minutesL = tFrequency - tBeforeArrival;

	// Calculating arrivalT = Current Time + minutesL
	var arrivalT = moment().add(minutesL, "m").format("hh:mm A"); 
	console.log(minutesL);
	console.log(arrivalT);

	console.log(moment().format("hh:mm A"));
	console.log(arrivalT);
	console.log(moment().format("X"));

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + arrivalT + "</td><td>" + minutesL + "</td></tr>");

});


