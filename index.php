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



Как видите, здесь мы создаем 2 формы для регистрации и авторизации, а так же перенаправление, на случай, если не настроена база данных и альтернативное садержимое для авторизированных пользователей (в данном случае предложение выйти из акаунта).

instal.php

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

Сюда мы попадаем в случае, если БД не настроена для нашего скрипта. Указываються необходимые параметры, создаеться таблица, данные записуються в файл db.php. Тоесть, изначально файла db.php быть на сервере не должно.

connect.php

<?php

include_once("db.php");

$dbcnx = @mysql_connect($dblocation,$dbuser,$dbpasswd);

if (!$dbcnx)

{

echo( "<P> В настоящий момент сервер базы данных не доступен, поэтому корректное отображение страницы невозможно. </P>" );

exit();

}

if (!@mysql_select_db($dbname, $dbcnx))

{

echo( "<P> В настоящий момент база данных не доступна, поэтому корректное отображение страницы невозможно. .</P>" );

exit();

}

?></code>

В этом файле происходит соединение с сервером базы данных и подключение к БД. В дальнейшем он будет включен в файлы avt.php и reg.php.

<b>reg.php</b>



<code><?

include_once("connect.php");

if (isset($_POST['submit']))

{

echo('<html>

<head>

<title>Скрипт регистрации</title>

<META HTTP-EQUIV="refresh" CONTENT="1;URL=index.php">

</head>

<body>');

if(empty($_POST['login']))

{

echo 'Вы не ввели логин';

}

elseif(empty($_POST['password']))

{

echo 'Вы не ввели пароль';

}

elseif(empty($_POST['password2']))

{

echo 'Вы не ввели подтверждение пароля';

}

elseif($_POST['password'] != $_POST['password2'])

{

echo 'Введенные пароли не совпадают';

}

elseif(empty($_POST['email']))

{

echo 'Вы не ввели E-mail';

}

else

{

$login = $_POST['login'];

$password = $_POST['password'];

$password2 = $_POST['password2'];

$email = $_POST['email'];

$query = "SELECT `id`

FROM `users`

WHERE `login`='{$login}'

";

$sql = mysql_query($query) or die(mysql_error());

if (mysql_num_rows($sql) > 0)

{

echo 'Такой логин уже существует';

}

else

{

$result=MYSQL_QUERY("SELECT COUNT(*) FROM users");

$cntrc=mysql_fetch_row($result);

$id=$cntrc[0];

$query = "INSERT INTO users(id, login , password , email )

VALUES ('$id', '$login', '$password', '$email')";

$result = mysql_query($query) or die(mysql_error());;

echo 'Регистрация прошла успешно';

}

}

echo("</body>

</html>");

}

?>

здесь происходит обработка данных при регистрации нового пользователя. В любом случае пользователю выдаеться сообщение и через секунду он перенаправляеться на index.php.

avt.php



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
