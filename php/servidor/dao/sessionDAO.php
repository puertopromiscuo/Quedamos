<?php

function checkSession() {
    if (empty($_SESSION['id'])) {
        return 0;
    } else {
        return $_SESSION['id'];
    }
}

function endSession() {
    
}

function dataUser($id) {
    $row = mysqli_fetch_array(get_data('user_id', $id));
    $data = array(
        "id" => $row['user_id'],
        "name" => $row['user_name'],
        "email" => $row['user_email']
    );
    return createJson("ok", "Información del usuario", $data);
}


?>