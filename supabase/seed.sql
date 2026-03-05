-- Seed data for LOAM CLUB
-- Run this AFTER all migrations are applied
-- Run in Supabase SQL Editor

-- Create a sample course
INSERT INTO courses (id, title, slug, description, position, published) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Gestion de la Ansiedad', 'gestion-ansiedad', 'Herramientas practicas basadas en psicologia para gestionar la ansiedad en tu dia a dia.', 0, true),
  ('22222222-2222-2222-2222-222222222222', 'Autoestima y Relaciones', 'autoestima-relaciones', 'Reconstruye tu autoestima y aprende a establecer relaciones sanas.', 1, true);

-- Modules for course 1
INSERT INTO modules (id, course_id, title, slug, description, position, published) VALUES
  ('aaaa1111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Entender la ansiedad', 'entender-ansiedad', 'Que es la ansiedad, como funciona y por que aparece.', 0, true),
  ('aaaa2222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Protocolos de regulacion', 'protocolos-regulacion', 'Tecnicas concretas para regular la ansiedad cuando aparece.', 1, true);

-- Modules for course 2
INSERT INTO modules (id, course_id, title, slug, description, position, published) VALUES
  ('bbbb1111-1111-1111-1111-111111111111', '22222222-2222-2222-2222-222222222222', 'Bases de la autoestima', 'bases-autoestima', 'Que es la autoestima realmente y como se construye.', 0, true),
  ('bbbb2222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Limites sanos', 'limites-sanos', 'Aprende a poner limites sin culpa.', 1, true);

-- Lessons for module 1 (ansiedad)
INSERT INTO lessons (id, module_id, title, slug, description, duration_seconds, position, published) VALUES
  ('cccc1111-1111-1111-1111-111111111111', 'aaaa1111-1111-1111-1111-111111111111', 'Que es la ansiedad funcional', 'que-es-ansiedad-funcional', 'Entender la diferencia entre ansiedad adaptativa y ansiedad que te limita.', 720, 0, true),
  ('cccc2222-2222-2222-2222-222222222222', 'aaaa1111-1111-1111-1111-111111111111', 'El ciclo de la ansiedad', 'ciclo-ansiedad', 'Como la ansiedad se retroalimenta y que puedes hacer para romper el ciclo.', 900, 1, true),
  ('cccc3333-3333-3333-3333-333333333333', 'aaaa1111-1111-1111-1111-111111111111', 'Identificar tus disparadores', 'identificar-disparadores', 'Ejercicio practico para mapear que activa tu ansiedad.', 600, 2, true);

-- Lessons for module 2 (regulacion)
INSERT INTO lessons (id, module_id, title, slug, description, duration_seconds, position, published) VALUES
  ('cccc4444-4444-4444-4444-444444444444', 'aaaa2222-2222-2222-2222-222222222222', 'Tecnica de respiracion 4-7-8', 'respiracion-478', 'Una de las herramientas mas efectivas para calmar la ansiedad en el momento.', 480, 0, true),
  ('cccc5555-5555-5555-5555-555555555555', 'aaaa2222-2222-2222-2222-222222222222', 'Grounding: anclaje al presente', 'grounding', 'Tecnica de anclaje sensorial para salir de la espiral de pensamientos ansiosos.', 540, 1, true);

-- Lessons for module 3 (autoestima)
INSERT INTO lessons (id, module_id, title, slug, description, duration_seconds, position, published) VALUES
  ('cccc6666-6666-6666-6666-666666666666', 'bbbb1111-1111-1111-1111-111111111111', 'Autoestima vs autoconcepto', 'autoestima-vs-autoconcepto', 'Entender la diferencia y por que importa.', 660, 0, true),
  ('cccc7777-7777-7777-7777-777777777777', 'bbbb1111-1111-1111-1111-111111111111', 'De donde viene tu autoestima', 'origen-autoestima', 'Como se forma la autoestima y que factores la moldean.', 780, 1, true);

-- Lessons for module 4 (limites)
INSERT INTO lessons (id, module_id, title, slug, description, duration_seconds, position, published) VALUES
  ('cccc8888-8888-8888-8888-888888888888', 'bbbb2222-2222-2222-2222-222222222222', 'Que son los limites', 'que-son-limites', 'Los limites no son muros: son la base de las relaciones sanas.', 600, 0, true),
  ('cccc9999-9999-9999-9999-999999999999', 'bbbb2222-2222-2222-2222-222222222222', 'Comunicar un limite sin culpa', 'comunicar-limite', 'Estrategias practicas para decir que no sin sentirte culpable.', 840, 1, true);

-- Exercises for some lessons
INSERT INTO exercises (lesson_id, title, type, content, position) VALUES
  ('cccc1111-1111-1111-1111-111111111111', 'Reflexion: tu experiencia con la ansiedad', 'reflection', '{"prompt": "Describe una situacion reciente en la que sentiste ansiedad. Que sensaciones fisicas notaste? Que pensamientos aparecieron? Como reaccionaste?"}', 0),
  ('cccc3333-3333-3333-3333-333333333333', 'Mapa de disparadores', 'checklist', '{"instructions": "Marca los disparadores que reconoces en tu dia a dia:", "items": ["Situaciones sociales o reuniones", "Plazos y presion en el trabajo", "Conflictos con personas cercanas", "Incertidumbre sobre el futuro", "Comparaciones en redes sociales", "Noches sin poder dormir", "Criticas o evaluaciones de otros"]}', 0),
  ('cccc4444-4444-4444-4444-444444444444', 'Quiz: respiracion 4-7-8', 'quiz', '{"question": "En la tecnica 4-7-8, que representan los numeros?", "options": ["4 respiraciones, 7 pausas, 8 repeticiones", "Inhalar 4s, retener 7s, exhalar 8s", "4 minutos de practica, 7 dias por semana, 8 semanas", "4 respiraciones profundas, 7 normales, 8 cortas"], "correct_index": 1}', 0),
  ('cccc6666-6666-6666-6666-666666666666', 'Reflexion: tu relacion con tu autoestima', 'reflection', '{"prompt": "En una escala del 1 al 10, como valorarias tu autoestima hoy? Que crees que influye mas en esa puntuacion: tu propia opinion o la de los demas?"}', 0),
  ('cccc8888-8888-8888-8888-888888888888', 'Checklist: tus limites actuales', 'checklist', '{"instructions": "Reflexiona sobre estas areas y marca aquellas donde sientes que necesitas trabajar tus limites:", "items": ["En el trabajo (horas extra, tareas que no te corresponden)", "Con la familia (opinion sobre tus decisiones)", "Con la pareja (espacio personal, necesidades)", "Con amistades (disponibilidad constante)", "En redes sociales (tiempo, comparaciones)", "Contigo misma (autoexigencia, autocritica)"]}', 0),
  ('cccc9999-9999-9999-9999-999999999999', 'Plantilla: comunicar un limite', 'download', '{"instructions": "Descarga esta plantilla con frases y estructuras para comunicar limites de forma asertiva.", "url": "#", "label": "Descargar plantilla de limites"}', 0);
