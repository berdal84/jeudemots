
CREATE TABLE IF NOT EXISTS `jokes` (
    `id`       int(11)      NOT NULL,
    `category` varchar(64)  NOT NULL,
    `text`     text         NOT NULL,
    `author`   varchar(64)  NOT NULL,
    `date`     date         DEFAULT NULL,
    `visible`  tinyint(1)   NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `jokes` ADD PRIMARY KEY (`id`);
ALTER TABLE `jokes` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
