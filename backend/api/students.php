<?php
$conn = include "db.php"; // shared DB connection + auto-table creation

$method = $_SERVER['REQUEST_METHOD'];

// Extract ID if exists in URL
$requestUri = trim(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH), '/');
$path = explode('/', $requestUri);
$id = is_numeric(end($path)) ? intval(end($path)) : null;

/* ------------------------------------------------------
   GET: Fetch All Students OR Single Student
------------------------------------------------------ */
if ($method === "GET") {

    if ($id) {
        $sql = "SELECT * FROM students WHERE id=$id";
        $result = $conn->query($sql);
        echo json_encode($result->fetch_assoc() ?: []);
    } else {
        $data = [];
        $result = $conn->query("SELECT * FROM students");
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
    }
}

/* ------------------------------------------------------
   POST: Create New Student
------------------------------------------------------ */
elseif ($method === "POST") {
    $input = json_decode(file_get_contents("php://input"));

    $name  = $conn->real_escape_string($input->name ?? "");
    $email = $conn->real_escape_string($input->email ?? "");
    $age   = intval($input->age ?? 0);

    if (!$name || !$email) {
        echo json_encode(["error" => "Name and Email are required"]);
        exit;
    }

    $sql = "INSERT INTO students (name, email, age) VALUES ('$name', '$email', $age)";
    if ($conn->query($sql)) {
        echo json_encode(["message" => "Student added", "id" => $conn->insert_id]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }
}

/* ------------------------------------------------------
   PUT: Update Student
------------------------------------------------------ */
elseif ($method === "PUT" && $id) {
    $input = json_decode(file_get_contents("php://input"));

    $name  = $conn->real_escape_string($input->name ?? "");
    $email = $conn->real_escape_string($input->email ?? "");
    $age   = intval($input->age ?? 0);

    $sql = "UPDATE students SET name='$name', email='$email', age=$age WHERE id=$id";

    echo $conn->query($sql)
        ? json_encode(["message" => "Student updated"])
        : json_encode(["error" => $conn->error]);
}

/* ------------------------------------------------------
   DELETE: Remove Student
------------------------------------------------------ */
elseif ($method === "DELETE" && $id) {
    $sql = "DELETE FROM students WHERE id=$id";
    echo $conn->query($sql)
        ? json_encode(["message" => "Student deleted"])
        : json_encode(["error" => $conn->error]);
}

/* ------------------------------------------------------
   INVALID REQUEST
------------------------------------------------------ */
else {
    echo json_encode(["error" => "Invalid Request"]);
}
?>
