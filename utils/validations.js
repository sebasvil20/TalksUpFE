export const isValidEmail = (email) => {
  const match = String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )

  return !!match
}

export const isEmail = (email) => {
  return isValidEmail(email) ? undefined : 'El correo no parece ser válido'
}

export const isString = (str) => {

  const match = String(str)
  .toLowerCase()
  .match(
    /^[a-zA-Z]+$/
  )

  return (typeof str === 'string' && !!match) ? undefined : 'La cadena de caracteres no parece ser válida'
}
