<?php
function sanitize($value) {
  return htmlspecialchars(stripslashes(trim($value)));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $data = [
    "firstName" => sanitize($_POST["firstName"]),
    "lastName" => sanitize($_POST["lastName"]),
    "email" => sanitize($_POST["email"]),
    "phone" => sanitize($_POST["phone"]),
    "comments" => sanitize($_POST["comments"]),
    "date" => date("Y-m-d H:i:s")
  ];

  $file = "submissions.json";
  $existing = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
  $existing[] = $data;
  file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT));

  // Send confirmation to user
  $userMessage = "Hi {$data['firstName']},\n\nThank you for reaching out to Movie Favorites.";
  mail($data['email'], "Thanks for your submission", $userMessage, "From: chamodmadhuranga7@gmail.com");

  // Notify admins
  $adminMsg = "New Submission:\n" . print_r($data, true);
  $admins = ["dumidu.kodithuwakku@ebeyonds.com", "prabhath.senadheera@ebeyonds.com"];
  foreach ($admins as $admin) {
    mail($admin, "New Contact Submission", $adminMsg, "From: chamodmadhuranga7@gmail.com");
  }

  echo "Success!";
} else {
  echo "Invalid request.";
}
?>
