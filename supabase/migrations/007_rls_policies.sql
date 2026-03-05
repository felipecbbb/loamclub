-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE exercise_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- PROFILES
CREATE POLICY "users_read_own_profile" ON profiles
  FOR SELECT USING (id = auth.uid() OR is_admin());
CREATE POLICY "users_update_own_profile" ON profiles
  FOR UPDATE USING (id = auth.uid());
CREATE POLICY "admin_manage_profiles" ON profiles
  FOR ALL USING (is_admin());

-- SUBSCRIPTIONS
CREATE POLICY "users_read_own_subscription" ON subscriptions
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "admin_manage_subscriptions" ON subscriptions
  FOR ALL USING (is_admin());

-- COURSES (public read if published, admin write)
CREATE POLICY "anyone_read_published_courses" ON courses
  FOR SELECT USING (published = true);
CREATE POLICY "admin_manage_courses" ON courses
  FOR ALL USING (is_admin());

-- MODULES (public read if published, admin write)
CREATE POLICY "anyone_read_published_modules" ON modules
  FOR SELECT USING (published = true);
CREATE POLICY "admin_manage_modules" ON modules
  FOR ALL USING (is_admin());

-- LESSONS (authenticated read if published + publish_at reached, admin write)
CREATE POLICY "users_read_published_lessons" ON lessons
  FOR SELECT USING (
    published = true
    AND (publish_at IS NULL OR publish_at <= now())
  );
CREATE POLICY "admin_manage_lessons" ON lessons
  FOR ALL USING (is_admin());

-- EXERCISES (authenticated read, admin write)
CREATE POLICY "users_read_exercises" ON exercises
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM lessons
      WHERE lessons.id = exercises.lesson_id
      AND lessons.published = true
      AND (lessons.publish_at IS NULL OR lessons.publish_at <= now())
    )
  );
CREATE POLICY "admin_manage_exercises" ON exercises
  FOR ALL USING (is_admin());

-- LESSON PROGRESS (own data only)
CREATE POLICY "users_manage_own_progress" ON lesson_progress
  FOR ALL USING (user_id = auth.uid());
CREATE POLICY "admin_read_progress" ON lesson_progress
  FOR SELECT USING (is_admin());

-- EXERCISE RESPONSES (own data only)
CREATE POLICY "users_manage_own_responses" ON exercise_responses
  FOR ALL USING (user_id = auth.uid());
CREATE POLICY "admin_read_responses" ON exercise_responses
  FOR SELECT USING (is_admin());

-- NOTIFICATIONS (own data only)
CREATE POLICY "users_read_own_notifications" ON notifications
  FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "users_update_own_notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "admin_manage_notifications" ON notifications
  FOR ALL USING (is_admin());
