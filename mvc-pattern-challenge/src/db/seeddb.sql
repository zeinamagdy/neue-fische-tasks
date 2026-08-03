DROP TABLE IF EXISTS posts;

CREATE TABLE posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  teaser TEXT NOT NULL,
  author TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  imageText TEXT NOT NULL

);


-- 2. Create the temporary "array" table
CREATE TEMP TABLE temp_posts_array (
  title TEXT,
  content TEXT,
  teaser TEXT,
  author TEXT,
  createdAt TEXT,
  imageText TEXT
);

-- 3. Populate your temporary table with seedPosts
INSERT INTO temp_posts_array (title, content, teaser, author, createdAt, imageText) VALUES
  (
    'Black: The Absence, Not the Presence, of Color',
    '<p>When you think about the rainbow, you see a vibrant spectrum of hues. But black does not appear in that spectrum the same way red or blue does.</p><p>From a scientific perspective, black is usually the absence of visible light, not a reflected wavelength.</p>',
    'Scientifically, black is not a color but rather the absence of all colors, occurring when an object absorbs nearly all light wavelengths instead of reflecting them.',
    'Peter Parker',
    '1743120000',
    'colorful-umbrella.jpg'
  ),
  (
    'Flowers: Nature''s Muse for Design',
    '<p>Designers borrow from flowers all the time: layered composition, contrasting accents, and natural hierarchy.</p>',
    'Flowers inspire design with their color palettes, structure, and balance between repetition and variation.',
    'Peter Parker',
    '1745452800',
    'flowers.jpg'
  ),
  (
    'UDesign''s Harmony: Core Purpose and Supporting Details',
    '<p>A useful mental model is major and minor elements. Major elements communicate the main point, minor elements support it without stealing focus.</p>',
    'Strong design starts with one clear core idea, then adds supporting details that reinforce it.',
    'Peter Parker',
    '1748736000',
    'sailing.jpg'
  );

-- 4. Bulk insert into the main posts table
INSERT INTO posts (title, content, teaser, author, createdAt, imageText)
SELECT title, content, teaser, author, createdAt, imageText 
FROM temp_posts_array;

-- 5. Clean up temporary table
DROP TABLE temp_posts_array;

-- 6. Verify inserted records
SELECT * FROM posts;