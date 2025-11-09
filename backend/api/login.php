<?php
$conn = include "db.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method !== "POST") {
    echo json_encode(["error" => "Only POST allowed"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

$email    = $conn->real_escape_string($data->email ?? "");
$password = $data->password ?? "";

if (!$email || !$password) {
    echo json_encode(["error" => "Email & password required"]);
    exit;
}

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found"]);
    exit;
}

$user = $result->fetch_assoc();

if (password_verify($password, $user["password"])) {
    echo json_encode([
        "message" => "Login successful",
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "email" => $user["email"]
        ]
    ]);
} else {
    echo json_encode(["error" => "Invalid password"]);
}
?>
