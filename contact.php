<?php
	$name = $email = $message = "";

// Get post data
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$name = test_input($_POST['name']);
		$email = test_input($_POST['email']);
		$message = test_input($_POST['message']);

		// Falls eine Zeile der Nachricht mehr als 70 Zeichen enthälten könnte,
		// sollte wordwrap() benutzt werden
		$nachricht = 'Name:	' . $name . '
' . 'Email: 	' . $email . '
		
Nachricht:
-----------------------------------------------------------------------------------
' . $message . '
-----------------------------------------------------------------------------------';
		$nachricht = wordwrap($nachricht, 70);

		// Betreff
		$betreff = 'Neue Mail von Rentog.com';

	// Send email
		$erg = mail('info@rentog.com', $betreff, $nachricht);


	// Database access
		$servername = "db577347580.db.1and1.com";
		$username = "dbo577347580";
		$password = "asdfjk324AGAk123$";
		$dbname = "db577347580";

		// Create connection
		$conn = new mysqli($servername, $username, $password, $dbname);
		// Check connection
		if ($conn->connect_error) {
			die("Connection failed: " . $conn->connect_error);
		}

		// sql to create table
		$sql = "CREATE TABLE IF NOT EXISTS Messages(
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		name VARCHAR(30) NOT NULL,
		email VARCHAR(30) NOT NULL,
		message VARCHAR(500),
		reg_date TIMESTAMP
		)";

		if ($conn->query($sql) === TRUE) {
			//echo "Table MyGuests created successfully\n";
		} else {
			//echo "Error creating table: " . $conn->error;
            echo "error";
		}

		// Insert Form data into table
		$sql = "INSERT INTO Messages (name, email, message) VALUES ('" . $name . "', '" . $email . "', '" . $message . "')";

		if ($conn->query($sql) === TRUE) {
			echo "success";
		} else {
			//echo "Error: " . $sql . "<br>" . $conn->error;
            echo "error";
		}

		// Close Database connection
		$conn->close();
	}


	function test_input($data) {
	  $data = trim($data);
	  $data = stripslashes($data);
	  $data = htmlspecialchars($data);
	  return $data;
	}
?>