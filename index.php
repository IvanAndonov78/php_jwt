<?php

require_once './controllers/login_controller.php';

/*
$origin = $_SERVER['SCRIPT_URI'];

header("Access-Control-Allow-Origin: $origin");

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
*/



// header("Access-Control-Allow-Origin: *"); // comment this line for prod !!!

$uri = $_SERVER['REQUEST_URI'];
$qs_arr = explode("/", $uri);

$qs = $qs_arr[2];

function frontController($qs) {
	
	switch($qs) {
		case '':
			//require_once(__DIR__ . './views/index.html');
			require_once('./views/index.html');
			break;
		case '/':
			//require_once(__DIR__ . './views/index.html');
			require_once('./views/index.html');
			break;
		case '?login':
			$lc = new LoginController();
			if($lc->isValidInput()) {
				$lc->sendJwt();
			} else {
				$out = ['msg' => 'Incorrect credentials!'];
				echo json_encode($out);
			} 
			break;
		case '?links':
			$myFile = file_get_contents("./model/project_links.json");
			$arr = json_decode($myFile, true);
			echo json_encode($arr, JSON_PRETTY_PRINT);
			break;
		case '?img_sources':
			$myFile = file_get_contents("./model/img_sources.json");
			$arr = json_decode($myFile, true);
			echo json_encode($arr, JSON_PRETTY_PRINT);
			break;
		case '?texts':
			$myFile = file_get_contents('./model/texts.json');
			$arr = json_decode($myFile, true);
			echo json_encode($arr, JSON_PRETTY_PRINT);
			break;
		case '?test':
			//http://localhost/projects_ivan/?test
			$out = [
				['id' => 1, 'name' => 'orange'],
				['id' => 2, 'name' => 'apple']
			];
			echo json_encode($out);
			break;
		default:
			echo 'Error!';
			break;
	}
	
    
}

frontController($qs);
?>