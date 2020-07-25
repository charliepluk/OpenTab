-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 22, 2020 at 08:47 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.6

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
(17, 'asdfasdf@gmail.com', 'test');

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `itemID` int(10) NOT NULL,
  `restID` int(11) DEFAULT NULL,
  `itemName` varchar(25) NOT NULL,
  `itemPrice` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`itemID`, `restID`, `itemName`, `itemPrice`) VALUES
(1, 1, 'Moscow Mule', '9.99'),
(2, 1, 'Bud', '5.00'),
(3, 1, 'Coors', '6.00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `orderID` int(10) NOT NULL,
  `restID` int(11) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `orderNotes` varchar(150) DEFAULT NULL,
  `orderDateTime` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `restID`, `customerID`, `orderNotes`, `orderDateTime`) VALUES
(1, 1, 1, 'test', '2020-07-22 13:55:21'),
(2, 2, 2, 'test', '2020-07-22 13:55:29'),
(3, 1, 3, 'test', '2020-07-22 13:55:43'),
(4, 2, 1, 'test', '2020-07-22 13:56:04'),
(5, 2, 3, 'test', '2020-07-22 13:58:02'),
(6, 2, 3, 'test', '2020-07-22 14:33:47'),
(7, 2, 3, 'test', '2020-07-22 14:33:50'),
(8, 2, 3, 'test', '2020-07-22 14:33:53'),
(9, 2, 3, 'test', '2020-07-22 14:33:55'),
(10, 2, 3, 'test', '2020-07-22 14:33:57'),
(11, 2, 3, 'test', '2020-07-22 14:33:59'),
(12, 2, 3, 'test', '2020-07-22 14:34:02'),
(13, 2, 3, 'test', '2020-07-22 14:34:04'),
(14, 2, 3, 'test', '2020-07-22 14:34:06'),
(15, 2, 3, 'test', '2020-07-22 14:34:08'),
(16, 1, 3, 'test', '2020-07-22 14:34:46'),
(17, 2, 3, 'test', '2020-07-22 14:34:58'),
(18, 2, 3, 'test', '2020-07-22 14:35:00'),
(19, 2, 3, 'test', '2020-07-22 14:35:02'),
(20, 2, 3, 'test', '2020-07-22 14:35:04'),
(21, 2, 3, 'test', '2020-07-22 14:35:06'),
(22, 2, 3, 'test', '2020-07-22 14:35:08'),
(23, 2, 3, 'test', '2020-07-22 14:35:11'),
(24, 2, 3, 'test', '2020-07-22 14:35:33'),
(25, 2, 3, 'test', '2020-07-22 14:35:39'),
(26, 2, 3, 'test', '2020-07-22 14:35:41'),
(27, 2, 3, 'test', '2020-07-22 14:35:42'),
(28, 2, 3, 'test', '2020-07-22 14:35:44'),
(29, 2, 3, 'test', '2020-07-22 14:35:46'),
(30, 2, 3, 'test', '2020-07-22 14:35:48'),
(31, 2, 3, 'test', '2020-07-22 14:35:50');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `orderItemsID` int(10) NOT NULL,
  `orderID` int(11) DEFAULT NULL,
  `itemID` int(11) DEFAULT NULL,
  `itemQuantity` int(2) NOT NULL,
  `totalPriceOfItems` decimal(6,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `restaurants`
--

CREATE TABLE `restaurants` (
  `restID` int(10) NOT NULL,
  `restName` varchar(50) NOT NULL,
  `restPhone` varchar(14) NOT NULL,
  `restEmail` varchar(50) NOT NULL,
  `restLocation` varchar(100) NOT NULL,
  `restDescription` varchar(200) DEFAULT NULL,
  `restOpenTime` time DEFAULT NULL,
  `restCloseTime` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`restID`, `restName`, `restPhone`, `restEmail`, `restLocation`, `restDescription`, `restOpenTime`, `restCloseTime`) VALUES
(1, 'Flanns', '1-234-456-1234', 'flanns@test.com', '555 huntington avenue', NULL, '01:00:00', '01:10:00'),
(2, 'West End Johns', '1-234-466-1234', 'johns@test.com', '123 huntington avenue', NULL, '10:00:00', '11:00:00');

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
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`orderItemsID`),
  ADD KEY `orderID` (`orderID`),
  ADD KEY `itemID` (`itemID`);

--
-- Indexes for table `restaurants`
--
ALTER TABLE `restaurants`
  ADD PRIMARY KEY (`restID`),
  ADD UNIQUE KEY `restPhone` (`restPhone`),
  ADD UNIQUE KEY `restEmail` (`restEmail`),
  ADD UNIQUE KEY `restLocation` (`restLocation`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customerID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `orderItemsID` int(10) NOT NULL AUTO_INCREMENT;

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

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `orders` (`orderID`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`itemID`) REFERENCES `items` (`itemID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
