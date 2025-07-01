<?php
try {
    $dbh = new PDO('mysql:host=localhost;dbname=satisfactionsurvey', 'root', '');
} catch (PDOException $e) {
    print 'Error!: '.$e->getMessage().'<br/>';
    die();
}
?>