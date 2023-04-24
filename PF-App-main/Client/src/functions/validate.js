export function validateLoginData(dataLogin) {
  let errors = {};
  let isValid = true;

  // Validar correo electrónico
  if (!dataLogin.email) {
    errors.email = "Debes ingresar un correo electrónico";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(dataLogin.email)) {
    errors.email = "⚠ El correo electrónico no es válido";
    isValid = false;
  }

  // Validar contraseña
  if (!dataLogin.password) {
    errors.password = "⚠ Debes ingresar una contraseña";
    isValid = false;
  } else if (dataLogin.password.length < 6) {
    errors.password = "⚠ La contraseña debe tener al menos 6 caracteres";
    isValid = false;
  }

  return { errors, isValid };
}

export function validateRegisterData(dataRegister) {
  let errors = {};
  let isValid = true;

  // Validar nombre
  if (!dataRegister.name) {
    errors.name = "⚠ Debes ingresar un nombre";
    isValid = false;
  } else if (dataRegister.name.length < 3) {
    errors.name = "⚠ El nombre debe tener al menos 3 letras";
    isValid = false;
  }

  // Validar apellido
  if (!dataRegister.lastName) {
    errors.lastName = "⚠ Debes ingresar un apellido";
    isValid = false;
  } else if (dataRegister.lastName.length < 3) {
    errors.lastName = "⚠ El apellido debe tener al menos 3 letras";
    isValid = false;
  }

  // Validar nombre de usuario
  if (!dataRegister.userName) {
    errors.userName = "⚠ Debes ingresar un nombre de usuario";
    isValid = false;
  } else if (/\s/.test(dataRegister.userName)) {
    errors.userName = "⚠ El nombre de usuario no puede contener espacios";
    isValid = false;
  }

  // Validar correo electrónico

  if (!dataRegister.email) {
    errors.email = "⚠ Debes ingresar un correo electrónico";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(dataRegister.email)) {
    errors.email = "El correo electrónico no es válido";
    isValid = false;
  }

  // Validar contraseña
  if (!dataRegister.password) {
    errors.password = "⚠ Debes ingresar una contraseña";
    isValid = false;
  } else if (dataRegister.password.length < 6) {
    errors.password = "⚠ La contraseña debe tener al menos 6 caracteres";
    isValid = false;
  }

  // Validar confirmación de contraseña
  if (!dataRegister.confirmPassword) {
    errors.confirmPassword = "⚠ Debes confirmar la contraseña";
    isValid = false;
  } else if (dataRegister.confirmPassword !== dataRegister.password) {
    errors.confirmPassword = "⚠ Las contraseñas no coinciden";
    isValid = false;
  }

  return { errors, isValid };
}
