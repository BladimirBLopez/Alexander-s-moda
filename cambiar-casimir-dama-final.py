import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# CAMISA DAMA (la que está en la sección final, dentro del objeto SPORT)
old_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim:20/v1787361943/Dise%C3%B1o_sin_t%C3%ADtulo_2_ywe8v4.png"
new_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893477/20260908_144522_0000_rycwqh.png"

# POLERA DAMA (la que está en el objeto CASIMIR)
old_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_2.png"
new_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144638_0000_ovkxne.png"

# Contar cuántas veces aparece cada una
print("🔍 Buscando URLs viejas...")
print(f"  CAMISA DAMA (vieja): {content.count(old_camisa)} vez")
print(f"  POLERA DAMA (vieja): {content.count(old_polera)} vez")
print("")

# Reemplazar
content = content.replace(old_camisa, new_camisa)
content = content.replace(old_polera, new_polera)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ CASIMIR DAMA actualizado")
print("")
print("📋 NUEVAS URLs:")
print(f"  CAMISA DAMA: {new_camisa}")
print(f"  POLERA DAMA: {new_polera}")
print("")
print("🔒 CASIMIR VARÓN NO fue modificado")
