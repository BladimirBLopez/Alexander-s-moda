import re

path = "app/catalogo/[slug]/page.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# SOLO SPORT - CAMISA (izquierda)
old1 = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png"
new1 = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144832_0000_soy77a.png"

# SOLO SPORT - POLERA (derecha)
old2 = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_4_ys77im.png"
new2 = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png"

# VERIFICAR que solo hay 2 reemplazos en este archivo
count1 = content.count(old1)
count2 = content.count(old2)

print(f"🔍 CAMISA SPORT encontrada: {count1} vez")
print(f"🔍 POLERA SPORT encontrada: {count2} vez")

# Reemplazar SOLO en este archivo
content = content.replace(old1, new1)
content = content.replace(old2, new2)

# Guardar
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ SOLO imágenes de SPORT reemplazadas")
print("")
print("📋 NUEVAS URLs en SPORT:")
print(f"   CAMISA: {new1}")
print(f"   POLERA: {new2}")
print("")
print("🔒 Las imágenes de CASIMIR NO fueron modificadas")
