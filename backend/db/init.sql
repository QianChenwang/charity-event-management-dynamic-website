-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS charity_events_db;
USE charity_events_db;

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL, -- Event title
  description TEXT, -- Event description
  date DATE NOT NULL, -- Event date (YYYY-MM-DD)
  location VARCHAR(200) NOT NULL, -- Event location
  category VARCHAR(50) NOT NULL, -- Event category (Education, Environment, etc.)
  organizer VARCHAR(100) NOT NULL, -- Organizer name
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Record creation time
);

-- Insert sample data
INSERT INTO events (title, description, date, location, category, organizer) VALUES
(
  'Rural Primary School Book Donation',
  'Donate books to remote rural primary schools to enrich students\' extracurricular reading resources. Volunteers needed to sort and transport books.',
  '2025-10-15',
  'A rural primary school in Lijiang, Yunnan Province',
  'Education',
  'Love Book Association'
),
(
  'Urban Park Waste Sorting Campaign',
  'Promote waste sorting knowledge in urban parks, distribute pamphlets, and guide citizens on proper waste classification.',
  '2025-10-12',
  'Chaoyang Park, Beijing',
  'Environment',
  'Green Home Environmental Organization'
),
(
  'Mountain Area Medical Clinic',
  'Organize medical teams to provide free physical examinations and basic medical services to villagers in mountainous areas.',
  '2025-10-20',
  'A village in Liangshan Prefecture, Sichuan Province',
  'Medical',
  'Public Welfare Medical Alliance'
);
