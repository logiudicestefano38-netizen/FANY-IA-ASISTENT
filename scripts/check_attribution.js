#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const target = path.resolve(__dirname, '..', 'src', 'components', 'Chat.jsx');
const phrase = 'Stefany, una desarrolladora trans';

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

if (!fs.existsSync(target)) {
  fail(`Archivo no encontrado: ${target}`);
}

const content = fs.readFileSync(target, 'utf8');
if (content.includes(phrase)) {
  console.log('Comprobación de atribución: OK — frase encontrada.');
  process.exit(0);
} else {
  console.error('Comprobación de atribución: FALLÓ. No se encontró la frase:');
  console.error(`  ${phrase}`);
  console.error('Asegúrate de no eliminar o alterar la atribución en `FANY_SYSTEM_PROMPT_BASE` en src/components/Chat.jsx.');
  process.exit(2);
}
