<?php
	require 'vendor/autoload.php';
	require 'db.php';

	$app = new \Slim\Slim();

	$app->get('/testing', 'test');
	$app->get('/getusers', 'getUsers');
	$app->get('/deleteuser/:num', 'deleteUser');
	$app->get('/getuser/:num', 'getUser');
	$app->post('/adduser', 'addUser');
	$app->post('/edituser', 'editUser');

	$app->run();

	/* ============= functions ===============*/
	function test(){
		echo 'Hello from Slim PHP framework, your test is successful!';
	}

	function addUser(){
		$app = new \Slim\Slim();
		$request = $app->request();
		$data = json_decode($request->getBody(),true);
		$user = User::create($data);
		$user->save();
	}

	function getUsers(){
		$user = User::all();
		echo $user->toJson();
	}

	function deleteUser($id){
		$user = User::find($id);
		$user->delete();
	}

	function getUser($id){
		$user = User::find($id);
		echo $user->toJson();
	}
	function editUser(){
		$app = new \Slim\Slim();
		$request = $app->request();
		$data = json_decode($request->getBody());
		$user = User::find($data->id);
		$user->username = $data->username;
		$user->fullname = $data->fullname;
		$user->save();

	
	}