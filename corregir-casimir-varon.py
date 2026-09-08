import re

path = "lib/productos.ts"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# URLs que se añadieron mal
camisa = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163401_0000_xy5dgx.png"
polera = "https://res.cloudinary.com/dkq95jus0/image/upload/v1788899900/20260908_163618_0000_z7jbyg.png"

# Buscar el objeto CASIMIR y corregir
lines = content.split('\n')
new_lines = []
in_casimir = False
in_bullets = False
added = False

for line in lines:
    if 'id: "uniforme-casimir"' in line:
        in_casimir = True
        new_lines.append(line)
        continue
    
    if in_casimir:
        # Detectar cuando estamos en bulletsMujer
        if 'bulletsMujer:' in line:
            in_bullets = True
        
        # Si estamos en bullets y encontramos una línea con fotoHombreDentro, la saltamos
        if in_bullets and 'fotoHombreDentro' in line:
            continue
        
        if in_bullets and 'fotoHombreFuera' in line:
            continue
        
        # Cuando salimos de bulletsMujer, añadir las URLs correctamente
        if in_bullets and '],' in line and not added:
            # Añadir las URLs después de cerrar bulletsMujer
            new_lines.append('    ],')
            new_lines.append(f'    fotoHombreDentro: "{camisa}",')
            new_lines.append(f'    fotoHombreFuera: "{polera}",')
            added = True
            in_bullets = False
            continue
    
    new_lines.append(line)

content = '\n'.join(new_lines)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("✅ CASIMIR VARÓN corregido")
print("")
print("📋 URLs colocadas correctamente en el objeto CASIMIR:")
print(f"  fotoHombreDentro: {camisa}")
print(f"  fotoHombreFuera: {polera}")
