<?php

$first_encryption = base64_encode( '1' );
$sec_encryption = base64_encode($first_encryption);

echo $sec_encryption;

?>
