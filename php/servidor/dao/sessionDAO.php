<?php

function checkSession() {
    if (empty($_SESSION['user_id'])) {
        return false;
    } else {
        return $_SESSION['user_id'];
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
    return $data;
}

//var_dump(checkSession());

?>