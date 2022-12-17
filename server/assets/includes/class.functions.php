<?php

class Functions {
    public static function PreparePOST($data){
        return htmlspecialchars(strip_tags($data));
    }
    public static function RandomKey($minlength = 12, $maxlength = 20, $number = true) {
		$length = mt_rand($minlength, $maxlength);
		$number = $number == true ? "1234567890" : "";
	    return substr(str_shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz$number"), 0, $length);
	}
}