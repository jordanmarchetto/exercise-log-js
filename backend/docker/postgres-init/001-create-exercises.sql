CREATE TABLE IF NOT EXISTS exercises (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  show_on_records BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO exercises (name, description, icon, show_on_records)
VALUES
  ('Bench Press', 'A compound chest exercise.', 'bi-trophy-fill', TRUE),
  ('Squat', 'A lower-body compound movement.', 'bi-barbell', TRUE),
  ('Deadlift', 'A hinge movement for full-body strength.', 'bi-lightning-fill', FALSE)
ON CONFLICT DO NOTHING;
