

<?

  $logi=$_POST["logi"];
  $passwor=$_POST["passwor"];
  $servername="localhost";
  $username="root";
  $password="";
  $adname="Oxo";
  if($logi=="admin" AND $passwor=="admin")
  {
    header('Location: ../adm.php');
  }
  else
  {
  $connect=mysqli_connect($servername,$username,$password,$adname);
  mysqli_set_charset($connect,"utf8");
  $result=mysqli_query($connect, "SELECT * FROM `otz` where logi='$logi' and passwor='$passwor'") ;
  $rows = mysqli_num_rows($result);
  
 if($rows>0)
  {
    
   header('Location: ../all.php');
  }
  

  else{
   // $_SESSION['msg']="User does not exist";
    header("Location: ../otz.html");
    exit();
   
  }
}

?>

