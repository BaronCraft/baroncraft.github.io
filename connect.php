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
