-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 25, 2025 at 02:54 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youtube_project`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `provider` varchar(255) NOT NULL,
  `providerAccountId` varchar(255) NOT NULL,
  `refresh_token` text DEFAULT NULL,
  `access_token` text DEFAULT NULL,
  `expires_at` int(11) DEFAULT NULL,
  `token_type` varchar(255) DEFAULT NULL,
  `scope` varchar(255) DEFAULT NULL,
  `id_token` text DEFAULT NULL,
  `session_state` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `comment_id` int(11) NOT NULL,
  `video_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`comment_id`, `video_id`, `user_id`, `content`, `created_at`) VALUES
(2, 6, 2, 'wtf', '2025-02-20 03:53:59'),
(8, 6, 1, 'look good', '2025-02-21 07:54:26'),
(10, 8, 2, 'testadads', '2025-02-24 06:22:40'),
(27, 2, 2, 'wow bad video', '2025-02-25 02:45:06'),
(28, 6, 3, 'thanks!!!!', '2025-02-25 02:49:59'),
(29, 8, 1, 'wow so cool', '2025-02-27 06:23:13'),
(30, 3, 3, 'test', '2025-03-06 05:49:30'),
(31, 4, 3, 'Good!', '2025-03-19 02:21:53');

-- --------------------------------------------------------

--
-- Table structure for table `dislikes`
--

CREATE TABLE `dislikes` (
  `dislike_id` int(11) NOT NULL,
  `video_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dislikes`
--

INSERT INTO `dislikes` (`dislike_id`, `video_id`, `user_id`, `created_at`) VALUES
(2, 2, 3, '2025-02-17 03:29:30'),
(28, 1, 2, '2025-02-24 09:27:35');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `like_id` int(11) NOT NULL,
  `video_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`like_id`, `video_id`, `user_id`, `created_at`) VALUES
(1, 1, 3, '2025-02-17 03:03:33'),
(10, 5, 1, '2025-02-17 06:04:14'),
(27, 7, 1, '2025-02-17 07:25:37'),
(29, 6, 1, '2025-02-20 02:32:18'),
(32, 4, 1, '2025-02-20 07:39:18'),
(33, 2, 2, '2025-02-24 09:15:10'),
(34, 7, 2, '2025-02-24 09:15:22'),
(36, 8, 3, '2025-02-25 02:50:22'),
(37, 8, 1, '2025-04-27 08:17:22'),
(38, 6, 2, '2025-03-05 09:21:16');

-- --------------------------------------------------------

--
-- Table structure for table `monthtemp`
--

CREATE TABLE `monthtemp` (
  `id` int(11) NOT NULL,
  `month` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `monthtemp`
--

INSERT INTO `monthtemp` (`id`, `month`) VALUES
(1, '2025-01-01'),
(2, '2025-02-01'),
(3, '2025-03-01'),
(4, '2025-04-01'),
(5, '2025-05-01'),
(6, '2025-06-01'),
(7, '2025-07-01'),
(8, '2025-08-01'),
(9, '2025-09-01'),
(10, '2025-10-01'),
(11, '2025-11-01'),
(12, '2025-12-01');

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `playlist_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `playlist_videos`
--

CREATE TABLE `playlist_videos` (
  `playlist_id` int(11) NOT NULL,
  `video_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` int(11) NOT NULL,
  `sessionToken` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptions`
--

CREATE TABLE `subscriptions` (
  `subscriber_id` int(11) NOT NULL,
  `subscribed_to_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subscriptions`
--

INSERT INTO `subscriptions` (`subscriber_id`, `subscribed_to_id`, `created_at`) VALUES
(1, 2, '2025-02-17 08:35:56'),
(2, 1, '2025-01-23 06:21:14'),
(2, 3, '2025-02-07 06:15:25'),
(3, 1, '2025-02-13 08:09:35'),
(3, 2, '2025-02-14 02:59:12');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `emailVerified` datetime DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users_youtube`
--

CREATE TABLE `users_youtube` (
  `user_id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users_youtube`
--

INSERT INTO `users_youtube` (`user_id`, `username`, `email`, `password_hash`, `profile_picture`, `bio`, `created_at`, `updated_at`) VALUES
(1, 'TRSESESE', 'test@gmail.com', '$2a$10$gXzisNa1qa8JEzcrah1uLeaI.vgd/tk6hnElBSbgsqb8sPQgmzQPy', '/profile/1737007640503-ป้ายห้ามสูบบุหรี่.png', NULL, '2025-01-16 06:07:20', '2025-01-23 06:25:38'),
(2, 'YOOYOYOYYOOY', 'test2@gmail.com', '$2a$10$OmOC1gfpEIhNEwOXPHjwiugKJbTHtL8y1aKRvkQStBpUwuW8gD6p2', '/profile/1737008073501-360_F_540821186_5gCn7JTDZrcK1XJlvR3Xeg4TTZAzvONC.jpg', NULL, '2025-01-16 06:14:33', '2025-01-16 06:14:33'),
(3, 'testoo', 'test3@gmail.com', '$2a$10$Txj0MgRblUFgWyb9MZbTGeBc.IPAihP3X7mcbiGzhaUAYVA8oxm86', '/profile/1742033687308-LINE_ALBUM_2522025_250225_1.jpg', NULL, '2025-01-17 08:56:30', '2025-03-15 10:14:47');

-- --------------------------------------------------------

--
-- Table structure for table `verification_tokens`
--

CREATE TABLE `verification_tokens` (
  `id` int(11) NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `video_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `video_url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `status` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`video_id`, `user_id`, `title`, `description`, `category_id`, `video_url`, `thumbnail_url`, `views`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 'Test Video', NULL, NULL, '/uploads/1738132948661-3195394-uhd_3840_2160_25fps.mp4', NULL, 2, 'Public', '2025-01-29 06:42:28', '2025-03-05 08:02:10'),
(2, 1, 'Test Video', NULL, NULL, '/uploads/1738132966002-3195394-uhd_3840_2160_25fps.mp4', NULL, 2, 'Public', '2025-01-29 06:42:46', '2025-03-06 03:12:17'),
(3, 1, 'Test Video', NULL, NULL, '/uploads/1738133387199-3195394-uhd_3840_2160_25fps.mp4', NULL, 1, 'Public', '2025-01-29 06:49:47', '2025-03-06 05:49:49'),
(4, 2, 'sample-5s.mp4', '', NULL, '/uploads/1738139650370-sample-5s.mp4', NULL, 1, 'Public', '2025-01-29 08:34:10', '2025-03-19 02:21:46'),
(5, 2, 'big_buck_bunny_720p_1mb.mp4', '', NULL, '/uploads/1738140210047-big_buck_bunny_720p_1mb.mp4', NULL, 1, 'Public', '2025-01-29 08:43:30', '2025-03-18 04:19:49'),
(6, 3, 'หมูเด้งๆๆๆๆๆ', 'มะ..มะ..หมูเด้งงงงง', NULL, '/uploads/1738556350563-1111421-hd_1920_1080_30fps.mp4', NULL, 2, 'Public', '2025-02-03 04:19:10', '2025-03-18 06:40:09'),
(7, 3, 'arrow in the air for the wind HASAKIIIIII', 'tes t adas as as a asa as assdasdasasdadasdas', NULL, '/uploads/1738574224911-3069112-hd_1920_1080_30fps.mp4', NULL, 1, 'Public', '2025-02-03 09:17:05', '2025-03-18 06:55:32'),
(8, 2, 'surf', 'my life surf\r\nso funny as fuck\r\nwooweoa asdadadasd\r\nsadd\r\n\r\n\r\ndsaads', NULL, '/uploads/1740019733497-856132-hd_1920_1080_30fps.mp4', NULL, 3, 'Public', '2025-02-20 02:48:53', '2025-03-05 08:02:20'),
(9, 3, 'egg', 'this is my egg :D', NULL, '/uploads/1742270288619-1908426-uhd_3840_2160_25fps.mp4', NULL, 2, 'Public', '2025-03-18 03:58:08', '2025-03-18 06:40:01');

-- --------------------------------------------------------

--
-- Table structure for table `video_views`
--

CREATE TABLE `video_views` (
  `video_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `view_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `video_views`
--

INSERT INTO `video_views` (`video_id`, `user_id`, `view_time`) VALUES
(6, 2, '2025-02-24 09:14:08'),
(7, 2, '2025-02-24 09:14:36'),
(2, 2, '2025-02-24 09:14:59'),
(1, 2, '2025-02-24 09:27:52'),
(8, 3, '2025-02-25 02:50:37'),
(8, 1, '2025-02-27 06:23:07'),
(8, 1, '2025-02-27 06:23:24'),
(1, 2, '2025-03-05 03:30:35'),
(6, 2, '2025-03-05 09:21:17'),
(2, 3, '2025-03-06 03:12:17'),
(3, 3, '2025-03-06 05:49:49'),
(9, 3, '2025-03-18 04:09:23'),
(9, 3, '2025-03-18 04:12:21'),
(5, 3, '2025-03-18 04:19:49'),
(4, 3, '2025-03-19 02:21:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `provider` (`provider`,`providerAccountId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `video_id` (`video_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `dislikes`
--
ALTER TABLE `dislikes`
  ADD PRIMARY KEY (`dislike_id`),
  ADD KEY `dislikes_ibfk_1` (`video_id`),
  ADD KEY `dislikes_ibfk_2` (`user_id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`like_id`),
  ADD KEY `video_id` (`video_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `monthtemp`
--
ALTER TABLE `monthtemp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD PRIMARY KEY (`playlist_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  ADD PRIMARY KEY (`playlist_id`,`video_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sessionToken` (`sessionToken`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD PRIMARY KEY (`subscriber_id`,`subscribed_to_id`),
  ADD KEY `subscribed_to_id` (`subscribed_to_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `users_youtube`
--
ALTER TABLE `users_youtube`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `verification_tokens`
--
ALTER TABLE `verification_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`video_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `video_views`
--
ALTER TABLE `video_views`
  ADD KEY `video_id` (`video_id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `dislikes`
--
ALTER TABLE `dislikes`
  MODIFY `dislike_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `like_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `monthtemp`
--
ALTER TABLE `monthtemp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `playlist_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sessions`
--
ALTER TABLE `sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_youtube`
--
ALTER TABLE `users_youtube`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `verification_tokens`
--
ALTER TABLE `verification_tokens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `video_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
  ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users_youtube` (`user_id`);

--
-- Constraints for table `dislikes`
--
ALTER TABLE `dislikes`
  ADD CONSTRAINT `dislikes_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`),
  ADD CONSTRAINT `dislikes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users_youtube` (`user_id`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users_youtube` (`user_id`);

--
-- Constraints for table `playlists`
--
ALTER TABLE `playlists`
  ADD CONSTRAINT `playlists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_youtube` (`user_id`);

--
-- Constraints for table `playlist_videos`
--
ALTER TABLE `playlist_videos`
  ADD CONSTRAINT `playlist_videos_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`playlist_id`),
  ADD CONSTRAINT `playlist_videos_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`);

--
-- Constraints for table `sessions`
--
ALTER TABLE `sessions`
  ADD CONSTRAINT `sessions_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

--
-- Constraints for table `subscriptions`
--
ALTER TABLE `subscriptions`
  ADD CONSTRAINT `subscriptions_ibfk_1` FOREIGN KEY (`subscriber_id`) REFERENCES `users_youtube` (`user_id`),
  ADD CONSTRAINT `subscriptions_ibfk_2` FOREIGN KEY (`subscribed_to_id`) REFERENCES `users_youtube` (`user_id`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users_youtube` (`user_id`),
  ADD CONSTRAINT `videos_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`);

--
-- Constraints for table `video_views`
--
ALTER TABLE `video_views`
  ADD CONSTRAINT `video_views_ibfk_1` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`),
  ADD CONSTRAINT `video_views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users_youtube` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
