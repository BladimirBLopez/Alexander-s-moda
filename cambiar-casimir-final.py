import re

path = "app/catalogo/[slug]/page.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URL vieja (la que está hardcodeada en page.tsx)
old = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png"

# URL nueva (la que quieres)
new = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893477/20260908_144522_0000_rycwqh.png"

# Contar cuántas veces aparece
count = content.count(old)
print(f"🔍 URL encontrada: {count} vez/veces")

# Reemplazar
content = content.replace(old, new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ URL actualizada en app/catalogo/[slug]/page.tsx")
print(f"📋 NUEVA URL: {new}")
