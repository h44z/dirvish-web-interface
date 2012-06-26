<?php

include('class_dirvish.php');

$dirvish = new dirvish();

echo $dirvish->get_history($_GET['bank'], $_GET['client']);

?>
