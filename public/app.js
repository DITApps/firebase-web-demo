(function() {

	firebase.initializeApp(config);

	// Get a reference to the database service
	var database = firebase.database();

	// Get element from the DOM
	const tempElement = document.getElementById('temperature');
	const humElement = document.getElementById('humidity');
	const gasElement = document.getElementById('gas');
	const heartbeatElement = document.getElementById('status');
	// Create temperature database reference
	const tempRef = database.ref('dht11').child('temperature');

	// Create humidity database reference
	const humRef = database.ref('dht11').child('humidity');

	// Create gas database reference
	const gasRef = database.ref('mq5').child('gasStatus');

	// Create heartbeat database reference
	const heartRef = database.ref('status').child('heartbeat');

	// Sync objects changes
	tempRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("temperature: " + childData);
			tempElement.innerText = childData;
		});
	});
	humRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("humidity: " + childData);
			humElement.innerText = childData;
		});
	});
	gasRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("gas: " + childData);
			gasElement.innerText = childData;
		});
	});
	heartRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("heartbeat: " + childData);
			heartbeatElement.innerText = childData;
		});
	});

}());