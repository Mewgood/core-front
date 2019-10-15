<?php
error_reporting(E_ALL);
ini_set('display_errors','On');
    session_start();

    // logout user
    if  (isset($_GET['logout'])) {

        $_SESSION['loggedIn'] = false;

        echo '<script type="text/javascript">

                // remove token from localStorage
                localStorage.removeItem("core-app-token-x76");

                // refresh location without querystring.
                var href = document.location.href.split("?")[0];
                window.location.replace(href);

             </script>';
        die();
    }

    // user was logged in , so serve dashboard
    if (isset($_SESSION['loggedIn']) && $_SESSION['loggedIn']) {
        $config = include "config.php";
        include "common/header.php";

        echo '<div class="page-container">';

        include "common/menu.php";

        include "pages/site.php";
        include "pages/subscription.php";
        include "pages/event.php";
        include "pages/association.php";
        include "pages/distribution.php";
        include "pages/archive-big.php";
        include "pages/archive-home.php";
        include "pages/auto-unit.php";
        include "pages/country-league-team.php";
        include "pages/league-alias.php";
        include "pages/country-alias.php";
        include "pages/admin-pool.php";
        include "pages/auto-unit-site-configuration.php";

        include "common/sidebar.php";

        echo '</div>';

        include "common/footer.php";

        die();
    }

    // perform login action
    if (isset($_POST['login'])) {

        // perform login operation by curl
        $config = require_once 'config.php';
        $url = $config['coreUrl'] . '/admin/login';
        $data = [
            'email' => $_POST['email'],
            'password' => $_POST['password'],
        ];
        $post = curl_init();
        curl_setopt($post, CURLOPT_URL, $url);
        curl_setopt($post, CURLOPT_POST, count($data));
        curl_setopt($post, CURLOPT_POSTFIELDS, $data);
        curl_setopt($post, CURLOPT_RETURNTRANSFER, true);
        $ret = curl_exec($post);

        $response = json_decode($ret, true);

        // success autentificate
        if ($response['success']) {
            $_SESSION['loggedIn'] = true;

            // send script to set in local storage token
            // also to perform an redirect here (user is logged in now)
            echo '<script type="text/javascript">

                    // set token in localStorage
                    localStorage.setItem("core-app-identifier-x76", "' . $response['token'] . '");

                    // refresh location without querystring.
                    var href = document.location.href.split("?")[0];
                    window.location.replace(href);

                 </script>';

            die();
        }
    }
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="utf-8">
		<title>Development</title>
	</head>
	<body>
		<!-- show login form -->
		<form action="" method="post">
		    Email:
		    <input type="text" name="email" value="">
		    <br/>
		    Password
		    <input type="password" name="password" value="">
		    <input type="submit" name="login" value="login">
		</form>
	</body>
</html>
