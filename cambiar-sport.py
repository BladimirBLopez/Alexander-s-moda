import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URLs VIEJAS de SPORT en productos.ts
old_mujer_dentro = "https://res.cloudinary.com/dkq95jus0/image/upload/v1787398877/Camisa_1_e97kgv.png"
old_mujer_fuera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1787667010/Dise%C3%B1o_sin_t%C3%ADtulo_20260825_100909_0000_my9nwz.png"
old_hombre_dentro = "https://res.cloudinary.com/dkq95jus0/image/upload/v1787400132/Camisa_varon_1_hgxr9l.png"
old_hombre_fuera = "https://res.cloudinary.com/dkq95jus0/image/upload/c_pad,w_1000,h_1400,b_auto/v1787426174/Dise%C3%B1o_sin_t%C3%ADtulo_20260822_151438_0000_ituak0.png"

# URLs NUEVAS (las que me pasaste)
new_mujer_dentro = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144832_0000_soy77a.png"
new_mujer_fuera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png"
new_hombre_dentro = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893478/20260908_144832_0000_soy77a.png"
new_hombre_fuera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788893479/20260908_145019_0000_ixf8gc.png"

# Mostrar cuántas veces aparece cada una
print("🔍 Buscando URLs viejas en productos.ts...")
print(f"  fotoMujerDentro: {content.count(old_mujer_dentro)} vez")
print(f"  fotoMujerFuera: {content.count(old_mujer_fuera)} vez")
print(f"  fotoHombreDentro: {content.count(old_hombre_dentro)} vez")
print(f"  fotoHombreFuera: {content.count(old_hombre_fuera)} vez")
print("")

# Reemplazar SOLO las de SPORT en productos.ts
content = content.replace(old_mujer_dentro, new_mujer_dentro)
content = content.replace(old_mujer_fuera, new_mujer_fuera)
content = content.replace(old_hombre_dentro, new_hombre_dentro)
content = content.replace(old_hombre_fuera, new_hombre_fuera)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ SPORT actualizado en lib/productos.ts")
print("")
print("📋 NUEVAS URLs en SPORT:")
print(f"  fotoMujerDentro: {new_mujer_dentro}")
print(f"  fotoMujerFuera: {new_mujer_fuera}")
print(f"  fotoHombreDentro: {new_hombre_dentro}")
print(f"  fotoHombreFuera: {new_hombre_fuera}")
print("")
print("🔒 CASIMIR y sección final NO fueron modificados")
