-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2020 at 11:39 AM
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
(1, 1, 'Beer', '5.00', '', 'drink'),
(2, 1, 'Moscow Mule', '11.00', NULL, 'drink'),
(3, 1, 'Twisted Tea', '6.00', NULL, 'drink'),
(4, 1, 'Martini', '8.00', NULL, 'drink'),
(5, 1, 'Blue Moon', '7.00', NULL, 'drink');

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
(31, 2, 3, 'test', '2020-07-22 14:35:50'),
(59, 1, 1, NULL, '2020-07-22 20:19:42'),
(60, 2, 1, NULL, '2020-07-22 20:19:47'),
(61, 1, 1, NULL, '2020-07-22 20:19:51'),
(62, 2, 1, NULL, '2020-07-22 20:19:55'),
(63, 1, 1, NULL, '2020-07-22 20:20:08'),
(64, 1, 1, NULL, '2020-07-22 20:20:11'),
(65, 1, 1, NULL, '2020-07-22 20:20:13'),
(66, 1, 1, NULL, '2020-07-22 20:20:15');

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

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`orderItemsID`, `orderID`, `itemID`, `itemQuantity`, `totalPriceOfItems`) VALUES
(1, 1, 1, 2, '10.00'),
(2, 1, 2, 2, '22.00');

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

-- --------------------------------------------------------

--
-- Table structure for table `testorders`
--

CREATE TABLE `testorders` (
  `orderID` int(10) NOT NULL,
  `restID` int(11) DEFAULT NULL,
  `customerID` int(11) DEFAULT NULL,
  `orderNotes` varchar(150) DEFAULT NULL,
  `orderDateTime` datetime DEFAULT current_timestamp(),
  `orderItems` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orderItems`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `testorders`
--

INSERT INTO `testorders` (`orderID`, `restID`, `customerID`, `orderNotes`, `orderDateTime`, `orderItems`) VALUES
(1, 1, 1, NULL, '2020-07-25 03:50:09', '{\"id\": 1, \"name\": \"Monty\"}'),
(2, 1, 1, NULL, '2020-07-25 03:51:15', '[{\"id\": 1, \"name\": \"Monty\"},{\"id\": 2, \"name\": \"Montyy\"}]'),
(4, 1, 1, NULL, '2020-07-25 04:17:45', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":6,\"itemPrice\":5,\"totalPrice\":30},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":2,\"itemPrice\":11,\"totalPrice\":22},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":2,\"itemPrice\":6,\"totalPrice\":12}]'),
(5, 1, 1, NULL, '2020-07-25 05:34:05', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":13,\"itemPrice\":5,\"totalPrice\":65},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":12,\"itemPrice\":11,\"totalPrice\":132},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":11,\"itemPrice\":6,\"totalPrice\":66}]'),
(6, 1, 1, NULL, '2020-07-25 05:34:13', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":13,\"itemPrice\":5,\"totalPrice\":65},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":12,\"itemPrice\":11,\"totalPrice\":132},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":11,\"itemPrice\":6,\"totalPrice\":66}]'),
(7, 1, 1, NULL, '2020-07-25 05:34:14', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":13,\"itemPrice\":5,\"totalPrice\":65},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":12,\"itemPrice\":11,\"totalPrice\":132},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":11,\"itemPrice\":6,\"totalPrice\":66}]'),
(8, 1, 1, NULL, '2020-07-25 05:34:14', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":13,\"itemPrice\":5,\"totalPrice\":65},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":12,\"itemPrice\":11,\"totalPrice\":132},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":11,\"itemPrice\":6,\"totalPrice\":66}]'),
(9, 1, 1, NULL, '2020-07-25 05:34:15', '[{\"itemID\":1,\"itemName\":\"Beer\",\"quantity\":13,\"itemPrice\":5,\"totalPrice\":65},{\"itemID\":2,\"itemName\":\"Moscow Mule\",\"quantity\":12,\"itemPrice\":11,\"totalPrice\":132},{\"itemID\":3,\"itemName\":\"Twisted Tea\",\"quantity\":11,\"itemPrice\":6,\"totalPrice\":66}]');

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
-- Indexes for table `testorders`
--
ALTER TABLE `testorders`
  ADD PRIMARY KEY (`orderID`),
  ADD KEY `restID` (`restID`),
  ADD KEY `customerID` (`customerID`);

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
  MODIFY `itemID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `orderItemsID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `restID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testorders`
--
ALTER TABLE `testorders`
  MODIFY `orderID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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

--
-- Constraints for table `testorders`
--
ALTER TABLE `testorders`
  ADD CONSTRAINT `testorders_ibfk_1` FOREIGN KEY (`restID`) REFERENCES `restaurants` (`restID`) ON DELETE CASCADE,
  ADD CONSTRAINT `testorders_ibfk_2` FOREIGN KEY (`customerID`) REFERENCES `customers` (`customerID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
