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

    if ($id) {
        $updateData = ["deleted" => "yes"];
        $condition = "id=$id";
        $result = $core->update('users', $updateData, $condition);

        if ($result) {
            $request->meta = [
                "error" => false,
                "message" => 'User deleted successfully.',
            ];
        } else {
            $request->meta = [
                "error" => true,
                "message" => 'Failed to delete user. Please try again.',
            ];
        }
    } else {
        $request->meta = [
            "error" => true,
            "message" => 'Invalid user ID provided.',
        ];
    }
} 

echo json_encode($request);
?>
