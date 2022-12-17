<?php

if (isset($_GET['page'])) {
    if ($_GET['page'] === 'verify') {
        if (!empty($_GET['username']) && !empty($_GET['password'])) {
            $username = $_GET['username'];
            $password = $_GET['password'];

            $user = $dba->query('SELECT * FROM ' . T_USER . ' WHERE username = ?', $username)->fetchArray();

            if (!empty($user)) {
                $password_verify = password_verify($password, $user['password']);
                if ($password_verify) {
                    $hash = md5(Functions::RandomKey(12, 20));
                    if ($dba->query('INSERT INTO ' . T_SESSION . ' (user_id, hash, created_at) VALUES (?, ?, ?)', $user['id'], $hash, date('Y-m-d', time()))->returnStatus()) {
                        $response['code'] = 200;
                        $response['message'] = array(
                            'hash' => $hash,
                            'message' => 'Successful authentication'
                        );
                    } else {
                        $response['code'] = 503;
                        $response['message'] = 'Unable to login';
                    }
                } else {
                    $response['code'] = 401;
                    $response['message'] = 'Unauthorized';
                }
            } else {
                $response['code'] = 503;
                $response['message'] = 'Unable to login';
            }
        } else {
            $response['code'] = 400;
            $response['message'] = 'Unable to update items. Data is incomplete.';
        }
    } else if ($_GET['page'] === 'leads') {
        if (!empty($_GET['hash'])) {
            if ($dba->query('SELECT COUNT(*) FROM ' . T_SESSION . ' WHERE hash = ?', $_GET['hash'])->fetchArray(true) > 0) {
                $query = '';
                if (!empty($_GET['start']) && !empty($_GET['end'])) {
                    $start = strtotime($_GET['start']);
                    $end = strtotime($_GET['end']);

                    $query = " WHERE UNIX_TIMESTAMP(date) BETWEEN {$start} AND {$end}";
                }

                $leads = $dba->query('SELECT * FROM ' . T_LEAD . $query)->fetchAll();

                if (!empty($leads)) {
                    $response['code'] = 200;
                    $response['message'] = $leads;
                } else {
                    $response['code'] = 204;
                    $response['message'] = 'No content';
                }
            } else {
                $response['code'] = 401;
                $response['message'] = 'Unauthorized';
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
