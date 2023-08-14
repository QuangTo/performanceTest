-- CREATE TABLE IF NOT EXISTS course_go(
--     id INT   NOT NULL AUTO_INCREMENT,
--     title VARCHAR(255),
--     PRIMARY KEY(id)
-- )

SELECT * FROM course_go LIMIT 100;

-- INSERT INTO course_go(title) VALUES("Leadership");

-- insert into course_go(title) value (SUBSTRING(MD5(RAND()) FROM 1 FOR 10));

-- DROP TABLE course_go;

-- LOAD DATA LOCAL INFILE '/Users/quangtoo/Documents/performanceTest/abc.csv' INTO TABLE course_go

-- SHOW VARIABLES LIKE "secure_file_priv";

-- SET Global secure_file_priv='/Users/quangtoo/Downloads';
-- -- SHOW VARIABLES LIKE "secure_file_priv";

-- SHOW GLOBAL VARIABLES LIKE 'local_infile';
-- SET GLOBAL local_infile = 1;
-- SHOW GLOBAL VARIABLES LIKE 'local_infile';

-- [mysqld]
-- secure-file-priv = "/Users/quangtoo/Downloads/"