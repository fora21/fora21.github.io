

<?

  $logi=$_POST["logi"];
  $email=$_POST["email"];
  $passwor=$_POST["passwor"];
  $ava=$_POST["ava"];
                        
  $servername="localhost";
  $username="root";
  $password="";
  $adname="Oxo";
  $connect=mysqli_connect($servername,$username,$password,$adname);
  mysqli_set_charset($connect,"utf8");
  $result=mysqli_query($connect,"INSERT INTO `otz` (`id`, `logi`, `email`, `passwor`, `ava`) VALUES( NULL,'$logi', '$email', '$passwor', '$ava' )");

  
  {
    header('Location: ../index.html');
  }

 ?>
 

