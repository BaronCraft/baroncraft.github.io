<?php

include_once("connect.php");

if(isset($_POST['login']))

{

$login = $_POST['login']; //Имя пользователя, введенное в форму

$password = $_POST['password']; // Пароль введенный в форму

//Запрос из базы данных по проверки существования в базе введенного пользователя

//с введенным паролем

$query = "SELECT id, login, password

FROM users

WHERE login ='{$login}' AND password='{$password}'

LIMIT 1";

$sql = mysql_query($query) or die(mysql_error()); //Выполняется запрос

echo('<html>

<head>

<title>Скрипт регистрации</title>

<META HTTP-EQUIV="refresh" CONTENT="1;URL=index.php">

</head>

<body>');

if (mysql_num_rows($sql) == 1){

setcookie("login", $login);

setcookie("password", md5($password));

echo 'Авторизация прошла успешно';

}else {

echo 'Неправильное имя или пароль';

}

echo("</body>

</html>");

}

?>
