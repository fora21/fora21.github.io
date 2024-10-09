<!DOCTYPE html>
<html lang="ru">
    <head>

    <meta charset="UTF-8"> <!--Кодировка для коректного отображение сайта-->
	<meta http-equiv="X-A-Compati">
	<meta name="viewport" content="width=devaice-width, initial-scale=1.0"> <!--1 - это отображение вьюпорт, и дальше
	указаны параматры. Тоесть контент на странице будет отображаться по ширине окна браузера-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/main.css" rel="stylesheet">
    <link rel="icon" href="assets/images/lg.png" type="image/x-icon">

	<title>База отдыха ЭХО | Отзывы</title>

    </head>

<body>

<div id="preloader"></div>



            <nav>
                <a href="#menu" class="a-menu">Меню<i class="ion-android-menu"></i> </a>
            </nav>
        </header>

        <!-- Menu -->
        <nav id="menu">
            <div class="inner">
                <h2>Меню</h2>
                <ul class="links">
                    <li><a href="index.html">Главная</a></li>
                    <li><a href="#four">Услуги</a></li>
                    <li><a href="#fourss">Адрес</a></li>
                    <li><a href="otz.php">Отзывы</a></li>


                </ul>
                <a href="#" class="close">Закрыть</a>
            </div>
        </nav>
    </div>
    
    <section id="banner">
        <div class="container">

            <div class="row">
                <div class="logo">
                    <img src="assets/images/logo.png" alt="">
                </div>

                <div class="col-md-12">
                    <h2>База отдыха “ЭХО”</h2>
                </div>
            </div>

            <div class="row">
                <div class="col-md-12">
                    <p>Поделитесь своими впечатлениями о базе отдыха "ЭХО"</p>
                </div>
            </div>

            <div class="row">
                    <div class="col-md-12">
                        <a href="index.html" class="btn btn-banner">Забронировать</a>
                    </div>
                </div>
            </div>
        </section>
            
          


        

            <h1 style="text-align:center"><span style="font-family:Times New Roman,Times,serif"><strong><span style="font-size:18px">Отзывы</span></strong></span></h1>


  <?
        
            $conn = new mysqli("localhost", "root", "", "Oxo");
            if($conn->connect_error){
            die("Ошибка: " . $conn->connect_error);
            }
           $sql = "SELECT * FROM otzz";
           if($result = $conn->query($sql)){
           $rowsCount = $result->num_rows; // количество полученных строк
        
            echo "<table><tr><th>Имя</th><th>Отзыв</th></tr>";
           foreach($result as $row){
            echo "<tr>";
            
            echo "<p>". $row["logi"] . "</p>";
            "<p>&nbsp;</p>";
            echo "<blockquote><p>" . $row["mess"] . "</p></blockquote>";
             echo "</tr>";
           }
         echo "</table>";
          $result->free();
        } else{
            echo "Ошибка: " . $conn->error;
        }
        $conn->close();
  ?>
   

  </body>
</html>