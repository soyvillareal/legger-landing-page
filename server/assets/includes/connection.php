<?php

$hostname = 'localhost'; // Server name
$username = 'root'; // Database user
$password = ''; // Database password
$database = 'legger'; // Database name

$conn = @new mysqli($hostname, $username, $password, $database);
// $conn->set_charset('utf8mb4');
$dba = new db($conn);