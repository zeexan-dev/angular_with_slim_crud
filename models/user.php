<?php
class User extends Illuminate\Database\Eloquent\Model
{
	// name of table
   	protected $table = 'user';

    // if you dont have create_at and updated_at columns in table
	public $timestamps = false;

	protected $fillable = array('username','fullname','id');
}