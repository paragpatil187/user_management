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
    $id = $data->id;
    $name = $data->name;
    $email = $data->email;
    $dob = $data->dob;
    $password = $data->password;

    if ($id && $name && $email && $dob && $password) {
        $updateData = [
            "name" => $name,
            "email" => $email,
            "dob" => $dob,
            "password" =>$password,
        ];
        $condition = "id=$id AND deleted='no'";
        $result = $core->update('users', $updateData, $condition);

        if ($result) {
            $request->meta = [
                "error" => false,
                "message" => 'User updated successfully.',
            ];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Failed to update user. Please try again.',
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