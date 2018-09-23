rends={<?php
$chl="data/renders.txt";
$f=fopen($chl,"r");
$g=explode("\n",fread($f,filesize($chl)));
function trans($tex){
    $l=explode(";",$tex);
    echo "'".$l[0]."':'".$l[1]."'";
}
foreach(array_slice($g,0,sizeof($g)-1) as $h){
    trans($h);
    echo ",";
}
trans(end($g));
?>}