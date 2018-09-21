<DOCTYPE html>
<html>
    <head></head>
    <body>
        <h2>Changelog</h2>
        <?php
        $chl="data/changelog.txt";
        $f=fopen($chl,"r");
        $g=explode("\n",fread($f,filesize($chl)));
        $h=array_map(function($n){return explode("'\"'",$n);},$g);
        fclose($f);
        foreach(array_reverse($h) as $k){
            echo "<h3>Version ".$k[0]."</h3><ul>";
            foreach(array_slice($k,1) as $m){
                echo "<li>".$m."</li>";
            }
            echo "</ul><br><br>";
        }
        ?>
        </body>
</html>