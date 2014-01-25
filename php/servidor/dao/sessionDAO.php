<?php
    session_start ();
    
    function checkSession() {
        if(empty($_SESSION['id_user'])){
            return "false1";
        }else{
            return "truesd";
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