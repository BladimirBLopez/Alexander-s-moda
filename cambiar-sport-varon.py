import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URLs viejas de SPORT VARÓN (arriba)
old_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1787400132/Camisa_varon_1_hgxr9l.png"
old_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/c_pad,w_1000,h_1400,b_auto/v1787426174/Dise%C3%B1o_sin_t%C3%ADtulo_20260822_151438_0000_ituak0.png"

# URLs nuevas (las que me pasaste)
new_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788898948/20260908_161917_0000_p8zf8h.png"
new_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788898949/20260908_162045_0000_lzhsth.png"

# Contar cuántas veces aparece cada una
print("🔍 Buscando URLs viejas...")
print(f"  CAMISA (vieja): {content.count(old_camisa)} vez")
print(f"  POLERA (vieja): {content.count(old_polera)} vez")
print("")

# Reemplazar SOLO SPORT VARÓN (arriba)
content = content.replace(old_camisa, new_camisa)
content = content.replace(old_polera, new_polera)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ SPORT VARÓN (arriba) actualizado")
print("")
print("📋 NUEVAS URLs:")
print(f"  CAMISA: {new_camisa}")
print(f"  POLERA: {new_polera}")
print("")
print("🔒 SPORT DAMA NO fue modificado")
print("🔒 CASIMIR DAMA NO fue modificado")
print("🔒 CASIMIR VARÓN NO fue modificado")
