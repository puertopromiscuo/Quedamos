<?php

require 'config.php';
$link;

function getConnection() {
    global $link;
    if ($link) {
        return $link; //si ya existe la retorna
    }
    $link = mysqli_connect(SQL_HOSTNAME, SQL_USER, SQL_PASS, SQL_DBNAME);
     return($link);
}

function sqlSelect($query) {
    global $link;
    $link = getConnection();   
    
    $result = mysqli_query($link, $query);
    if (!$result) {
        die("Error select:" . mysqli_error($link) ."<br>". "$query");
    }
    $arr = array();
    while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
        array_push($arr, $row);
    }
    return $arr;
}


function sqlInsert($query) {
    global $link;
    $link = getConnection();
    
    $result = mysqli_query($link, $query);
    if (!$result) {
        die("Error insert:" . mysqli_error($link) ."<br>". "$query");
    }    
    $id = mysqli_insert_id ($link);    
    return $id;
}

function sqlDelete ($query){    
    global $link;
    $link = getConnection();        
    
    $result = mysqli_query($link, $query);
    if (!$result) {
        die("Error delete:" . mysqli_error($link) ."<br>". "$query");
    }
    
    return mysqli_affected_rows($link);   
}

function sqlUpdate($query) {
    global $link;
    $link = getConnection();      
    
    $result = mysqli_query($link, $query);
    if (!$result) {
        die("Update invalido:" . mysqli_error($link) . " $query");
    }    
    return mysqli_affected_rows($link); 
}
function sqlCount($query){    
    global $link;
    $link = getConnection();      
        
    $result = mysqli_query($link, $query);
    if (!$result) {
        die("Error count:" . mysqli_error($link) ."<br>". "$query");
    }   
    return mysqli_num_rows($result);
}


?>
