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
        "email" => $row['user_email'],
        "image" => $row['user_image']
    );
    return $data;
}

function logOut() {
    if (checkSession()) {
        return session_destroy();
    } else {
        return false;
    }
}
function updateDataUser($img) {
    $i= checkSession();
    $id = empty($i) ? null : $i;
    if ($img) {
        if ($id) {
            $nombre = $img['archivo']['name'];
            $nombre_tmp = $img['archivo']['tmp_name'];
            $tipo = $img['archivo']['type'];
            $tamano = $img['archivo']['size'];

            $ext_permitidas = array('jpg', 'jpeg', 'gif', 'png');
            $partes_nombre = explode('.', $nombre);
            $extension = end($partes_nombre);
            $ext_correcta = in_array($extension, $ext_permitidas);

            $tipo_correcto = preg_match('/^image\/(pjpeg|jpeg|gif|png)$/', $tipo);

            $limite = 2500000;

            if ($ext_correcta && $tipo_correcto && $tamano <= $limite) {
                if ($img['archivo']['error'] > 0) {
                        return false;
                } else {
                    if (file_exists('../../img/userImage/' . $nombre)) {
                        return false;
                    } else {
                        move_uploaded_file($nombre_tmp, "../../img/userImage/" . $id);
                        return true;
                    }
                }
            } else {
                echo false;
            }
        } else {
            return false;
        }
    } else {
        return false;
    }
}

//var_dump(checkSession());
?>