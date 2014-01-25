<?php
include '../../lib/toro/toro.php';
include '../dao/pointDAO.php';

//POSTMAN
//localhost/proyecto/Quedamos/php/servidor/services/pointService.php/

ToroHook::add("404", function() {
            header('HTTP/1.0 404 Not Found');
            echo "Error enlace no encontrado";
});

Toro::serve(array( 
    "/" => "services",
    "/getPoint" => "getPoint",
    "/getAllPoints" => "getAllPoints",
    "/insert" => "sign_in",
    "/update" => "sign_in",
    "/delete" => "sign_in"
));
class services{
     function get() {          
        echo "Services";
    }   
}

class getPoint{
     function post() {          
       echo Point::getPoint($_POST['point_id']);        
    }   
}
class getAllPoints{
     function post() {          
       echo Point::getAllPoints();        
    }   
}
?>