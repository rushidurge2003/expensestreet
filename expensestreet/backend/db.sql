CREATE TABLE `feedback` (
  `username` varchar(30) NOT NULL,
  `email` varchar(45) NOT NULL,
  `subject` varchar(100) NOT NULL,
  `fback` varchar(500) NOT NULL,
  `date` datetime NOT NULL
)

CREATE TABLE `user` (
  `name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `contact` bigint NOT NULL,
  PRIMARY KEY (`username`)
) 