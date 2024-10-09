                   
                        
<html lang="ru">
    <head>

    <meta charset="UTF-8"> <!--Кодировка для коректного отображение сайта-->
	<meta http-equiv="X-A-Compati">
	<meta name="viewport" content="width=devaice-width, initial-scale=1.0"> <!--1 - это отображение вьюпорт, и дальше
	указаны параматры. Тоесть контент на странице будет отображаться по ширине окна браузера-->
    <link href="assets/css/bootstrap.min.css" rel="stylesheet">
    <link href="assets/css/main.css" rel="stylesheet">
    <link rel="icon" href="assets/images/lg.png" type="image/x-icon">

	<title>База отдыха ЭХО | Официальный сайт</title>

    </head>
<body>
<div id="preloader"></div>
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
                        <p>Ждём вас!</p>
                    </div>
                   
                </div>
                       
                    
            </div>
        </section>
        <form action= action_page.php  method="post"  >
        <div class="footer-features">
                    <div class="row">
                        <div class="col-md-6">


                        


                        <?
                        $fio=$_POST['fio'];
                        $email=$_POST['email'];
                        $poze=$_POST['poze'];
                        $data1=$_POST['data1'];
                        $data2=$_POST['data2'];
                        $servername="localhost";
                        $username="root";
                        $password="";
                        $adname="Oxo";
                        $connect=mysqli_connect($servername,$username,$password,$adname);
                        mysqli_set_charset($connect,"utf8");
                        $result=mysqli_query($connect,"select * from ded where data1='$data1' and data2='$data2'");
                        $row_cnt = mysqli_num_rows($result);

                        if($row_cnt>0) 
                        {
                            header('Location: ../action_page23.php');
                        }

                        else 
                        {
                            $result=mysqli_query($connect,"INSERT INTO ded(fio, email, poze, data1, data2) VALUES('$fio', '$email', '$poze', '$data1', '$data2')");
                        }

                        $text="Вы успешно забронировали";
                        $font_size=20;
                        echo '<center><font size="'. $font_size . '">'. htmlspecialchars($text). '</font></center>'
                        ?>






                         </div>
                        <div class="col-md-6">
                            <div class="footer-list">
                                <ul class="list-unstyled">
                                    <li class="list-table">
                                        <i class="ion-ios-home"></i><p>Если у вас остались вопросы, вы можете
                                            с нами связаться в течении рабочего дня -
                                            с 8.00 до 19.00</p>
                                    </li>
                                    <li class="list-table">
                                        <i class="ion-android-call"></i><p>+7 (924) 543 76-23</p>
                                    </li>
                                    <li class="list-table">
                                        <i class="ion-email"></i><p>recreationcenterEcho@mail.com</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                     
                <div class="footer-bottom">
                    <div class="row">
                        <div class="col-md-12">
                            <p>&copy; 23.04.2024 Гольдберг Валерия</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/main.js"></script>
        </body>
       
