<?php
include 'toro.php';
include 'pointDAO.php';

ToroHook::add("404", function() {
            header('HTTP/1.0 404 Not Found');
            echo "Error enlace no encontrado";
});

Toro::serve(array(    
    "/getPoint" => "getPoint",
    "/getAll" => "sign_in",
    "/insert" => "sign_in",
    "/update" => "sign_in",
    "/delete" => "sign_in"
));

class getPoint{
     function post() {          
        $point = Point::getPoint($_POST['point_id']); 
        $result = array(
            'status' => 'success',
            'message'=> 'punto recuperado',
            'result'=> $point
        );
        echo json_encode($result);
    }   
}
?>