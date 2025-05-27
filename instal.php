<html>

<head>

<title>Инсталяция</title>

<style>

p.green {

color:green;

}

p.red {

color:red;

}

</style>

</head>

<body>

<h1>Инсталяция</h1>



<?php

if (isset($_POST['domen']))

{

$query=@mysql_connect($_POST['domen'],$_POST['user'],$_POST['password']);

if (!$query){

echo( "<P class=\"red\"> В настоящий момент сервер базы данных не доступен, проверьте правильность введенных данных.</P>" );

}else{

echo("<P class=\"green\">Соединение с базой данных установлено...</P>");

mysql_query("CREATE DATABASE {$_POST['name']}");

if(!@mysql_select_db("{$_POST['name']}")){

echo( "<P class=\"red\"> Не удалось создать базу данных \"{$_POST['name']}\".</P>" );

}else{

echo( "<P class=\"green\"> База данных \"{$_POST['name']}\" создана...</P>" );

$query="CREATE TABLE `{$_POST['name']}`.`users` (

`id` INT NOT NULL DEFAULT '0',

`login` TEXT NOT NULL ,

`password` TEXT NOT NULL ,

`email` TEXT NOT NULL 

) ENGINE = InnoDB CHARACTER SET cp1250 COLLATE cp1250_general_ci;

";

if(!mysql_query($query)){

echo( "<P class=\"red\"> Не получилось создать таблицу \"users\".</P>" );

}else{

echo( "<P class=\"green\"> Таблица \"users\" создана...</P>" );

$w=fopen("db.php", "w");

fwrite($w,'<?php $dblocation="'.$_POST['domen'].'"; $dbname="'.$_POST['name'].'"; $dbuser="'.$_POST['user'].'"; $dbpasswd="'.$_POST['password'].'"; ?>');

fclose($w);

if(!is_readable("db.php")){

echo( "<P class=\"red\"> Не получилось создать файл db.php.</P>" );

}else{

echo( "<P class=\"green\"> Файл db.php создан...</P>" );

echo( "<P class=\"green\"> Для окончания установки <b>НАСТОЯТЕЛЬНО</b> рекомендуется из корневой дериктории сайта удалить файл <b>instal.php</b></P>" );

echo( "<P> <a href=\"index.php\">Все, готово?</a></P>" );

exit();

}

}

}

}

}

?>



<table>

<form action="instal.php" method="POST">

<tr>

<td>Домен (обычно localhost)</td>

<td><input type="text" name="domen" ></td>

</tr>

<tr>

<td>Имя базы данных</td>

<td><input type="text" name="name" ></td>

</tr>

<tr>

<td>Пользователь</td>

<td><input type="text" name="user"></td>

</tr>

<tr>

<td>Пароль</td>

<td><input type="text" name="password"></td>

</tr>

<tr>

<td colspan="2"><input type="submit" value="OK" name="submit" ></td>

</tr>

</form>

</table>



</body>

</html>
