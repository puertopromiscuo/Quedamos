<?php

include_once '../utils/sqlFunctions.php';

/*MAPA*/
function getEvent($event_id) {    
    $query = "SELECT * from " . SQL_EVENTTABLE . " where event_id='$event_id'";
    return sqlSelect($query);    
}

function getAllEvents(){
    $query = "SELECT * from " . SQL_EVENTTABLE;
    return sqlSelect($query);    
}

function insertEvent($event_title, $event_description, $event_date, $event_userid,$event_x,$event_y,$event_type) {
    $query = "INSERT into " . SQL_EVENTTABLE . " (event_title,event_description,event_date,event_userid,event_x,event_y,event_type) "
            . "values ('$event_title','$event_description','$event_date','$event_userid','$event_x','$event_y','$event_type')";    
    return sqlInsert($query);    
}

function deleteEvent($event_id) {    
    $query = "DELETE from " . SQL_EVENTTABLE . " where event_id='$event_id'";
    return sqlDelete($query);    
}

/*APUNTARSE*/
function insertUserEvent($user_id,$event_id) {    
    $query = "INSERT into " . SQL_USEREVENTTABLE . " (user_id,event_id) values ('$user_id','$event_id')";    
    sqlInsert($query); 
    return 1;
}
function deleteUserEvent($user_id,$event_id) {    
    $query = "DELETE from " . SQL_USEREVENTTABLE . " where event_id='$event_id' and user_id='$user_id'";
    return sqlDelete($query);     
}

function ifExistUserEvent($user_id,$event_id){
    $query = "SELECT * from " . SQL_USEREVENTTABLE . " where event_id='$event_id' and user_id='$user_id'";
    $rows = sqlCount($query);
    if($rows){
        return true;
    }else{
        return false;
    }
}
/*USUARIOS APUNTADOS*/
function getUsersEnroll($event_id){
    $query ="SELECT ue.user_id,ue.event_id,user_name FROM "
            .SQL_USEREVENTTABLE." ue ,"
            .SQL_USERTABLE." u "
            ."where ue.user_id = u.user_id "
            ."and ue.event_id = '$event_id'";
    return sqlSelect($query);
}

  




//var_dump(sqlCount("select * from events"));
//var_dump(getEvent(169));
//var_dump(insertEvent("titulo", "descripbion", "2012-10-19", "110", "2", "4"));
//var_dump(deleteEvent(169));
//var_dump(insertUserEvent(114,174));
//var_dump(deleteUserEvent(110,166));
//var_dump(ifExistUserEvent(1,165));
//var_dump(getUsersEnroll(185));

?>