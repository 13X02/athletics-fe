-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: testdb
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `testdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `testdb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `testdb`;

--
-- Table structure for table `achievments`
--

DROP TABLE IF EXISTS `achievments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievments` (
  `achievment_id` varchar(255) NOT NULL,
  `event` varchar(255) DEFAULT NULL,
  `meet_name` varchar(255) DEFAULT NULL,
  `perfomance` varchar(255) DEFAULT NULL,
  `score` varchar(255) DEFAULT NULL,
  `performance` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`achievment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievments`
--

LOCK TABLES `achievments` WRITE;
/*!40000 ALTER TABLE `achievments` DISABLE KEYS */;
INSERT INTO `achievments` VALUES ('AC_00001','Swimming','Olympics 2022',NULL,'100',NULL),('AC_00002','Swimming','Olympics 2023',NULL,'150',NULL),('AC_00003','Swimming','UST ',NULL,'200',NULL),('AC_00052','Swimming','Olympics 2022',NULL,'150','aaa');
/*!40000 ALTER TABLE `achievments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `achive_seq`
--

DROP TABLE IF EXISTS `achive_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achive_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achive_seq`
--

LOCK TABLES `achive_seq` WRITE;
/*!40000 ALTER TABLE `achive_seq` DISABLE KEYS */;
INSERT INTO `achive_seq` VALUES (151);
/*!40000 ALTER TABLE `achive_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ass_req`
--

DROP TABLE IF EXISTS `ass_req`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ass_req` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ass_req`
--

LOCK TABLES `ass_req` WRITE;
/*!40000 ALTER TABLE `ass_req` DISABLE KEYS */;
INSERT INTO `ass_req` VALUES (51);
/*!40000 ALTER TABLE `ass_req` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assistance_request`
--

DROP TABLE IF EXISTS `assistance_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assistance_request` (
  `assistance_request_id` varchar(255) NOT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `athlete_athlete_id` varchar(255) DEFAULT NULL,
  `coach_coach_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`assistance_request_id`),
  UNIQUE KEY `UKnw76poos8d1hkupwsch0ushj8` (`athlete_athlete_id`),
  KEY `FKqy7dii3jv085hwn2kgdyhrn9v` (`coach_coach_id`),
  CONSTRAINT `FKojxdpdck6dpjmo4oqlomjemu9` FOREIGN KEY (`athlete_athlete_id`) REFERENCES `athlete` (`athlete_id`),
  CONSTRAINT `FKqy7dii3jv085hwn2kgdyhrn9v` FOREIGN KEY (`coach_coach_id`) REFERENCES `coach` (`coach_id`),
  CONSTRAINT `assistance_request_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assistance_request`
--

LOCK TABLES `assistance_request` WRITE;
/*!40000 ALTER TABLE `assistance_request` DISABLE KEYS */;
INSERT INTO `assistance_request` VALUES ('AS_00001','help needed',1,'ATH_00001','CO_00001');
/*!40000 ALTER TABLE `assistance_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ath_seq`
--

DROP TABLE IF EXISTS `ath_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ath_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ath_seq`
--

LOCK TABLES `ath_seq` WRITE;
/*!40000 ALTER TABLE `ath_seq` DISABLE KEYS */;
INSERT INTO `ath_seq` VALUES (51);
/*!40000 ALTER TABLE `ath_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `athlete`
--

DROP TABLE IF EXISTS `athlete`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `athlete` (
  `athlete_id` varchar(255) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `coach_coach_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`athlete_id`),
  UNIQUE KEY `UK1d2crke3fl36c7643i6ry8cr2` (`coach_coach_id`),
  CONSTRAINT `FKdtbtf2t6ycmh8og46tmtocix7` FOREIGN KEY (`coach_coach_id`) REFERENCES `coach` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `athlete`
--

LOCK TABLES `athlete` WRITE;
/*!40000 ALTER TABLE `athlete` DISABLE KEYS */;
INSERT INTO `athlete` VALUES ('ATH_00001','2024-09-04','Basketball','2024-09-02','Basil','Male','170','George','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/20240902_204615_2384e70c-31ed-49ed-a976-cd3022ee0e14_file.jpg','U_00002','60','CO_00001');
/*!40000 ALTER TABLE `athlete` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `co_seq`
--

DROP TABLE IF EXISTS `co_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `co_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `co_seq`
--

LOCK TABLES `co_seq` WRITE;
/*!40000 ALTER TABLE `co_seq` DISABLE KEYS */;
INSERT INTO `co_seq` VALUES (51);
/*!40000 ALTER TABLE `co_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coach`
--

DROP TABLE IF EXISTS `coach`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach` (
  `coach_id` varchar(255) NOT NULL,
  `birth_date` date DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `create_date` date DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach`
--

LOCK TABLES `coach` WRITE;
/*!40000 ALTER TABLE `coach` DISABLE KEYS */;
INSERT INTO `coach` VALUES ('CO_00001','2024-09-04','Basketball','2024-09-02','Jasrin','Male','Senp','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/20240902_211005_ad580908-afcd-437c-ada5-e43ee9709a5a_5%20%281%29.jpeg','U_00003');
/*!40000 ALTER TABLE `coach` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coach_achievements`
--

DROP TABLE IF EXISTS `coach_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach_achievements` (
  `coach_coach_id` varchar(255) NOT NULL,
  `achievements_achievment_id` varchar(255) NOT NULL,
  UNIQUE KEY `UKbvfk9b32awk2n3v35gvxbo8mp` (`achievements_achievment_id`),
  KEY `FK57c2hn8xrf38afdpd0qpgqgsv` (`coach_coach_id`),
  CONSTRAINT `FK47ldusjsw58qoc91kcwiodsyu` FOREIGN KEY (`achievements_achievment_id`) REFERENCES `achievments` (`achievment_id`),
  CONSTRAINT `FK57c2hn8xrf38afdpd0qpgqgsv` FOREIGN KEY (`coach_coach_id`) REFERENCES `coach` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach_achievements`
--

LOCK TABLES `coach_achievements` WRITE;
/*!40000 ALTER TABLE `coach_achievements` DISABLE KEYS */;
INSERT INTO `coach_achievements` VALUES ('CO_00001','AC_00001'),('CO_00001','AC_00002'),('CO_00001','AC_00003'),('CO_00001','AC_00052');
/*!40000 ALTER TABLE `coach_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coach_athletes`
--

DROP TABLE IF EXISTS `coach_athletes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coach_athletes` (
  `coach_coach_id` varchar(255) NOT NULL,
  `athletes_athlete_id` varchar(255) NOT NULL,
  UNIQUE KEY `UKexe60bk083pvbfhotidrf6ang` (`athletes_athlete_id`),
  KEY `FKcw66k7qllfxpngrgu47cuqnry` (`coach_coach_id`),
  CONSTRAINT `FK52jeu12uisb4jly1bg02ouayo` FOREIGN KEY (`athletes_athlete_id`) REFERENCES `athlete` (`athlete_id`),
  CONSTRAINT `FKcw66k7qllfxpngrgu47cuqnry` FOREIGN KEY (`coach_coach_id`) REFERENCES `coach` (`coach_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coach_athletes`
--

LOCK TABLES `coach_athletes` WRITE;
/*!40000 ALTER TABLE `coach_athletes` DISABLE KEYS */;
INSERT INTO `coach_athletes` VALUES ('CO_00001','ATH_00001');
/*!40000 ALTER TABLE `coach_athletes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_diet`
--

DROP TABLE IF EXISTS `daily_diet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_diet` (
  `id` bigint NOT NULL,
  `athlete_id` varchar(255) DEFAULT NULL,
  `calories` bigint DEFAULT NULL,
  `current_weight` bigint DEFAULT NULL,
  `date` date DEFAULT NULL,
  `weight_plan_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjajvrywuurd9xqb9qg08bqs6t` (`weight_plan_id`),
  CONSTRAINT `FKjajvrywuurd9xqb9qg08bqs6t` FOREIGN KEY (`weight_plan_id`) REFERENCES `weight_plan` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_diet`
--

LOCK TABLES `daily_diet` WRITE;
/*!40000 ALTER TABLE `daily_diet` DISABLE KEYS */;
INSERT INTO `daily_diet` VALUES (1,'ATH_00001',1500,60,'2024-08-29',NULL),(2,'ATH_00001',1600,60,'2024-08-30',NULL),(3,'ATH_00001',1700,60,'2024-08-31',NULL),(4,'ATH_00001',1700,60,'2024-09-01',NULL),(5,'ATH_00001',2000,62,'2024-09-02',NULL);
/*!40000 ALTER TABLE `daily_diet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `daily_diet_seq`
--

DROP TABLE IF EXISTS `daily_diet_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `daily_diet_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `daily_diet_seq`
--

LOCK TABLES `daily_diet_seq` WRITE;
/*!40000 ALTER TABLE `daily_diet_seq` DISABLE KEYS */;
INSERT INTO `daily_diet_seq` VALUES (101);
/*!40000 ALTER TABLE `daily_diet_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `event_id` varchar(255) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` date DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `event_description` varchar(255) DEFAULT NULL,
  `event_title` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `venue` varchar(255) DEFAULT NULL,
  `meet_meet_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`event_id`),
  KEY `FK7dd9e3m2n1c7uyyo7koy4eypl` (`meet_meet_id`),
  CONSTRAINT `FK7dd9e3m2n1c7uyyo7koy4eypl` FOREIGN KEY (`meet_meet_id`) REFERENCES `meet` (`meet_id`),
  CONSTRAINT `event_chk_1` CHECK ((`status` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('E_00003','100M','2024-09-02','2024-09-05','Upper 90 midfielder pitch forward hat trick goalie red card one-two center-half halftime three-five-two striker number 10 referee ball African Cup of Nations. Three-five-two striker referee yello','Sprint','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/5%20%281%29.jpeg',1,'TVM','M_00001'),('E_00004','200M','2024-09-02','2024-09-05','placeholder','Sprint','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/5%20%281%29.jpeg',0,'TVM','M_00003'),('E_00005','100M','2024-09-02','2024-09-06','swimming','Swimming','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/5%20%281%29.jpeg',0,'Paris','M_00002');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_seq`
--

DROP TABLE IF EXISTS `event_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_seq`
--

LOCK TABLES `event_seq` WRITE;
/*!40000 ALTER TABLE `event_seq` DISABLE KEYS */;
INSERT INTO `event_seq` VALUES (101);
/*!40000 ALTER TABLE `event_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meet`
--

DROP TABLE IF EXISTS `meet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meet` (
  `meet_id` varchar(255) NOT NULL,
  `meet_name` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`meet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meet`
--

LOCK TABLES `meet` WRITE;
/*!40000 ALTER TABLE `meet` DISABLE KEYS */;
INSERT INTO `meet` VALUES ('M_00001','Olympics 2022','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/5%20%281%29.jpeg'),('M_00002','Olympics 2023','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/Screenshot%202024-07-14%20at%201.16.32%E2%80%AFPM.png'),('M_00003','UST ','https://basilintebucket2024ilundakkiyath.s3.ap-south-1.amazonaws.com/Screenshot%202024-08-13%20at%2010.32.43%E2%80%AFPM.png');
/*!40000 ALTER TABLE `meet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reg_seq`
--

DROP TABLE IF EXISTS `reg_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reg_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reg_seq`
--

LOCK TABLES `reg_seq` WRITE;
/*!40000 ALTER TABLE `reg_seq` DISABLE KEYS */;
INSERT INTO `reg_seq` VALUES (151);
/*!40000 ALTER TABLE `reg_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registration`
--

DROP TABLE IF EXISTS `registration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registration` (
  `registration_id` varchar(255) NOT NULL,
  `athlete_id` varchar(255) DEFAULT NULL,
  `status` tinyint DEFAULT NULL,
  `event_event_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`registration_id`),
  KEY `FKbian7juyewbo97v9xv4pkkch5` (`event_event_id`),
  CONSTRAINT `FKbian7juyewbo97v9xv4pkkch5` FOREIGN KEY (`event_event_id`) REFERENCES `event` (`event_id`),
  CONSTRAINT `registration_chk_1` CHECK ((`status` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registration`
--

LOCK TABLES `registration` WRITE;
/*!40000 ALTER TABLE `registration` DISABLE KEYS */;
INSERT INTO `registration` VALUES ('R_00052','ATH_00001',0,'E_00003'),('R_00053','ATH_00001',1,'E_00004'),('R_00054','ATH_00001',2,'E_00005');
/*!40000 ALTER TABLE `registration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `res_seq`
--

DROP TABLE IF EXISTS `res_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `res_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `res_seq`
--

LOCK TABLES `res_seq` WRITE;
/*!40000 ALTER TABLE `res_seq` DISABLE KEYS */;
INSERT INTO `res_seq` VALUES (151);
/*!40000 ALTER TABLE `res_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `result` (
  `result_id` varchar(255) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `score` double DEFAULT NULL,
  `event_event_id` varchar(255) DEFAULT NULL,
  `registration_registration_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`result_id`),
  UNIQUE KEY `UK9yptyswb9evtsd8ndmfa1sh8m` (`registration_registration_id`),
  KEY `FKqkow9vx5e9ux758a2tepfttww` (`event_event_id`),
  CONSTRAINT `FKmlx70v6vyg7dhrmx86g1qdrjm` FOREIGN KEY (`registration_registration_id`) REFERENCES `registration` (`registration_id`),
  CONSTRAINT `FKqkow9vx5e9ux758a2tepfttww` FOREIGN KEY (`event_event_id`) REFERENCES `event` (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `result`
--

LOCK TABLES `result` WRITE;
/*!40000 ALTER TABLE `result` DISABLE KEYS */;
INSERT INTO `result` VALUES ('RES_00052','assa',12,'E_00003','R_00052');
/*!40000 ALTER TABLE `result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_credential`
--

DROP TABLE IF EXISTS `user_credential`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_credential` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` tinyint DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKja400kbsfopl13c5pu8rhbo09` (`email`),
  UNIQUE KEY `UK6s3isow7rby7lajiubl6rcxkv` (`username`),
  CONSTRAINT `user_credential_chk_1` CHECK ((`role` between 0 and 2))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_credential`
--

LOCK TABLES `user_credential` WRITE;
/*!40000 ALTER TABLE `user_credential` DISABLE KEYS */;
INSERT INTO `user_credential` VALUES ('U_00001','admin@admin.com','$2a$10$3/3OK4HUhuAMKeb3GrEGGuAfGAK.KSBwWCtgbF6cUKvAag9hJm4oC',1,'admin'),('U_00002','athlete@athlete.com','$2a$10$ThHidq3MhcDSWUyv6Shr2uTNUG8dUpySApoElNCseszPaCJPWB3ea',0,'athlete'),('U_00003','coach@coach.com','$2a$10$WTlQs/eepnj7hS3rrQVSk.YmH6/jLZiuiIR4Dx89NfN25/lVm0F2S',2,'coach');
/*!40000 ALTER TABLE `user_credential` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weight_plan`
--

DROP TABLE IF EXISTS `weight_plan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weight_plan` (
  `id` bigint NOT NULL,
  `athlete_id` varchar(255) DEFAULT NULL,
  `daily_calorie_goal` bigint DEFAULT NULL,
  `preference` varchar(255) DEFAULT NULL,
  `start_weight` bigint DEFAULT NULL,
  `target_weight` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weight_plan`
--

LOCK TABLES `weight_plan` WRITE;
/*!40000 ALTER TABLE `weight_plan` DISABLE KEYS */;
INSERT INTO `weight_plan` VALUES (1,'ATH_00001',2000,'non veg',60,70);
/*!40000 ALTER TABLE `weight_plan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `weight_plan_seq`
--

DROP TABLE IF EXISTS `weight_plan_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `weight_plan_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `weight_plan_seq`
--

LOCK TABLES `weight_plan_seq` WRITE;
/*!40000 ALTER TABLE `weight_plan_seq` DISABLE KEYS */;
INSERT INTO `weight_plan_seq` VALUES (51);
/*!40000 ALTER TABLE `weight_plan_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-03 22:23:26
