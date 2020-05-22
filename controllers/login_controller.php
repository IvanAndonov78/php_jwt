<?php 

/*
A JSON Web Token or JWT looks like a string with three parts 
separated by dots. The following is an example of JWT.
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9leGFtcGxlLm9yZyIsImF1ZCI6Imh0dHA6XC9cL2V4YW1wbGUuY29tIiwiaWF0IjoxMzU2OTk5NTI0LCJuYmYiOjEzNTcwMDAwMDAsImRhdGEiOnsiaWQiOiI5IiwiZmlyc3RuYW1lIjoiTWlrZSIsImxhc3RuYW1lIjoiRGFsaXNheSIsImVtYWlsIjoibWlrZUBjb2Rlb2ZhbmluamEuY29tIn19.h_Q4gJ3epcpwdwNCNCYxtiKdXsN34W9MEjxZ7sx21Vs
JWT in the serialized form represents a string of the following format:

header.payload.signature

The header component contains information about how the JWT signature 
should be computed. 

The payload component is the data that is stored inside the JWT. 
This can be the user information like user ID, name and email.

To create the signature component, you have to take the encoded header, 
the encoded payload, a secret, the algorithm specified in the header, 
and sign that. 
*/

class LoginController {

    private $jwt;

    public function __construct() {
        $this->jwt = $this->generate_token();
    }


    function escapeInput($input) {
        if (!empty($input)) {
            $input = trim($input);
            $input = stripslashes($input);
            $input =  htmlspecialchars($input);
            return $input;
        } 
    }

    private function generate_token() {

        $headers = ['alg'=>'HS256','typ'=>'JWT'];
        $headers = json_encode($headers);
        // $headers = base64_encode($headers);
        $headers = rtrim(strtr(base64_encode($headers), '+/', '-_'), '='); // base64url_encoded

        $payload = ['name'=>'user_1', 'email'=>'bate_vanyo@andonovsd.com'];
        $payload = json_encode($payload);
        // $payload = base64_encode($payload);
        $payload = rtrim(strtr(base64_encode($payload), '+/', '-_'), '='); // base64url_encoded

        $int_key_part = rand(10000, 100000);
        $str_key_part = str_shuffle('Bate_Vanyo_is_Cool_!123');
        $key = $str_key_part . (string)$int_key_part;
        $signature = hash_hmac('SHA256',"$headers.$payload",$key,true);
        // $signature = base64_encode($signature);
        $signature = rtrim(strtr(base64_encode($signature), '+/', '-_'), '='); // base64url_encoded

        $token = "$headers.$payload.$signature";					

        return $token;              
    }

    public function sendJwt() {
        $cookie_name = "jwt_cookie";
        $cookie_value = $this->jwt;
        $cookie_timing = 1800;
        // 86400 = 1 day
        // 3600 = 1 hour
        // 1800 = 0.5 hours
        
        setcookie($cookie_name, $cookie_value, time() + $cookie_timing, "/"); 

        echo json_encode(
            [
                "message" => "Successful login!",
                "jwt" => $this->jwt
            ],
            JSON_PRETTY_PRINT
        );
    }

    public function isValidInput() {

        $input = file_get_contents('php://input');
        $input = json_decode($input);
        $email = $this->escapeInput($input->email);
        $pass = $this->escapeInput($input->pass);

        if ($email == 'bate_vanyo@andonovsd.com') {
            if ($pass == 'friend!123') { 
                return true;
            } else {
                return false;
            }
        }
    }


}

?>