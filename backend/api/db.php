<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// DB config
$host = "localhost";
$user = "root";
$pass = "";
$dbname = "student_db";

// Connect to MySQL (NO database first)
$conn = new mysqli($host, $user, $pass);

if ($conn->connect_error) {
    die(json_encode(["error" => "MySQL connection failed: " . $conn->connect_error]));
}

/* --------------------------------------------------
   1️⃣ CREATE DATABASE (ONLY IF NOT EXISTS)
-------------------------------------------------- */
$conn->query("CREATE DATABASE IF NOT EXISTS `$dbname`");

/* --------------------------------------------------
   2️⃣ SELECT DATABASE
-------------------------------------------------- */
$conn->select_db($dbname);

/* --------------------------------------------------
   3️⃣ CREATE TABLES (ONLY IF NOT EXISTS)
-------------------------------------------------- */

// Students table
$conn->query("
    CREATE TABLE IF NOT EXISTS students (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        age INT
    )
");

// Users table
$conn->query("
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        password VARCHAR(255)
    )
");

/* --------------------------------------------------
   RETURN CONNECTION (USED BY ALL API FILES)
-------------------------------------------------- */
return $conn;
?>
