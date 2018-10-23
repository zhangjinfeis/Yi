<?php
return array(
	/* 数据库设置 */
    'DB_TYPE' => 'mysql', // 数据库类型
	'DB_HOST' => 'localhost', // 服务器地址
	'DB_NAME' => 'whhyte.com', // 数据库名
	'DB_USER' => 'whhyte.com', // 用户名
	'DB_PWD' => 'zu84lk02mw57vn82', // 密码
	'DB_PORT' => '3306', // 端口
	'DB_PREFIX' => 'rg_', // 数据库表前缀
	'URL_MODEL' => 2,
	'SESSION_AUTO_START' => false, // 是否自动开启Session
	'SESSION_PREFIX' => '8E0ggkGp', // session 前缀
	'AUTH_SIGN' => 'xwgeIQPp', // 签名加密
	/* Cookie设置 */
	'COOKIE_EXPIRE' => 0, // Cookie有效期
	'COOKIE_DOMAIN' => '', // Cookie有效域名
	'COOKIE_PATH' => '/', // Cookie路径
	'COOKIE_PREFIX' => 'p2gsystem', // Cookie前缀 避免冲突
	'COOKIE_HTTPONLY' => true, // Cookie httponly设置
	'TMPL_ACTION_ERROR' => './Public/Common/dispatch_jump.html', // 默认错误跳转对应的模板文件
	'TMPL_ACTION_SUCCESS' => './Public/Common/dispatch_jump.html', // 默认成功跳转对应的模板文件
	// 邮件系统
	/*
	'THINK_EMAIL' => array(
		'SMTP_HOST'   => 'smtp.qq.com', //SMTP服务器
		'SMTP_PORT'   => '465', //SMTP 服务器端口
		'SMTP_USER'   => '2436998260@qq.com', //SMTP服务器用户名
		'SMTP_PASS'   => 'httpdmsohucom51', //SMTP服务器密码
		'FROM_EMAIL'  => '2436998260@qq.com', //发件人EMAIL
		'FROM_NAME'   => '张锦飞', //发件人名称
		'REPLY_EMAIL' => '', //回复EMAIL（留空则为发件人EMAIL）
		'REPLY_NAME'  => '', //回复名称（留空则为发件人名称）
	),
	*/
)
; 