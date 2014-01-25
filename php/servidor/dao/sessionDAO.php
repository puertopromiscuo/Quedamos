<?php

function checkSession() {
    if (empty($_SESSION['id'])) {
        return 0;
    } else {
        return $_SESSION['user'];
    }
}

function endSession() {
    
}

?>