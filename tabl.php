<table align="center">
  <head>

<style type="text/css">
table {
	table-layout: fixed;
	padding: 0;
	width: 100%;
	border-collapse: collapse;
	border-spacing: 0;
	margin: 0 0 20px 0;
}

table th {
	vertical-align: middle;
	color: #777777;
	font-size: 10px;
	text-transform: uppercase;
	padding: 10px 5px;
	background: #dedede;
	text-align: center;
	border: 1px solid #c1c1c1;
}

table td {
	padding: 8px 5px;
	font-size: 12px;
	color: #000;
	border: 1px solid #e9e9e9;
	text-align: center;
	line-height: 16px;
	vertical-align: middle;
	font-size: 12px;
}
table tbody tr:nth-child(odd) td {
	background: #f4f4f4;
}

</style>
<thead>
		<tr>
			<th>Заезд</th>
			<th>Выезд</th>

		</tr>
	</thead>
<table>

  <tr align="center">

<?php

$servername="localhost";
$username="root";
$password="";
$adname="Oxo";

 $connect=mysqli_connect($servername,$username,$password,$adname);
  mysqli_set_charset($connect,"utf8");

$result3= mysqli_query( $connect, "SELECT * FROM `ded`");
 
while($myrow3=mysqli_fetch_array($result3))
{
  
?>

    <td><?php echo $myrow3['data1'];?></td>
    <td><?php echo $myrow3['data2'];?></td>
   
  </tr>
  <?

}?>
</table>
 
 
</body>
</html>