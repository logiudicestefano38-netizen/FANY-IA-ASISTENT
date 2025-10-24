fetch('https://tu-backend.com/api/responder', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ mensaje: transcript })
})
.then(res => res.json())
.then(data => {
  const respuesta = data.respuesta;
  const respuestaVoz = new SpeechSynthesisUtterance(respuesta);
  respuestaVoz.lang = 'es-ES';
  speechSynthesis.speak(respuestaVoz);
  document.getElementById('output').textContent += "\nFANY: " + respuesta;
})
.catch(err => {
  console.error("Error al conectar con el backend:", err);
});
