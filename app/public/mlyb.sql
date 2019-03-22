/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1_3306
 Source Server Type    : MySQL
 Source Server Version : 80015
 Source Host           : localhost:3306
 Source Schema         : mlyb

 Target Server Type    : MySQL
 Target Server Version : 80015
 File Encoding         : 65001

 Date: 22/03/2019 18:27:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `accound` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `pws` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createDate` datetime(0) DEFAULT NULL,
  `loginDate` datetime(0) DEFAULT NULL,
  `role` int(1) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for conn
-- ----------------------------
DROP TABLE IF EXISTS `conn`;
CREATE TABLE `conn`  (
  `id` int(1) NOT NULL AUTO_INCREMENT,
  `key` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `createDate` date DEFAULT NULL,
  `status` int(1) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for drug
-- ----------------------------
DROP TABLE IF EXISTS `drug`;
CREATE TABLE `drug`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name1` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '通用名',
  `name2` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '商品名',
  `factory` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '生产厂家',
  `USDate` date DEFAULT NULL COMMENT '美国上市时间',
  `CHData` date DEFAULT NULL COMMENT '国内上市时间',
  `USPrice` int(10) DEFAULT NULL COMMENT '美国价格',
  `CHPrice` int(10) DEFAULT NULL COMMENT '国内价格',
  `Indication` varchar(1200) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '适应症',
  `Dosage` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '用法用量',
  `Precautions` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '注意事项',
  `AdverseReactions` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '不良反应',
  `FormulationSpecification` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '剂型规格',
  `AddDate` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0),
  `optiong` int(1) NOT NULL COMMENT '操作人（1爬虫，2人为admin ID）',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
