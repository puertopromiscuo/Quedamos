<?php 
function createJson($status,$message,$result){
       $data = array(
            'status' => $status,
            'message'=> $message,
            'result'=> $result
        );         
        return json_encode($data);
}
?>