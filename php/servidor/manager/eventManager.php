<?php

include '../dao/eventDAO.php';
include_once '../utils/json.php';

/* MAPA */

function insertEventManager($event_title, $event_description, $event_date, $event_userid, $event_x, $event_y, $event_type) {
    $data = insertEvent($event_title, $event_description, $event_date, $event_userid, $event_x, $event_y, $event_type);
    if (count($data)) {
        return createJson("ok", "evento creado", $data);
    } else {
        return createJson("error", "error al crear evento", null);
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

/* TODO */

function getAllEventsManager() {
    $arrayAux = array();
    $allEvents = getAllEvents();
    foreach ($allEvents as $event) {
        $event['users'] = getUsersEnroll($event['event_id']);
        array_push($arrayAux, $event);
    }
    if (count($arrayAux)) {
        return createJson("ok", "eventos recuperados", $arrayAux);
    } else {
        return createJson("error", "error no hay eventos creados", null);
    }
}

function updateDateManager($date_update) {
    if (updateDate($date_update)) {
        return createJson("ok", "se necesita actualizar eventos, hay cambios", updateDate($date_update));
    } else {
        return createJson("error", "todo actualizado", null);
    }
}

//var_dump(insertEventManager("titulo", "descripbion", "2014-03-06", "110", "2", "4"));
//var_dump(deleteEventManager(170));
//var_dump(insertUserEventManager(119,185));
//var_dump(getAllEventsManager());
?>

