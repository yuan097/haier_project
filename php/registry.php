<?php
include "conn.php";


//检测用户名是否重名
if (isset($_POST['username'])) {
    $user = $_POST['username'];
    $result = $conn->query("select * from registry where username='$user'");
    if ($result->fetch_assoc()) { //存在
        echo true; //1
    } else {
        echo false; //空
    }
}

//接收前端表单提交的数据
if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $tel = $_POST['tel'];
    $password = sha1($_POST['password']);
    // $repass = sha1($_POST['repass']);
    // $email = $_POST['email'];
    $conn->query("insert registry values(null,'$username','$tel','$password',NOW())");
    header('location:http://localhost/JS2002/haier_project/dist/login.html');
}
