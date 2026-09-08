import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# SOLO las URLs de DAMA (mujer) en SPORT
old_mujer_dentro = "https://res.cloudinary.com/dkq95jus0/image/upload/v1787398877/Camisa_1_e97kgv.png"
old_mujer_fuera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1787667010/Dise%C3%B1o_sin_t%C3%ADtulo_20260825_100909_0000_my9nwz.png"

# URLs nuevas (las que me pasaste)
new_mujer_dentro = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144832_0000_soy77a.png"
new_mujer_fuera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png"

# Mostrar cuántas veces aparece cada una
print("🔍 Buscando URLs viejas en productos.ts...")
print(f"  fotoMujerDentro: {content.count(old_mujer_dentro)} vez")
print(f"  fotoMujerFuera: {content.count(old_mujer_fuera)} vez")
print("")

# Reemplazar SOLO las de DAMA en productos.ts
content = content.replace(old_mujer_dentro, new_mujer_dentro)
content = content.replace(old_mujer_fuera, new_mujer_fuera)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ SPORT DAMA actualizado en lib/productos.ts")
print("")
print("📋 NUEVAS URLs en SPORT DAMA:")
print(f"  fotoMujerDentro: {new_mujer_dentro}")
print(f"  fotoMujerFuera: {new_mujer_fuera}")
print("")
print("🔒 SPORT VARÓN NO fue modificado")
print("🔒 CASIMIR NO fue modificado")
