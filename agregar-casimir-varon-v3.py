import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URLs nuevas (las que me pasaste)
new_camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163401_0000_xy5dgx.png"
new_polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163618_0000_z7jbyg.png"

# Buscar el objeto CASIMIR y añadir las URLs ANTES de fotoMujerSeccion2
lines = content.split('\n')
new_lines = []
in_casimir = False
in_casimir_block = False
added = False
brace_count = 0

for line in lines:
    # Detectar cuando entramos al objeto CASIMIR
    if 'id: "uniforme-casimir"' in line:
        in_casimir = True
        in_casimir_block = True
        new_lines.append(line)
        continue
    
    # Si estamos en el bloque de CASIMIR
    if in_casimir_block:
        # Buscar la línea donde está fotoMujerSeccion2 o fotoHombreSeccion2
        if not added and ('fotoMujerSeccion2' in line or 'fotoHombreSeccion2' in line):
            # Añadir las URLs ANTES de esta línea
            indent = '    '
            new_lines.append(f'{indent}fotoHombreDentro: "{new_camisa}",')
            new_lines.append(f'{indent}fotoHombreFuera: "{new_polera}",')
            added = True
        
        # Verificar si salimos del bloque de CASIMIR (cuando se cierra el objeto)
        if line.strip() == '},' and in_casimir:
            in_casimir_block = False
            in_casimir = False
    
    new_lines.append(line)

content = '\n'.join(new_lines)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ CASIMIR VARÓN (arriba) actualizado")
print("")
print("📋 NUEVAS URLs añadidas en el objeto CASIMIR:")
print(f"  fotoHombreDentro: {new_camisa}")
print(f"  fotoHombreFuera: {new_polera}")
