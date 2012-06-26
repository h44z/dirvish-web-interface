<?php

include('class_dirvish.php');

$dirvish = new dirvish();

echo $dirvish->get_log($_GET['bank'], $_GET['client'], $_GET['image']);

?>
