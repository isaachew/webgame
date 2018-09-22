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


function f(i,k,t){
    entities=[{"constructor":{"name":["CA","CB","CC","CD","CE"][i%2]},"id":i,"pos":[300,i+100],"rot":i}]
    if(i<k){
        setTimeout(function(){f(i+1,k,t)},t)
    }
}