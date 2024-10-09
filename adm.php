<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>База отдыха ЭХО | Официальный сайт</title>
 <meta name="viewport" content="width=device-width, initial-scale=1.0" />
 <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
<?php

$conn = new mysqli("localhost", "root", "", "oxo");
if ($conn->connect_error){
    die("ERRO: " . $conn->connect_error);
}
$sql = "SELECT * FROM otzz";
if ($result = $conn->query($sql)){
    $rowsCount= $result->num_rows;
echo"<h4>"; echo"<center>";
echo"<br>";
echo"<br>";
    echo"<p>Получено  предложений: $rowsCount</p>"; echo"<h4>"; echo"<center>";
echo"<br>";
echo"<center>";

}
?>
<style>
    table {
        margin: 0 auto;
        font-size: large;
        border: 1px;
    }

    h1{
        text-align: center;
        color: #0000;
        font-size: xx-large;
    }

    td {
        background-color: #ffffff;
        border: 1px;
    }

    th,
    td {
        font-weight: bold;
        border: 1px;
        padding: 10px;
        text-align: center;
    }

    td{
        padding: 10px;
        text-align: center;
    }

    td{
        font-weight: lighter;
    }

</style>
<body>
    <section>

        <table>
            <tr>
                <th>#</th>
                <th>Логин автора</th>
                <th>Комментарий</th>



 


                <th>Удаление</th>
           
            <tr>
        
        <?php
            while($rows=$result->fetch_assoc())
            {
                ?>
                <tr>
                    <td><?php echo $rows['id'];?></td>
                    <td><?php echo $rows['logi'];?></td>
                    <td><?php echo $rows['mess'];?></td>

           
                        <? echo "<td><a href='?delete_id={$rows['id']}'>Удалить</a></td>";?>
                        
                </tr>

                
                <?
                  }
                ?>
            </table>
    </section>
</body>
</html>
<?
   
         if(isset($_GET['delete_id'])) {
            $sql = mysqli_query($conn, "DELETE FROM `otzz` WHERE `id`= {$_GET['delete_id']}");
        if ($sql) {
            echo "<p>Заявка удалена</p>";
        } else {
            echo '<p>Произошла ошибка:' . mysqli_error($conn) . '</p>';
        }
    }
?>

