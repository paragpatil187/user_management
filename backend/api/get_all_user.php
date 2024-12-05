<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header('Content-Type: application/json');
require('../inc/core.php');
$core = new Core();
$request = new \stdClass();
$condition = "deleted='no'";
$users = $core->get_all('users', '*', $condition);
$request->meta = [
    "error" => false,
    "message" => 'Successfull',
];
$request->users = $users;

echo json_encode($request);
?>