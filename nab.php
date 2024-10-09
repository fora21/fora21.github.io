<?

  $logi=$_POST["logi"];
  $data=$_POST["data"];
  $mess=$_POST["mess"];
  $servername="localhost";
  $username="root";
  $password="";
  $adname="Oxo";
  $connect=mysqli_connect($servername,$username,$password,$adname);
  mysqli_set_charset($connect,"utf8");
  $result=mysqli_query($connect,"INSERT INTO `otzz` (`id`, `logi`, `data`, `mess`, `ava`) VALUES( NULL,'$logi', '$data', '$mess', '3')");
if($result)
  {
    header('Location: ../all.php');
  }
else { echo 'Ошибка. Проверьте на правильное написание вашего зарегистрированного имя';}
 ?>