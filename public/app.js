// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== 'granted')
    Notification.requestPermission();
});

function notifyMe() {
  if (Notification.permission !== 'granted')
    Notification.requestPermission();
  else {
    var notification = new Notification('WARNING!', {
      icon: 'https://medium-iot-demo.firebaseapp.com/favicon.png',
      body: 'Gas Leak Detected!'
    });

    notification.onclick = function () {
      window.open('https://medium-iot-demo.firebaseapp.com');
    };
  }
}

function heartOn(){
	document.getElementById('heartID').src='images/hearton.png';
	console.log('HEART ON');
}

function heartOff(){
	document.getElementById('heartID').src='images/heartoff.png';
	console.log('HEART OFF');
}

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
			tempElement.innerText = childData + '°C';
		});
	});
	humRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("humidity: " + childData);
			humElement.innerText = childData + '%';
		});
	});
	gasRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("gas: " + childData);
			if (childData == '0') {
				gasElement.innerText = 'Gas Detected!'
				notifyMe();
			} else {
				gasElement.innerText = childData;
			}
		});
	});
	heartRef.limitToLast(1).on('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childData = childSnapshot.val();
			console.log("heartbeat: " + childData);
			if (childData == 1) {
				heartOn();
			} else if(childData == 0) {
				heartOff();
			}
			// heartbeatElement.innerText = childData;
		});
	});

}());