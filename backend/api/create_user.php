<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$request = new \stdClass();

if (isset($_POST)) {
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    $name = $data->name;
    $email = $data->email;
    $password = $data->password;
    $dob = $data->dob;

    if ($name && $email && $password && $dob) {


        $insertData = [
            "name" => $name,
            "email" => $email,
            "password" => $password,
            "dob" => $dob,
            "deleted" => "no",
        ];

        $result = $core->add('users', $insertData);

        if ($result) {
            $request->meta = [
                "error" => false,
                "message" => 'User created successfully.',
            ];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Failed to create user. Please try again.',
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Invalid or incomplete data provided.',
        ];
    }
}

echo json_encode($request);
?>