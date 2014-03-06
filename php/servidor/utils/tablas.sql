-- phpMyAdmin SQL Dump
-- version 2.11.11.3
-- http://www.phpmyadmin.net
--
-- Servidor: 188.121.44.162
-- Tiempo de generación: 06-03-2014 a las 07:43:51
-- Versión del servidor: 5.5.33
-- Versión de PHP: 5.1.6

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";

--
-- Base de datos: `quedamos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `events`
--

CREATE TABLE `events` (
  `event_id` int(10) NOT NULL AUTO_INCREMENT,
  `event_title` varchar(40) NOT NULL,
  `event_description` varchar(400) NOT NULL,
  `event_date` date NOT NULL,
  `event_userid` int(10) NOT NULL,
  `event_x` float NOT NULL,
  `event_y` float NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=175 ;

--
-- Volcar la base de datos para la tabla `events`
--

INSERT INTO `events` VALUES(171, 'titulo', 'descripbion', '2012-10-19', 190, 2, 4);
INSERT INTO `events` VALUES(173, 'titulo', 'descripbion', '2012-10-19', 110, 2, 4);
INSERT INTO `events` VALUES(168, 'titulo', 'descripbion', '2012-10-19', 3, 2, 4);
INSERT INTO `events` VALUES(167, 'titulo', 'descripbion', '2012-10-19', 3, 2, 4);
INSERT INTO `events` VALUES(166, 'titulo', 'descripbion', '2012-10-19', 3, 2, 4);
INSERT INTO `events` VALUES(172, 'titulo', 'descripbion', '2012-10-19', 190, 2, 4);
INSERT INTO `events` VALUES(174, 'titulo', 'descripbion', '2012-10-19', 110, 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `userEvent`
--

CREATE TABLE `userEvent` (
  `user_id` int(10) NOT NULL,
  `event_id` int(10) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Volcar la base de datos para la tabla `userEvent`
--

INSERT INTO `userEvent` VALUES(110, 174);
INSERT INTO `userEvent` VALUES(111, 22);
INSERT INTO `userEvent` VALUES(111, 22);
INSERT INTO `userEvent` VALUES(22, 111);
INSERT INTO `userEvent` VALUES(111, 22);
INSERT INTO `userEvent` VALUES(11, 22);
INSERT INTO `userEvent` VALUES(11, 22);
INSERT INTO `userEvent` VALUES(11, 22);
INSERT INTO `userEvent` VALUES(11, 22);
INSERT INTO `userEvent` VALUES(11, 22);
INSERT INTO `userEvent` VALUES(11, 22);
INSERT INTO `userEvent` VALUES(110, 173);
INSERT INTO `userEvent` VALUES(110, 130);
INSERT INTO `userEvent` VALUES(111, 22);
INSERT INTO `userEvent` VALUES(111, 22);
INSERT INTO `userEvent` VALUES(101, 301);
INSERT INTO `userEvent` VALUES(110, 166);
INSERT INTO `userEvent` VALUES(10, 30);
INSERT INTO `userEvent` VALUES(10, 20);
INSERT INTO `userEvent` VALUES(1, 162);
INSERT INTO `userEvent` VALUES(110, 156);
INSERT INTO `userEvent` VALUES(1, 162);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `user_id` int(10) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(40) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_email` varchar(40) NOT NULL,
  `user_state` varchar(50) NOT NULL,
  `point_id` int(10) NOT NULL COMMENT 'localización del usuario',
  PRIMARY KEY (`user_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=114 ;

--
-- Volcar la base de datos para la tabla `users`
--

INSERT INTO `users` VALUES(92, 'test', 'test', 'test', 'activate', 0);
INSERT INTO `users` VALUES(93, 'test1', 'test1', 'test1', 'activate', 0);
INSERT INTO `users` VALUES(110, 'Jesus', 'cDhvUiKnH1B3v/cA21702dDmHxLq/NVDflZKT+ZuU1g=', 'jesusgraficap@gmail.com', 'activate', 0);
INSERT INTO `users` VALUES(111, 'kfmlkm', '203rCYHtLAiy7QmuM5+xoYE9mKUlwfhWybX9JDeQdD0=', 'kdfmkl@kdfmlk.com', '92da748ce1402658df435d46302c0c637442c9c3', 0);
INSERT INTO `users` VALUES(112, 'a', 'a', 'a', '', 0);
INSERT INTO `users` VALUES(113, 'b', 'b', 'b', 'activate', 0);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `VeventPoint`
--
CREATE TABLE `VeventPoint` (
);
-- --------------------------------------------------------

--
-- Estructura para la vista `VeventPoint`
--
DROP TABLE IF EXISTS `VeventPoint`;

CREATE ALGORITHM=UNDEFINED DEFINER=`quedamos`@`%` SQL SECURITY DEFINER VIEW `quedamos`.`VeventPoint` AS select `e`.`event_id` AS `event_id`,`e`.`event_title` AS `event_title`,`e`.`event_description` AS `event_description`,`e`.`event_date` AS `event_date`,`e`.`user_id` AS `user_id`,`p`.`point_id` AS `point_id`,`p`.`point_x` AS `point_x`,`p`.`point_y` AS `point_y` from (`quedamos`.`events` `e` join `quedamos`.`points` `p`) where (`e`.`point_id` = `p`.`point_id`);

