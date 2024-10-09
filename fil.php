<?php
if(isset($_FILES['file'])) {
    $check = can_upload($_FILES['file']);

    if($check == true){
        make_upload($_FILES['file']);
        echo"<strong>ffff yes</strong>";
    header("Location: otz.html");
    }
    else{
        echo "<strong>$check</strong>";
    }
}
?>