import re

path = "app/catalogo/[slug]/page.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URLs que se cambiaron (las nuevas)
old_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893477/20260908_144522_0000_rycwqh.png"
old_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144638_0000_ovkxne.png"

# URLs originales (las que estaban antes)
new_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png"
new_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_4_ys77im.png"

# Reemplazar SOLO en la sección final (abajo)
content = content.replace(old_camisa, new_camisa)
content = content.replace(old_polera, new_polera)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ Imágenes de abajo restauradas a las originales")
print("")
print("📋 URLs RESTAURADAS:")
print(f"  DAMA: {new_camisa}")
print(f"  VARÓN: {new_polera}")
