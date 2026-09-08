path = "app/catalogo/[slug]/page.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# CAMISA (izquierda) - NUEVA
old1 = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png"
new1 = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144832_0000_soy77a.png"

# POLERA (derecha) - NUEVA
old2 = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_4_ys77im.png"
new2 = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png"

# Contar cuántas veces aparece cada una
count1 = content.count(old1)
count2 = content.count(old2)
print(f"🔍 CAMISA encontrada: {count1} vez")
print(f"🔍 POLERA encontrada: {count2} vez")

# Reemplazar
content = content.replace(old1, new1)
content = content.replace(old2, new2)

# Guardar
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Imágenes reemplazadas correctamente")
print("")
print("📋 NUEVAS URLs:")
print(f"   CAMISA: {new1}")
print(f"   POLERA: {new2}")
