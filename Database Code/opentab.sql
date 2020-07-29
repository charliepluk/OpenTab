-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 29, 2020 at 05:15 AM
-- Server version: 10.4.13-MariaDB
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
  `customerFirstname` varchar(40) NOT NULL,
  `customerEmail` varchar(50) NOT NULL,
  `customerPassword` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customerID`, `customerFirstname`, `customerEmail`, `customerPassword`) VALUES
(1, 'Cameron', 'cam@gmail.com', 'test'),
(2, 'Charlie', 'thebiggestmanthatseverlived@gmail.com', 'test'),
(3, 'Akshay', 'test@gmail.com', 'test'),
(4, 'John', 'test2@gmail.com', 'test'),
(5, 'Sally', 'test3@gmail.com', 'test'),
(6, 'Emily', 'test4@gmail.com', 'test'),
(7, 'Aaron', 'test5@gmail.com', 'test'),
(8, 'Jimmy', 'cam@gmal.com', 'test'),
(9, 'Billy', 'qwer@gmail.com', 'test'),
(10, 'Matt', 'testset@gmail.com', 'test'),
(11, 'Maddy', 'testseft@gmail.com', 'test'),
(12, 'Ian', 'testsefsdt@gmail.com', 'test'),
(19, 'Cameron', 'cam1@gmail.com', 'test'),
(20, 'TesMe', 'hihihi@gmail.com', 'test');

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
(8, 1, 'Coors', '5.50', NULL, 'Drink'),
(9, 1, 'Budlight', '5.00', NULL, 'Drink'),
(10, 1, 'Appletini', '9.00', NULL, 'Drink'),
(11, 1, 'Vodka Soda', '10.00', NULL, 'Drink'),
(13, 3, 'Twisted Tea', '6.00', NULL, 'Drink'),
(14, 3, 'White Claw', '6.50', NULL, 'Drink'),
(15, 3, 'Bud Lime', '6.00', NULL, 'Drink'),
(16, 2, 'Cider', '7.50', NULL, 'Drink'),
(17, 2, 'Scotch', '11.00', NULL, 'Drink'),
(18, 2, 'Natty Light', '5.00', NULL, 'Drink'),
(19, 2, 'Vodka', '10.00', NULL, 'Drink'),
(20, 2, 'Magic Hat', '8.00', NULL, 'Drink'),
(21, 2, 'Vodka Sour', '11.00', NULL, 'Drink'),
(22, 2, 'Stella', '7.50', NULL, 'Drink'),
(24, 4, 'Dirty Martini', '13.00', NULL, 'Drink'),
(25, 4, 'Manhattan', '12.00', NULL, 'Drink'),
(26, 4, 'Irish Coffee', '10.00', NULL, 'Drink');

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
  `orderItems` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`orderItems`)),
  `totalOrderPrice` decimal(9,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderID`, `restID`, `customerID`, `orderNotes`, `orderDateTime`, `orderStatus`, `orderItems`, `totalOrderPrice`) VALUES
(22, 1, 1, NULL, '2020-07-28 22:58:30', 'pending', '[{\"itemID\":8,\"itemName\":\"Coors\",\"quantity\":3,\"itemPrice\":5.5,\"totalPrice\":16.5},{\"itemID\":9,\"itemName\":\"Budlight\",\"quantity\":1,\"itemPrice\":5,\"totalPrice\":5},{\"itemID\":10,\"itemName\":\"Appletini\",\"quantity\":3,\"itemPrice\":9,\"totalPrice\":27}]', '48.50'),
(23, 2, 1, NULL, '2020-07-28 23:02:20', 'pending', '[{\"itemID\":16,\"itemName\":\"Cider\",\"quantity\":3,\"itemPrice\":7.5,\"totalPrice\":22.5},{\"itemID\":17,\"itemName\":\"Scotch\",\"quantity\":1,\"itemPrice\":11,\"totalPrice\":11},{\"itemID\":18,\"itemName\":\"Natty Light\",\"quantity\":3,\"itemPrice\":5,\"totalPrice\":15},{\"itemID\":20,\"itemName\":\"Magic Hat\",\"quantity\":2,\"itemPrice\":8,\"totalPrice\":16}]', '64.50'),
(24, 3, 1, NULL, '2020-07-28 23:02:33', 'pending', '[{\"itemID\":13,\"itemName\":\"Twisted Tea\",\"quantity\":3,\"itemPrice\":6,\"totalPrice\":18},{\"itemID\":14,\"itemName\":\"White Claw\",\"quantity\":1,\"itemPrice\":6.5,\"totalPrice\":6.5},{\"itemID\":15,\"itemName\":\"Bud Lime\",\"quantity\":3,\"itemPrice\":6,\"totalPrice\":18}]', '42.50'),
(25, 4, 1, NULL, '2020-07-28 23:11:00', 'pending', '[{\"itemID\":24,\"itemName\":\"Dirty Martini\",\"quantity\":3,\"itemPrice\":13,\"totalPrice\":39},{\"itemID\":25,\"itemName\":\"Manhattan\",\"quantity\":1,\"itemPrice\":12,\"totalPrice\":12},{\"itemID\":26,\"itemName\":\"Irish Coffee\",\"quantity\":3,\"itemPrice\":10,\"totalPrice\":30}]', '81.00');

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
  `city` varchar(40) NOT NULL,
  `state` varchar(2) NOT NULL,
  `zipcode` varchar(5) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `openTime` time NOT NULL,
  `closeTime` time NOT NULL,
  `restPassword` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `restaurants`
--

INSERT INTO `restaurants` (`restID`, `restName`, `firstName`, `lastName`, `phone`, `email`, `address`, `city`, `state`, `zipcode`, `description`, `openTime`, `closeTime`, `restPassword`) VALUES
(1, 'Flanns', 'Cam', 'Liddell', '6034403643', 'cameron@gmail.com', '28 Winger Street', 'Boston', 'MA', '12120', 'Best drinks in town!', '01:00:00', '01:10:00', 'test'),
(2, 'Charlies Big Bar', 'Charlie', 'Plukfangpanya', '6032345643', 'bigChuck@gmail.com', '555 Huntington Avenue', 'Boston', 'MA', '02120', 'Come in for big drinks', '10:00:00', '12:00:00', 'test'),
(3, 'Camel Stop', 'Chuck', 'Paulson', '6034405443', 'chuckTest@gmail.com', '56 Catskill Road', 'Boston', 'MA', '02120', 'Okayest drinks in town!', '01:00:00', '01:10:00', 'test'),
(4, 'Akshays Small Bar', 'Akshay', 'Patel', '603246098', 'smallShay@gmail.com', '525 River Avenue', 'Boston', 'MA', '02120', 'Come in for small drinks', '10:00:00', '12:00:00', 'test');

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
  MODIFY `customerID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `itemID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `orderID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `restaurants`
--
ALTER TABLE `restaurants`
  MODIFY `restID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
