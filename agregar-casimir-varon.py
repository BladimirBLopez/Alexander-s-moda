import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URLs nuevas (las que me pasaste)
new_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163401_0000_xy5dgx.png"
new_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163618_0000_z7jbyg.png"

# Buscar el objeto CASIMIR y añadir las URLs
lines = content.split('\n')
new_lines = []
in_casimir = False
added = False

for line in lines:
    if 'id: "uniforme-casimir"' in line:
        in_casimir = True
        new_lines.append(line)
        continue
    
    if in_casimir and not added:
        # Buscar donde añadir las URLs (después de bulletsHombre o antes de fotoMujerSeccion2)
        if 'fotoMujerSeccion2' in line:
            # Añadir las URLs antes de fotoMujerSeccion2
            indent = '    '
            new_lines.append(f'{indent}fotoHombreDentro: "{new_camisa}",')
            new_lines.append(f'{indent}fotoHombreFuera: "{new_polera}",')
            added = True
        
        if 'fotoHombreSeccion2' in line and not added:
            # Si no se añadió antes, añadir aquí
            indent = '    '
            new_lines.append(f'{indent}fotoHombreDentro: "{new_camisa}",')
            new_lines.append(f'{indent}fotoHombreFuera: "{new_polera}",')
            added = True
    
    new_lines.append(line)

content = '\n'.join(new_lines)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ CASIMIR VARÓN (arriba) actualizado")
print("")
print("📋 NUEVAS URLs añadidas:")
print(f"  CAMISA: {new_camisa}")
print(f"  POLERA: {new_polera}")
print("")
print("🔒 SPORT DAMA NO fue modificado")
print("🔒 SPORT VARÓN NO fue modificado")
print("🔒 CASIMIR DAMA NO fue modificado")
