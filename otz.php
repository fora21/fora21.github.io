<?php session_start();
include_once('functions.php');
?>

<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>База отдыха ЭХО | Официальный сайт</title>
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <form action="functions.php" method="post"  enctype = "multipart/form-data">
    <div class="container">
      <h1>Регистрация</h1>
      <p>Зарегистрируйтесь чтобы оставить отзыв</p>
      <label for="username"><b>Логин</b></label>
      <input
        type="text"
        placeholder="Имя"
        name="logi"
        id="username"
        required
      />

  

      <label for="email"><b>Email</b></label>
      <input
        type="text"
        placeholder="Почта"
        name="email"
        id="email"
        required
      />

      <label for="pwd"><b>Пароль</b></label>
      <input
        type="password"
        placeholder="Введите свой пароль"
        name="passwor"
        id="pwd"
        required
      />

      <button type="submit">Зарегистрироваться</button>
    <!-- the # must ideally be replaced by the login page URL -->
    <div class="footer">




    <form method="post" enctype="multipart/form-data">
      <input type="file" name="file">
      
    </form>
    <?php
    // если была произведена отправка формы
    if(isset($_FILES['file'])) {
      // проверяем, можно ли загружать изображение
      $check = can_upload($_FILES['file']);
    
      if($check === true){
        // загружаем изображение на сервер
        make_upload($_FILES['file']);
        echo "<strong>Файл успешно загружен!</strong>";
      }
      else{
        // выводим сообщение об ошибке
        echo "<strong>$check</strong>";  
      }
    }
    ?>







?>


      <style>
      
        .footer {
  text-decoration: none;
  color:#242d44;
}
.footer-bt {
  color:#3ea3f5;
  font-family: 'Istok Web';
  font-size: 18px;

}
      </style>
      <p>У вас уже есть аккаунт?<a href="otzvoiti.html" class="footer-bt">Войти</a></p>
    </div>
   
  </form>
</div>
</body>
</html>        