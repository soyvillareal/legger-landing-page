<?php

$conn = @new mysqli(C_HOSTNAME, C_USERNAME, C_PASSWORD, C_DATABASE);

// $conn->set_charset('utf8mb4');

$dba = new db($conn);

?>