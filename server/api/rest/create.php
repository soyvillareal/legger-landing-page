<?php

$request_body  = file_get_contents("php://input");

if (isset($_GET['page']) && !empty($request_body)) {
    $data = json_decode($request_body);
    if ($_GET['page'] === 'lead') {
        $empty = false;
        if (empty($data->clientName)) {
            $empty = true;
        } else if (empty($data->nit)) {
            $empty = true;
        } else if (empty($data->pointName)) {
            $empty = true;
        } else if (empty($data->teamName)) {
            $empty = true;
        } else if (empty($data->rtc)) {
            $empty = true;
        } else if (empty($data->capitanUser)) {
            $empty = true;
        } else if (!in_array($data->city, array('cali', 'medellin', 'bogota'))) {
            $empty = true;
        }


        if ($empty == false) {
            $clientName = Functions::PreparePOST($data->clientName);
            $nit = Functions::PreparePOST($data->nit);
            $pointName = Functions::PreparePOST($data->pointName);
            $teamName = Functions::PreparePOST($data->teamName);
            $rtc = Functions::PreparePOST($data->rtc);
            $capitanUser = Functions::PreparePOST($data->capitanUser);
            $city = Functions::PreparePOST($data->city);
            $ip = Functions::PreparePOST($data->ip);
            $date = Functions::PreparePOST($data->date);
            $hour = Functions::PreparePOST($data->hour);

            $error = false;
            $grep = preg_grep('/[#¿?,]+/', array($pointName, $teamName, $capitanUser));
            if (preg_match('/[^a-zA-ZáéíóúÁÉÍÓÚñÑ]+/', $clientName) > 0) {
                $error = true;
            } else if (preg_match('/[^0-9]/', $rtc) > 0) {
                $error = true;
            } else if (count($grep) > 0) {
                $error = true;
            }

            if ($error == false) {
                if ($dba->query('INSERT INTO ' . T_LEAD . ' (client_name, nit, point_name, team_name, rtc, capitan_user, city, ip, date, hour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', $clientName, $nit, $pointName, $teamName, $rtc, strtolower($capitanUser), $city, $ip, $date, $hour)->returnStatus()) {
                    $response['code'] = 201;
                    $response['message'] = 'Item was created.';
                } else {
                    $response['code'] = 503;
                    $response['message'] = 'Unable to create item.';
                }
            } else {
                $response['code'] = 400;
                $response['message'] = 'Unable to create leads. Data is wrong.';
            }
        } else {
            $response['code'] = 400;
            $response['message'] = 'Unable to create leads. Data is incomplete.';
        }
    } else {
        $response['code'] = 404;
        $response['message'] = 'Not content found';
    }
} else {
    $response['code'] = 404;
    $response['message'] = 'Not content found';
}
