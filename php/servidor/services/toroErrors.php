<?php
ToroHook::add("404", function() {
    header('HTTP/1.0 404 Not Found');
    echo "Error enlace no encontrado";
});
?>

