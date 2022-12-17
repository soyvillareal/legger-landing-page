<?php
require('./assets/init.php');
header("Access-Control-Allow-Origin: " . C_ORIGIN);
header("Content-Type: application/json; charset=UTF-8");

if (!empty($_GET)) {
    if (isset($_GET['action'])) {
        if ($_GET['action'] == 'create-user') {
            // Create user
            // This is for practical purposes only. This is not even remotely safe :s
            if (!empty($_GET['key'])) {
                if ($_GET['key'] == '2d25aec7017b791dc1c62270aed6dd3d') {
                    $username = Functions::RandomKey(12, 16, false);
                    $passwordWitoutHash = Functions::RandomKey(12, 20);
                    $password = password_hash($passwordWitoutHash, PASSWORD_BCRYPT, ['cost' => 12]);
                    $insertId = $dba->query('INSERT INTO ' . T_USER . ' (username, password, created_at) VALUES (?, ?, ?)', $username, $password, date('Y-m-d', time()))->insertId();
                    if ($insertId) {
                        echo "Credenciales:";
                        echo "<br />";
                        echo "Tu usuario: $username";
                        echo "<br />";
                        echo "Tu contraseña: $passwordWitoutHash";
                    }
                } else {
                    $response['code'] = 401;
                    $response['message'] = 'Unauthorized';
                }
            } else {
                $response['code'] = 401;
                $response['message'] = 'Unauthorized';
            }
        } else {
            $response = array(
                'code' => 400,
                'message' => 'Data is incomplete.'
            );

            $action = $_GET['action'];

            if ($action !== 'read') {
                header("Access-Control-Allow-Methods: POST");
                header("Access-Control-Max-Age: 3600");
                header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
            }

            if (file_exists("./api/rest/{$action}.php")) {
                require_once("./api/rest/{$action}.php");
            } else {
                http_response_code(404);
                echo "Not found /api/rest/{$action}.php";
            }

            if (isset($response)) {
                http_response_code($response['code']);
                echo json_encode($response['message']);
            }
        }
    } else {
        http_response_code(404);
        echo 'Not found';
    }
    $dba->close();
    unset($TEMP);
} else {
    http_response_code(204);
    echo 'No content';
}
