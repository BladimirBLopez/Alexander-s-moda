import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URL VIEJA de CASIMIR DAMA (ambas usan la misma)
old_casimir_dama = "https://res.cloudinary.com/dkq95jus0/image/upload/e_trim/v1786755139/promo-mujer_2.png"

# URLs NUEVAS (las que me pasaste)
new_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893477/20260908_144522_0000_rycwqh.png"
new_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144638_0000_ovkxne.png"

# Contar cuántas veces aparece la URL vieja
count = content.count(old_casimir_dama)
print(f"🔍 URL de CASIMIR DAMA encontrada: {count} vez/veces")

# Reemplazar SOLO CASIMIR DAMA
# Primera aparición → camisa
# Segunda aparición → polera
content = content.replace(old_casimir_dama, new_camisa, 1)
content = content.replace(old_casimir_dama, new_polera, 1)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ CASIMIR DAMA actualizado en lib/productos.ts")
print("")
print("📋 NUEVAS URLs en CASIMIR DAMA:")
print(f"  CAMISA: {new_camisa}")
print(f"  POLERA: {new_polera}")
print("")
print("🔒 SPORT NO fue modificado")
print("🔒 CASIMIR VARÓN NO fue modificado")
