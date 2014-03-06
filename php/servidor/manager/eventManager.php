<?php

include '../dao/eventDAO.php';
include_once '../utils/json.php';

/* MAPA */

function insertEventManager($event_title, $event_description, $event_date, $event_userid, $event_x, $event_y) {
    $data = insertEvent($event_title, $event_description, $event_date, $event_userid, $event_x, $event_y);
    if (count($data)) {
        return createJson("ok", "evento creado", $data);
    } else {
        return createJson("error", "error al crear evento", null);
    }
}

function getEventManager($event_id) {
    $data = getEvent($event_id);
    if (count($data)) {
        return createJson("ok", "evento recuperado", $data);
    } else {
        return createJson("error", "error evento no encontrado:$event_id", null);
    }
}

function getAllEventsManager() {
    $data = getAllEvents();
    if (count($data)) {
        return createJson("ok", "eventos del mapa recuperados", $data);
    } else {
        return createJson("error", "no hay ningun evento del mapa", null);
    }
}

function deleteEventManager($event_id) {
    if (deleteEvent($event_id)) {
        return createJson("ok", "evento eliminado: $event_id", null);
    } else {
        return createJson("error", "error al borra evento $event_id", null);
    }
}

/* APUNTARSE */

function insertUserEventManager($user_id, $event_id) {
    if (!ifExistUserEvent($user_id, $event_id)) {
        insertUserEvent($user_id, $event_id);
        return createJson("ok", "usuario apuntado", ['event_id' => $event_id]);
    } else {
        return createJson("error", "error usuario ya esta apuntado a este evento", null);
    }
}

function deleteUserEventManager($user_id, $event_id) {
    if (deleteUserEvent($user_id, $event_id)) {
        return createJson("ok", "registro de evento eliminado", ['event_id' => $event_id]);
    } else {
        return createJson("error", "error eliminar registro de evento", null);
    }
}

//MY EVENTS
function getMyEventsManager($user_id) {
    $myEvents = getMyEvents($user_id);
    foreach ($myEvents as $event) {
        $event['users'] = getUsersEnroll($event['event_id']);
        array_push($myEvents, $event);
    }
    if (count($myEvents)) {
        return createJson("ok", "eventos del usuario recuperados", $myEvents);
    } else {
        return createJson("error", "este usuario no tiene eventos", null);
    }
}

//FILTROS

function getFilterAllEventsManager($where) {
    $data = getFilterAllEvents($where);
    if (count($data)) {
        return createJson("ok", "eventos filtrados", $data);
    } else {
        return createJson("error", "no hay eventos con este filtro $where", null);
    }
}

//var_dump(getEventManager(170));
//var_dump(insertEventManager("titulo", "descripbion", "2014-03-06", "110", "2", "4"));
//var_dump(getAllEventsManager());
//var_dump(deleteEventManager(170));
//var_dump(insertUserEventManager(111,174));
//var_dump(getMyEventsManager(110));$kk = getMyEventsManager(110);var_dump($kk[3]['users']);
//var_dump(getFilterAllEventsManager("WHERE event_date = '2014-03-06'"));
?>

