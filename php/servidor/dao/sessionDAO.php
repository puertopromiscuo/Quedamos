<?php

    function checkSession() {
        if(empty($_SESSION['id_user'])){
            return "false";
        }else{
            return "true";
        }
    }
    
    function startSession ($user,$id){
        session_start();
        
        $_SESSION['user']  = $user;
        $_SESSION['id_user'] = $id;
    }
    
    function endSession (){
        
    }
    
?>