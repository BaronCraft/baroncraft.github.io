<?php

if(!include("db.php"))

{

Header('location: instal.php');

}

?>



<html>

<head>

<title>Скрипт регистрации</title>

</head>

<body>



<?



if (isset($_GET['exit'])) {

setcookie("login", "");

setcookie("password", "");

}else{

if(isset($_COOKIE['login'])){

include_once("connect.php");

$query = mysql_query("SELECT password FROM users WHERE login='{$_COOKIE['login']}'");

$row = mysql_fetch_assoc($query);

if(md5($row[password])==$_COOKIE['password'])

{

echo(" <h1>С возвращением, {$_COOKIE['login']}!</h1>

<input type=\"button\" value=\"Выйти\" onClick=\"document.location='?exit'\">

</body>

</html>");

exit();

}

}

}

?>



<h1>Регистрация</h1>

<table>

<form action="reg.php" method="POST">

<tr>

<td>Имя</td>

<td><input type="text" name="login" ></td>

</tr>

<tr>

<td>Пароль</td>

<td><input type="password" name="password" ></td>

</tr>

<tr>

<td>Повторите пароль</td>

<td><input type="password" name="password2"></td>

</tr>

<tr>

<td>Email</td>

<td><input type="text" name="email"></td>

</tr>

<tr>

<td colspan="2"><input type="submit" value="OK" name="submit" ></td>

</tr>

</form>

</table>



<br><br>



<h1>Авторизация</h1>

<table>

<form action="avt.php" method="POST">

<tr>

<td>Имя</td>

<td><input type="text" name="login"></td>

</tr>

<tr>

<td>Пароль</td>

<td><input type="password" name="password"></td>

</tr>

<tr>

<td colspan="2"> <input type="submit" value="OK" name="submit"></td>

</tr>

</form>

</table>



</body>

</html>
