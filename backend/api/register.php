<?php
$conn = include "db.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method !== "POST") {
    echo json_encode(["error" => "Only POST allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

$name     = $conn->real_escape_string($data->name ?? "");
$email    = $conn->real_escape_string($data->email ?? "");
$password = $data->password ?? "";

if (!$name || !$email || !$password) {
    echo json_encode(["error" => "All fields are required"]);
    exit;
}

// Check if email exists
$check = $conn->query("SELECT * FROM users WHERE email='$email'");
if ($check->num_rows > 0) {
    echo json_encode(["error" => "Email already exists"]);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_BCRYPT);

$sql = "INSERT INTO users (name, email, password) 
        VALUES ('$name', '$email', '$hashedPassword')";

if ($conn->query($sql)) {
    echo json_encode(["message" => "User registered successfully"]);
} else {
    echo json_encode(["error" => $conn->error]);
}
?>
