
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
                        <p>Устали от работы? Хотите чего-то нового, но не знаете чем заняться. 
                            В базе отдыха "ЭХО" вы обретёте настоящий отдых!Почувствуйте дух природы 
                            и окунётесь в интересные развлечения.</p>
                            
                     </div>
                </div>

                <div class="row">
                    <div class="col-md-12">
                        <a href="#footer" class="btn btn-banner">Забронировать</a>
                    </div>
                </div>
            </div>
        </section>
        
        <section id="footer">
       
        <form action= action_page.php  method="post"  >
        <div class="footer-features">
                    <div class="row">
                        <div class="col-md-6">
                        

                        <?
                    
                        $text="На эту дату стоит бронь, выберите другую";
                        $font_size=20;
                        echo '<center><font size="'. $font_size . '">'. htmlspecialchars($text). '</font></center>'
                        ?>
                        <div class="form-group">
                                    <input type="text" name="fio" class="form-control form-footer" placeholder="ФИО" required="">
                                </div>
                                <div class="form-group">
                                    <input type="email" required="" class="form-control form-footer" placeholder="Email" name="email">
                                </div>
                                <div class="form-group">
                                    <textarea class="form-control form-footer" rows="5" placeholder="Мои пожелания" name="poze"></textarea>
                                </div>
                           
                                <div class="form-group">
                                    <input type="date" class="date-input" name="data1">
                                    <input type="date" class="date-input" name="data2">
                                    <a href="tabl.php" class="button7">Посмотреть</a>
                                    <style>                   
                                    a.button7 {
                                    font-size: 12px;
                                    font-weight: 700;
                                    color: white;
                                    text-decoration: none;
                                    padding: .8em 1em calc(.8em + 3px);
                                    border-radius: 12px;
                                    background: #03B8A1;
                                    box-shadow: 0 -3px #03B8A1 inset;
                                    transition: 0.2s;
                                    } 
                                    a.button7:hover { background:#394050;
                                        color: #03B8A1; }
    
                                    a.button7:active {
                                    background: #394050;
                                    box-shadow: 0 3px #394050 inset;
                                    }
    
                                    </style>
                                </div>
                             
                                <button type="submit" class="btn btn-solid-state">Отправить</button>
                            </form>
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
       
