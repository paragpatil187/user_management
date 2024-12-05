<?php

class Core
{
    const BASE_URL = 'http://localhost/user_management_php/api/';
    const DB_NAME = "user_crud";
    const DB_PASS = "";
    const DB_HOST = "localhost";
    const DB_USER = "root";
    
    // const BASE_URL = 'http://user--management.rf.gdapi/backend/api/';
    // const DB_NAME = "if0_37851430_user_crud";
    // const DB_PASS = "aPmImU9LTj";
    // const DB_HOST = "sql101.infinityfree.com";
    // const DB_USER = "if0_37851430";
    private $base_url;
    function __construct()
    {
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        $this->dbcon = new mysqli(self::DB_HOST, self::DB_USER, self::DB_PASS, self::DB_NAME);
        if ($this->dbcon->connect_error) {
            echo "Connection failed: " . $this->dbcon->connect_error;
            exit;
        }
        $this->base_url = self::BASE_URL;
    }

    
    function sql($query)
    {
        return $this->dbcon->query($query);
    }
    function real_escape_string($string)
    {
        return $this->dbcon->real_escape_string($string);
    }
   


    function add($table, $data)
    {
        $fields = "`" . implode("`,`", array_keys($data)) . "`";
        $values = '"' . implode('","', array_values($data)) . '"';
        $sql_query = "INSERT INTO `$table` ($fields) VALUES ($values)";
          //echo $sql_query;
        if ($this->dbcon->query($sql_query) === TRUE) {
            return $this->dbcon->insert_id;
        } else {
            //return "Error:" . $this->dbcon->error;
            return "Error";
        }
    }


    function update($table, $array, $condition = "")
    {
        $sql_query = "UPDATE `$table` SET ";
        foreach ($array as $key => $value) {
            if ($key === array_key_last($array)) {
                $sql_query .= " `$key` = '$value'";
            } else {
                $sql_query .= " `$key` = '$value',";
            }
        }
        // echo $sql_query;
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        return $this->dbcon->query($sql_query);
    }

    function delete($table, $condition)
    {
        $sql_query = "DELETE FROM `$table`";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        
        return $this->dbcon->query($sql_query);
    }
    
   
    function get($table, $fields, $condition =  "")
    {
        $sql_query = "SELECT $fields FROM `$table`";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }
        $result = $this->dbcon->query($sql_query);
        //echo json_encode($result);
        return $result->fetch_assoc();
    }
    function get_all($table, $fields, $condition =  "")
    {
        $sql_query = "SELECT $fields FROM `$table`";
        if (!empty($condition)) {
            $sql_query .= " WHERE $condition";
        }

        $result = $this->dbcon->query($sql_query);
        if ($result == TRUE) {
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                return $data;
            } else {
                return '';
            }
        } else {
            return '';
        }
    }


   


    
}