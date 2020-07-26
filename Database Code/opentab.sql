-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 26, 2020 at 10:29 AM
-- Server version: 10.5.4-MariaDB
-- PHP Version: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opentab`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customerID` int(10) NOT NULL,
  `customerEmail` varchar(50) NOT NULL,
  `customerPassword` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerID`, `customerEmail`, `customerPassword`) VALUES
(1, 'cam@gmail.com', 'test'),
(2, 'thebiggestmanthatseverlived@gmail.com', 'test'),
(3, 'test@gmail.com', 'test'),
(4, 'test2@gmail.com', 'test'),
(5, 'test3@gmail.com', 'test'),
(6, 'test4@gmail.com', 'test'),
(7, 'test5@gmail.com', 'test'),
(8, 'cam@gmal.com', 'test'),
(9, 'qwer@gmail.com', 'test'),
(10, 'testset@gmail.com', 'test'),
(11, 'testseft@gmail.com', 'test'),
(12, 'testsefsdt@gmail.com', 'test'),
(13, 'wertwert@gmail.com', 'test'),
(14, 'wertsdfwert@gmail.com', 'test'),
(15, 'adfasdfas@gmail.com', 'test'),
(16, 'afdvbaht@gmail.com', 'test'),
(17, 'asdfasdf@gmail.com', 'test'),
(18, 'chrisHasASmallPenis@gmail.com', 'smalldick');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemID` int(10) NOT NULL,
  `restID` int(11) DEFAULT NULL,
  `itemName` varchar(25) NOT NULL,
  `itemPrice` decimal(6,2) NOT NULL,
  `itemDescription` varchar(150) DEFAULT NULL,
  `itemType` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemID`, `restID`, `itemName`, `itemPrice`, `itemDescription`, `itemType`) VALUES
(1, 1, 'Beer', '5.00', '', 'Drink'),
(2, 1, 'Moscow Mule', '11.00', NULL, 'Drink'),
(3, 1, 'Twisted Tea', '6.00', NULL, 'Drink'),
(4, 1, 'Martini', '8.00', NULL, 'Drink'),
(5, 1, 'Blue Moon', '7.00', NULL, 'Drink'),
(6, 1, 'Appletini', '9.00', NULL, 'Drink'),
(7, 1, 'Vodka Soda', '9.00', NULL, 'Drink');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(10) NOT NULL,
  `restID` int(11) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `orderNotes` varchar(150) DEFAULT NULL,
  `orderDateTime` datetime DEFAULT current_timestamp(),
  `orderStatus` varchar(9) NOT NULL,
  `orderItems` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orderItems`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `restID`, `customerID`, `orderNotes`, `orderDateTime`, `orderStatus`, `orderItems`) VALUES
(1, 1, 3, NULL, '2020-07-26 04:20:37', '', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":3,\"itemPrice\":5,\"totalPrice\":15},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":3,\"itemPrice\":11,\"totalPrice\":33},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":2,\"itemPrice\":6,\"totalPrice\":12},{\"itemID\":4,\"itemName\":\"Martini\",\"quantity\":2,\"itemPrice\":8,\"totalPrice\":16}]'),
(4, 1, 1, NULL, '2020-07-26 04:28:43', 'pending', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":2,\"itemPrice\":5,\"totalPrice\":10}]'),
(5, 1, 1, NULL, '2020-07-26 04:28:57', 'pending', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":2,\"itemPrice\":5,\"totalPrice\":10},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":2,\"itemPrice\":11,\"totalPrice\":22}]');

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `restID` int(10) NOT NULL,
  `restName` varchar(50) NOT NULL,
  `firstName` varchar(30) NOT NULL,
  `lastName` varchar(30) NOT NULL,
  `phone` varchar(14) NOT NULL,
  `email` varchar(50) NOT NULL,
  `address` varchar(100) NOT NULL,
  `zipcode` int(5) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `openTime` time NOT NULL,
  `closeTime` time NOT NULL,
  `restPassword` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`restID`, `restName`, `firstName`, `lastName`, `phone`, `email`, `address`, `zipcode`, `description`, `openTime`, `closeTime`, `restPassword`) VALUES
(1, 'Flanns', 'Cameron', 'Liddell', '6034403643', 'cam@gmail.com', '90 Scott Drive', 3054, 'Best drinks in town', '01:00:00', '01:10:00', 'test'),
(2, 'Jimmy Two\'s', 'Chuckie', 'Boi', '8974435821', 'camLittle@gmail.com', '93 Winger Drive', 3057, 'Worst Drinks in town', '00:00:00', '00:10:00', 'test');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerID`),
  ADD UNIQUE KEY `customerEmail` (`customerEmail`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`itemID`),
  ADD KEY `restID` (`restID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `restID` (`restID`),
  ADD KEY `customerID` (`customerID`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`restID`),
  ADD UNIQUE KEY `phone` (`phone`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `address` (`address`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `restID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_ibfk_1` FOREIGN KEY (`restID`) REFERENCES `restaurants` (`restID`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`restID`) REFERENCES `restaurants` (`restID`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
