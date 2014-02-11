<?php

include '../../lib/toro/toro.php';
include_once './toroErrors.php';


Toro::serve(array(
    "/" => "services",
    "/insertEventManager" => "insertEventManager",
));

class services {

    function get() {
        echo "Services GET";
    }
    function post(){
        echo "Services POST";
    }

}
class insertEventManager {

    function post() {
        echo "insertEventManager";
    }

}
//insertEventManager($event_title, $event_description, $event_date, $user_id, $point_x, $point_y)
?>