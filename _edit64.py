path = "app/page.tsx"

with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old = '''  {
    label: "Proforma",
    href: "/proforma",
    externo: false,
    Icono: IconoProforma,
  },
'''

c = content.count(old)
print("Bloque Proforma encontrado:", c)
assert c == 1

content = content.replace(old, "")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

print("Listo: botón Proforma eliminado del Home.")
