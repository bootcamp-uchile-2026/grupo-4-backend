-- LaSobremesa: datos de prueba para una base de desarrollo vacia.
-- Ejecutar una sola vez. No ejecutar en produccion.
START TRANSACTION;

INSERT INTO categorias (nombre) VALUES
  ('Mermeladas'),
  ('Lácteos'),
  ('Aceites'),
  ('Mieles'),
  ('Repostería'),
  ('Cereales');

INSERT INTO proveedores (nombre, descripcion) VALUES
  ('Conservas del Valle', 'Conservas y mermeladas artesanales'),
  ('Lácteos del Campo', 'Quesos y lácteos artesanales'),
  ('Oliva del Sur', 'Aceites artesanales'),
  ('Apícola del Bosque', 'Mieles naturales'),
  ('Dulces de la Abuela', 'Repostería artesanal'),
  ('Granos Naturales', 'Cereales y granolas artesanales');

-- Se buscan los IDs por nombre, sin asumir que empiezan en 1.
INSERT INTO productos (
  categoria_id, proveedor_id, nombre, descripcion, ingredientes,
  valor_nutricional, tipo_conservacion, fecha_vencimiento, precio,
  descuento, imagen, stock_cantidad, stock_minimo, favorito, activo
) VALUES
  ((SELECT id FROM categorias WHERE nombre='Mermeladas'), (SELECT id FROM proveedores WHERE nombre='Conservas del Valle' LIMIT 1), 'Mermelada de frutilla', 'Mermelada artesanal de frutillas', 'Frutillas, azúcar y limón', 'No informado', 'Ambiente', '2027-12-31', 5000, 10, 'https://placehold.co/600x400/png?text=Mermelada+de+frutilla', 20, 5, TRUE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Lácteos'), (SELECT id FROM proveedores WHERE nombre='Lácteos del Campo' LIMIT 1), 'Queso de campo', 'Queso artesanal', 'Leche, sal y cultivos lácticos', 'No informado', 'Refrigerado', '2027-12-31', 7500, 0, 'https://placehold.co/600x400/png?text=Queso+de+campo', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Aceites'), (SELECT id FROM proveedores WHERE nombre='Oliva del Sur' LIMIT 1), 'Aceite de oliva', 'Aceite artesanal', 'Aceitunas', 'No informado', 'Ambiente', '2027-12-31', 9000, 0, 'https://placehold.co/600x400/png?text=Aceite+de+oliva', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Mieles'), (SELECT id FROM proveedores WHERE nombre='Apícola del Bosque' LIMIT 1), 'Miel artesanal', 'Miel natural', 'Miel de abeja', 'No informado', 'Ambiente', '2027-12-31', 6500, 15, 'https://placehold.co/600x400/png?text=Miel+artesanal', 20, 5, TRUE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Lácteos'), (SELECT id FROM proveedores WHERE nombre='Lácteos del Campo' LIMIT 1), 'Manjar casero', 'Manjar artesanal', 'Leche y azúcar', 'No informado', 'Refrigerado', '2027-12-31', 4500, 0, 'https://placehold.co/600x400/png?text=Manjar+casero', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Mermeladas'), (SELECT id FROM proveedores WHERE nombre='Conservas del Valle' LIMIT 1), 'Mermelada de mora', 'Mermelada artesanal de moras', 'Moras, azúcar y limón', 'No informado', 'Ambiente', '2027-12-31', 5500, 5, 'https://placehold.co/600x400/png?text=Mermelada+de+mora', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Lácteos'), (SELECT id FROM proveedores WHERE nombre='Lácteos del Campo' LIMIT 1), 'Queso de cabra', 'Queso de cabra artesanal', 'Leche de cabra, sal y cultivos', 'No informado', 'Refrigerado', '2027-12-31', 8500, 10, 'https://placehold.co/600x400/png?text=Queso+de+cabra', 20, 5, TRUE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Aceites'), (SELECT id FROM proveedores WHERE nombre='Oliva del Sur' LIMIT 1), 'Aceite de oliva extra virgen', 'Aceite extra virgen', 'Aceitunas', 'No informado', 'Ambiente', '2027-12-31', 12000, 0, 'https://placehold.co/600x400/png?text=Aceite+de+oliva+extra+virgen', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Mieles'), (SELECT id FROM proveedores WHERE nombre='Apícola del Bosque' LIMIT 1), 'Miel de ulmo', 'Miel de ulmo', 'Miel de abeja', 'No informado', 'Ambiente', '2027-12-31', 8000, 0, 'https://placehold.co/600x400/png?text=Miel+de+ulmo', 20, 5, TRUE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Repostería'), (SELECT id FROM proveedores WHERE nombre='Dulces de la Abuela' LIMIT 1), 'Galletas artesanales', 'Galletas horneadas', 'Harina, mantequilla y azúcar', 'No informado', 'Ambiente', '2027-12-31', 3500, 0, 'https://placehold.co/600x400/png?text=Galletas+artesanales', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Repostería'), (SELECT id FROM proveedores WHERE nombre='Dulces de la Abuela' LIMIT 1), 'Brownies artesanales', 'Brownies de chocolate', 'Harina, chocolate, huevos y mantequilla', 'No informado', 'Ambiente', '2027-12-31', 4000, 20, 'https://placehold.co/600x400/png?text=Brownies+artesanales', 20, 5, FALSE, TRUE),
  ((SELECT id FROM categorias WHERE nombre='Cereales'), (SELECT id FROM proveedores WHERE nombre='Granos Naturales' LIMIT 1), 'Granola artesanal', 'Granola de avena', 'Avena, semillas y frutos secos', 'No informado', 'Ambiente', '2027-12-31', 6000, 0, 'https://placehold.co/600x400/png?text=Granola+artesanal', 20, 5, TRUE, TRUE);

COMMIT;
SELECT COUNT(*) AS total_productos FROM productos;